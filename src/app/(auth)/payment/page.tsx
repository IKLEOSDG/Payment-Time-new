"use client";

import { createCheckoutSession } from "@/server/actions";
import H1 from "@/components/H1";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

export default function Page({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const [isPending, startTransition] = useTransition();
    const { data: session, update, status } = useSession();
    const router = useRouter();

    return (
        <main className="flex flex-col items-center space-y-10">
            <H1>Services access requires payment</H1>

           
                <div className="flex justify-center p-4">
                <Card className="flex-1 max-w-lg">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col">
                    <div className="flex justify-between items-center py-2">
                      <div>Services *1</div>
                      <div>$100</div>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between items-center font-bold py-2">
                      <div>TOTAL</div>
                      <div>$100</div>
                    </div>
                  </CardContent>
                </Card>
          
              </div>
            

            {!searchParams.success && (
                <Button
                    disabled={isPending}
                    onClick={async () => {
                        startTransition(async () => {
                            await createCheckoutSession();
                        });
                    }}
                >
                    Checkout Here！
                </Button>
            )}

        </main>
    );
}