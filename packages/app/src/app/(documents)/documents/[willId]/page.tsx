import { redirect } from "next/navigation";
import { SingleWillDocument } from "~/components/will-documents/single";
import { RelationshipWillDocument } from "~/components/will-documents/relationship";
import { FamilyWillDocument } from "~/components/will-documents/family";
import { CustomWillDocument } from "~/components/will-documents/custom";
import { db } from "~/libs/prisma";
import { routes } from "~/config/routes";

export const dynamic = "force-dynamic";

export default async function WillDocument({
  params,
  searchParams,
}: {
  params: {
    willId: string;
  };
  searchParams: {
    key: string;
  };
}) {
  const generationKey = searchParams.key;
  if (!generationKey) {
    redirect(routes.notFound);
  }

  const will = await db.will.findFirst({
    where: {
      id: params.willId,
    },
    include: {
      people: {
        include: {
          pet: true,
        },
      },
    },
  });
  if (!will) {
    redirect(routes.notFound);
  }

  if (will.status !== "COMPLETE_PAID") {
    redirect(routes.notFound);
  }

  if (generationKey !== will.generationKey) {
    redirect(routes.notFound);
  }

  const willType = will.creationType;
  switch (willType) {
    case "SINGLE":
      return <SingleWillDocument will={will} />;
    case "RELATIONSHIP":
      return <RelationshipWillDocument will={will} />;
    case "FAMILY":
      return <FamilyWillDocument will={will} />;
    default:
      return <CustomWillDocument will={will} />;
  }
}
