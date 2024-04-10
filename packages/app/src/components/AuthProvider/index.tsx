import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { env } from "@/env.mjs";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      afterSignInUrl={env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}
      afterSignUpUrl={env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL}
      appearance={{
        signUp: {
          variables: {
            colorBackground: "transparent",
            colorPrimary: "#742183",
          },
          elements: {
            rootBox: "w-full mb-6",
            form: "hidden",
            dividerRow: "hidden",
            footer: "hidden",
            logoBox: "hidden",
            socialButtons: "p-0 m-0 gap-0",
            card: "shadow-none p-0 w-full",
            formButtonPrimary:
              "before:content-['Create_Account'] before:text-[16px] before:normal-case before:font-normal",
          },
        },
        signIn: {
          variables: {
            colorBackground: "white",
            colorPrimary: "#742183",
          },
          elements: {
            logoBox: "hidden",
            footerActionText: "text-base",
            footerActionLink: "text-base",
            formFieldInput: "h-[44px]",
            formButtonPrimary:
              "h-[44px] hover:bg-brand-green text-lg before:text-[16px] normal-case",
          },
        },
        userButton: {
          variables: {
            colorBackground: "white",
          },
          elements: {
            userButtonPopoverActionButton__manageAccount: "hidden",
          },
        },
        layout: {
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "blockButton",
          shimmer: false,
        },
        elements: {
          header: "hidden",
          socialButtonsBlockButton:
            "bg-white hover:bg-white border-1 border-brand-gray-light h-[44px] mb-[10px] rounded-[8px]",
          formFieldInput:
            "border-brand-purple border-[1.5px] before:text-[14px]",
          formFieldLabel: "font-light",
          footer: "flex justify-center",
          footerActionLink: "text-brand-green hover:text-brand-green",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
