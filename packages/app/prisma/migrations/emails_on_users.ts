import { db } from "../../src/libs/prisma";
import clerk from "@clerk/clerk-sdk-node";

/**
 * This migration will be run manually only once. No migration library is being used.
 * The migration will add the user's auth email (from Clerk) to their user record in the DB.
 */

const up = async () => {
  const willsFromDB = await db.will.findMany({
    select: {
      user: true,
    },
  });
  const authUserIdsFromDb = willsFromDB.map((will) => will.user.authUserId);
  const authUsers = await clerk.users.getUserList({
    userId: authUserIdsFromDb,
    limit: 200,
  });

  for await (const authUser of authUsers) {
    const email = authUser?.emailAddresses?.[0]?.emailAddress;
    if (email && authUser.id) {
      await db.will.updateMany({
        where: {
          user: {
            authUserId: authUser.id,
          },
        },
        data: {
          email,
        },
      });
    }
  }
};

up();
