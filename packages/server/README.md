# Surewill Will Generation Service

This is a minimal Express server responsible for generating Wills and uploading them to S3. It uses Puppeteer to navigate to the Will as a web page and save that page as a PDF. This kind of processes doesn't suite a serverless environment, which is why this server has also been created (instead of using Next.js API route handlers).

The Will generation is triggered by a SNS Notification, allowing it to be triggered from many place (e.g. Stripe webhooks, user re-generation of Wills).

## Getting started

1. Add and `.env` file using the `.env.example` template
2. Install dependencies with `pnpm install`. Note that this will run a `postintall` script to download Puppeteer - this isn't actually necessary for local development
3. Generate the Prisma client by running `pnpm prisma:generate`
4. Run `pnpm dev` to run the server on `localhost:8000`