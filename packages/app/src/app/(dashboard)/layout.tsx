import "~/styles/globals.css";
import Script from "next/script";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { DesktopAside } from "~/components/Aside/DesktopAside";
import { MobileAside } from "~/components/Aside/MobileAside";
import { env } from "@/env.mjs";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="grid min-h-screen bg-brand-blue-extraLight sm:grid-cols-1 md:grid-cols-[250px_minmax(0,1fr)]">
        <Toaster />
        <DesktopAside />
        <div className="container relative flex w-full max-w-5xl flex-col">
          <header className="z-40 h-[80px] flex-shrink-0 flex-grow-0 py-4 md:px-8">
            <div className="flex h-full items-center justify-between md:justify-end">
              <MobileAside />
              <div>
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </header>
          <main className="mb-16 grow">{children}</main>
          <footer className="mb-4 flex-shrink-0 flex-grow-0 text-sm text-brand-gray">
            Copyright © {new Date().getFullYear()} Surewill Tech Pty Ltd. All
            rights reserved. Surewill does not provide legal advice.
          </footer>
        </div>
      </div>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places&callback=Function.prototype`}
      />
    </>
  );
}
