"use client";

import { useState } from "react";
import { useSignUp, SignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Skeleton } from "~/components/ui/skeleton";
import { Button } from "~/components/ui/button";
import { routes } from "~/config/routes";
import { trackDataLayer } from "~/libs/dataLayer";
import { env } from "@/env.mjs";
import { formSchema, FieldValues } from "./schema";
import { formatPhoneNumber, getFirstErrorMessage } from "./utils";

export function SignUpForm() {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { push } = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();

  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (values: FieldValues) => {
    if (!isLoaded) return;
    try {
      setLoadingSubmit(true);
      const { phoneNumber } = values;
      const formattedPhoneNumber = phoneNumber
        ? formatPhoneNumber(phoneNumber)
        : undefined;
      const result = await signUp.create({
        ...values,
        phoneNumber: formattedPhoneNumber,
      });
      if (result?.status === "complete") {
        await setActive({ session: result.createdSessionId });
        trackDataLayer({ event: "create_account" });
        push(routes.dashboard.main);
      } else {
        setErrorMessage(
          "There was a problem signing up. Please try again or try a different method."
        );
      }
    } catch (error: any) {
      setErrorMessage(getFirstErrorMessage(error.errors));
      setLoadingSubmit(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-6 grid grid-cols-2 gap-x-[20px] gap-y-[2px]">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="grid-cols-1">
                <FormLabel className="hidden">First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="grid-cols-1">
                <FormLabel className="hidden">Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="hidden">Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="Email address" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="hidden">Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Phone number (optional)"
                    type="tel"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="hidden">Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {errorMessage && (
            <p className="col-span-2 text-sm text-error">{errorMessage}</p>
          )}
        </div>
        <p className="mb-6 text-center text-xs text-brand-gray">
          By continuing you agree you have read, understand and accept
          Surewill&apos;s{" "}
          <Link
            href={`${env.NEXT_PUBLIC_WEBSITE_URL}/privacy`}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap underline"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            href={`${env.NEXT_PUBLIC_WEBSITE_URL}/terms-conditions`}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap underline"
          >
            Terms and Conditions
          </Link>
          .
        </p>
        <div className="mb-6 flex w-full justify-center">
          <Button
            rightIcon={<ArrowRight />}
            loading={loadingSubmit}
            type="submit"
          >
            Create Account
          </Button>
        </div>
      </form>
      <p className="text-md mb-8 w-full text-center">
        Already have an account?{" "}
        <Link href={routes.auth.signIn} className="text-brand-green underline">
          Sign in
        </Link>
      </p>
      {!isLoaded ? (
        <>
          <Skeleton className="mb-[10px] h-[44px] bg-white" />
          <Skeleton className="mb-[10px] h-[44px] bg-white" />
        </>
      ) : (
        <SignUp />
      )}
    </Form>
  );
}
