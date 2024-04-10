import { auth } from "@clerk/nextjs";
import { db } from "~/libs/prisma";

export type RequestWithAuth = Request & {
  user: {
    id: string;
  };
};

type NextApiHandler<T = any> = (
  req: RequestWithAuth,
  params: any
) => unknown | Promise<T>;

export const withAuth = <T>(handler: NextApiHandler<T>) => {
  return async (req: Request, params: Record<string, unknown>) => {
    const { userId } = auth();

    if (!userId) {
      return new Response("Not Authorized.", {
        status: 401,
      });
    }

    const user = await db.user.findFirst({
      where: {
        authUserId: userId,
      },
    });

    if (!user) {
      return new Response("Not Authorized.", {
        status: 401,
      });
    }

    const requestWithAuth = req as RequestWithAuth;
    requestWithAuth.user = { id: user.id };

    return handler(requestWithAuth, params);
  };
};

export const ensureWillOwner = async (userId: string, willId: string) => {
  const count = await db.will.count({
    where: {
      id: willId,
      userId,
    },
  });
  return count > 0;
};

export const ensureWillOwnerWithWill = async (
  userId: string,
  willId: string
) => {
  return db.will.findFirst({
    where: {
      id: willId,
      userId,
    },
    include: {
      people: {
        include: {
          pet: true,
        },
      },
    },
  });
};
