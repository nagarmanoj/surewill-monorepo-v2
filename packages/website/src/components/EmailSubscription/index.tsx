"use client";

import {
  FormControl,
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/Inputs/form";
import { FormEvent, useState, useTransition } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { Input } from "~/components/ui/Inputs/input";
import { Button } from "~/components/ui/button";
import { subscribe } from "./action";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { trackDataLayer } from "~/libs/dataLayer";
import { ArrowRight } from "lucide-react";

const ROUTES_WITH_EMAIL_SUBSCRIPTION_BANNER: Array<null | string> = [null];

type Props = {
  title: string;
  subtitle: string;
  inputPlaceholder: string;
  buttonText: string;
};

interface MessageType {
  message: string;
  type: "error" | "success";
}

const subScriptionClickHandle = ({ email }: { email: string }) => {
  trackDataLayer({
    event: "emailSubscriptionClick",
    data: {
      email,
    },
  });
};

const subScriptionSuccessHandle = ({ email }: { email: string }) => {
  trackDataLayer({
    event: "emailSubscriptionSuccess",
    data: {
      email,
    },
  });
};

const subScriptionFailHandle = ({
  email,
  reason,
}: {
  email: string;
  reason: string;
}) => {
  trackDataLayer({
    event: "emailSubscriptionFail",
    data: {
      email,
      failReason: reason,
    },
  });
};

export function EmailSubscription({
  title,
  subtitle,
  inputPlaceholder,
  buttonText,
}: Props) {
  const [message, SetMessage] = useState<MessageType>({
    message: "",
    type: "error",
  });

  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(
      z.object({
        email: z
          .string()
          .nonempty("Please add your email")
          .email("email is invalid"),
      })
    ),
    // shouldUseNativeValidation: true,
    mode: "onChange",
    shouldFocusError: true,
  });
  const [isLoading, setLoading] = useState(false);
  const segment = useSelectedLayoutSegment();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit(async (data) => {
      setLoading(true);
      try {
        subScriptionClickHandle({
          email: data.email,
        });
        SetMessage({
          message: "",
          type: "success",
        });
        const subscribeOptions = {
          method: "POST",
          body: JSON.stringify({
            email: data.email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        };
        const subscribeResponse = await fetch(
          "/api/emailSubscription",
          subscribeOptions
        );
        const responseMessage = await subscribeResponse.json();
        if (responseMessage?.error) {
          SetMessage({
            message: responseMessage?.error,
            type: "error",
          });
          form.reset();
          setLoading(false);
          return;
        }
        SetMessage({
          message: responseMessage?.message,
          type: "success",
        });
        subScriptionSuccessHandle({
          email: data.email,
        });
        form.reset();
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        if (error?.message) {
          SetMessage({
            message: error?.message,
            type: "error",
          });
          subScriptionFailHandle({
            email: data.email,
            reason: error?.message,
          });

          return;
        }
        SetMessage({
          message: "something wrong",
          type: "error",
        });
        subScriptionFailHandle({
          email: data.email,
          reason: "unknow",
        });
      }
    })(e);
  };

  if (!ROUTES_WITH_EMAIL_SUBSCRIPTION_BANNER.includes(segment)) return null;

  return (
    <div className="bg-brand-green-light sm:h-[244px] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 sm:bg-wave-green bg-right-bottom bg-no-repeat bg-contain w-[1440px] h-[244px]" />
      <div className="relative container flex flex-col lg:flex-row justify-around gap-6 py-14 md:py-14 lg:py-24 ">
        <div className="flex flex-col flex-1 text-xl text-brand-blue-1">
          <p className="font-semibold pb-1">{title}</p>
          <p>{subtitle}</p>
        </div>
        <div className="flex-1">
          <Form {...form}>
            <form
              className="sm:flex flex-1 self-stretch flex-row gap-3"
              onSubmit={handleSubmit}
            >
              <FormField
                control={form.control}
                name={`email`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        theme="light"
                        placeholder="Email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="sm:-ml-6 self-start sm:w-[220px] mt-3 sm:mt-0"
                loading={isLoading}
                rightIcon={<ArrowRight />}
              >
                {buttonText}
              </Button>
            </form>
            {!!message.message && (
              <p
                className={clsx(
                  "lg:my-3",
                  message.type === "success" && "text-white",
                  message.type === "error" && "text-red-500"
                )}
              >
                {message.message}
              </p>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}
