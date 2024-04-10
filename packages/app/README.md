# Surewill Web App

## Getting started

1. Use the [Vercel CLI](https://vercel.com/docs/cli) to link this package to the `tigerheart/surewill-app` Vercel project and then run `pnpm env:pull` to pull down the development environment variables
2. Set up the database by creating a free-tier cluster on MongoDB Atlas. Find the connection string for this cluster and set the `DATABASE_URL` env variable in `.env` file which was created in step 1. Then run `pnpm prisma:db:push` to push the Prisma schema to your database (note that this command should only every be run during local development).
3. Install dependencies with `pnpm install` (do this from the root of the monorepo)
4. Generate the Prisma client by running `pnpm prisma:generate`
5. Run `pnpm dev` to run the application on `localhost:3000`
