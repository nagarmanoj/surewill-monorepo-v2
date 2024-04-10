import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { StartWill } from "~/components/DashboardPage/StartWill";
import { ContinueWill } from "~/components/DashboardPage/ContinueWill";
import { FinishedWill } from "~/components/DashboardPage/FinishedWill";
import { DeleteTestData } from "~/components/DeleteTestData";
import { EventTracker } from "~/components/EventTracker";
import { routes } from "~/config/routes";
import { canStillEditWill, fetchWill } from "~/utils/will";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: {
    creating?: string;
  };
};

export default async function DashboardHomePage({ searchParams }: Props) {
  const user = await currentUser();
  if (!user) {
    redirect(routes.auth.signIn);
  }
  const will = await fetchWill(user.id);

  if (!will) {
    return (
      <>
        <StartWill userFirstName={user?.firstName} />
        <EventTracker event="sign_in" urlParam="login" />
      </>
    );
  }

  if (will.status === "IN_PROGRESS" || will.status === "COMPLETE_UNPAID") {
    return (
      <>
        <ContinueWill will={will} />
        <EventTracker event="sign_in" urlParam="login" />
        {process.env.VERCEL_ENV !== "production" &&
        process.env.NEXT_PUBLIC_ENABLE_DELETE_TEST_BUTTON === "true" ? (
          <DeleteTestData willId={will.id} />
        ) : null}
      </>
    );
  }

  const canEditFinishedWill = canStillEditWill(will.createdAt);
  return (
    <>
      <FinishedWill
        willId={will.id}
        firstName={will.firstName}
        regeneratingWillAt={searchParams.creating}
        willGeneratedAt={will.firstGeneratedAt as Date}
        canStillEdit={canEditFinishedWill}
      />
      <EventTracker event="sign_in" urlParam="login" />
      {process.env.VERCEL_ENV !== "production" &&
      process.env.NEXT_PUBLIC_ENABLE_DELETE_TEST_BUTTON === "true" ? (
        <DeleteTestData willId={will.id} />
      ) : null}
    </>
  );
}
