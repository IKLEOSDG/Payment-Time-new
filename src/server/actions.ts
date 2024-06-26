'use server';

import bcrypt from 'bcrypt';
import prisma from "@/lib/db";
import { Pet } from "@prisma/client";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { PetNew } from "@/lib/type";
import { authSchema, petFormSchema, petIdSchema } from "@/lib/schema";
import { redirect } from "next/navigation";
import { checkAuth, getPetById } from "@/lib/server-utils";
import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";
import { auth, signIn, signOut } from "@/lib/auth-no-edge";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// --- user actions ---

export async function logIn(prevState: unknown, formData: unknown) {
    if (!(formData instanceof FormData)) {
        return {
            message: "Invalid form data.",
        };
    }

    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin": {
                    return {
                        message: "Invalid credentials.",
                    };
                }
                default: {
                    return {
                        message: "Error. Could not sign in.",
                    };
                }
            }
        }

        throw error; // nextjs redirects throws error, so we need to rethrow it
    }
}

export async function signUp(prevState: unknown, formData: unknown) {
    // check if formData is a FormData type
    if (!(formData instanceof FormData)) {
        return {
            message: "Invalid form data.",
        };
    }

    // convert formData to a plain object
    const formDataEntries = Object.fromEntries(formData.entries());

    // validation
    const validatedFormData = authSchema.safeParse(formDataEntries);
    if (!validatedFormData.success) {
        return {
            message: "Invalid form data.",
        };
    }

    const { email, password } = validatedFormData.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await prisma.user.create({
            data: {
                email,
                hashedPassword,
            },
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return {
                    message: "Email already exists.",
                };
            }
        }

        return {
            message: "Could not create user.",
        };
    }

    await signIn("credentials", formData);
}

export async function logOut() {
    await signOut({ redirectTo: "/" });
}


// --- payment actions ---

export async function createCheckoutSession() {
    // authentication check
    const session = await checkAuth();

    console.log(session.user.email);

    // create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
        customer_email: session.user.email,
        line_items: [
            {
                price: "price_1PGHzIJsuGmcG1puRWrZWT5U",//edit payment api in https://dashboard.stripe.com/test/products/prod_Q6UzFNWnhHubqW
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: `${process.env.CANONICAL_URL}/payment?success=true`,
        cancel_url: `${process.env.CANONICAL_URL}/payment?cancelled=true`,
    });

    // redirect user
    redirect(checkoutSession.url);
}