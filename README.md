# A simple payment application with kpi
 
 ## Features :
 - start with npm install
 - Stripe payment
 - Base on shadcn ui
 - get privite key in https://dashboard.stripe.com/test/products/prod_Q6UzFNWnhHubqW for test
 - add a file called .env 
 
 AUTH_SECRET="?"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="?"
STRIPE_SECRET_KEY="?"
CANONICAL_URL="http://localhost:3000"
STRIPE_WEBHOOK_SECRET="?"

## how to use that?
First step run npm install
Then flow https://www.prisma.io/docs/getting-started to get your own database
Then get privite key in https://dashboard.stripe.com/test/products/prod_Q6UzFNWnhHubqW in env to chage pay
*You can change what you want in Component/ui file,it include Shadcn UI design(color or size...)
*New page set in src/app file,you can add new page here(ex:login page,sign up page...)
*Public file include icon and picture
*Web title and descripe in layout.tsx
If all thing done well
You can run "npm run dev" to test and start








