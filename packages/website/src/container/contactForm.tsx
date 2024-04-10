"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/Inputs/form";
import { Input } from "~/components/ui/Inputs/input";
import { Textarea } from "~/components/ui/Inputs/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/Inputs/select";
import { Button } from "~/components/ui/button";
import { FormEvent, use, useState } from "react";
import { ArrowRight } from "lucide-react";
import { trackDataLayer } from "~/libs/dataLayer";

export const ContactForm = () => {
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [successMessage, setSuccessMessage] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      state: "",
      question: "",
    },
    resolver: zodResolver(
      z.object({
        firstName: z.string().nonempty("Please add your name"),
        lastName: z.string().nonempty("Please add your name"),
        email: z.string().nonempty("Please add your email"),
        state: z.string().nonempty("Please add your state"),
        question: z.string().nonempty("Please add your question"),
      })
    ),
    // shouldUseNativeValidation: true,
    mode: "onChange",
    shouldFocusError: true,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage(null);
    form.handleSubmit(async (data) => {
      setLoading(true);
      setErrorMessage(null);
      try {
        trackDataLayer({
          event: "contact_submit",
          data,
        });
        const postData = await fetch("/api/sendContactEmail", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            text: `
              New Contact Form.
              Name: ${data?.firstName} ${data?.lastName},
              Email: ${data?.email},
              State: ${data?.state},
              Question: ${data?.question}
            `,
            email: data?.email,
            firstName: data?.firstName,
            lastName: data?.lastName,
          }),
        });
        const result = await postData.json();

        if (!Array.isArray(result)) throw new Error("something went wrong");
        if (result?.length > 0 && result[0]?.status === "rejected") {
          throw new Error(result[0]?.reject_reason);
          return;
        }
        trackDataLayer({
          event: "contact_submit_success",
          data,
        });
        setSuccessMessage("Your question has been sent!");
        setLoading(false);
        form.reset();
      } catch (error: any) {
        trackDataLayer({
          event: "contact_submit_fail",
          data,
        });
        setSuccessMessage(null);
        setLoading(false);
        if (error?.message) {
          setErrorMessage(error?.message);
          return;
        }
        setErrorMessage("something wrong");
      }
    })(e);
  };

  return (
    <Form {...form}>
      {/* <div>{JSON.stringify(form.formState.errors)}</div> */}
      <form
        className="mx-auto space-y-2.5 my-[30px] !block"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="grid grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name={`firstName`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`lastName`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name={`email`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input id="email" type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`state`}
          render={({ field }) => (
            <>
              <Select
                onValueChange={(value: string) => {
                  field.onChange(value);
                }}
                defaultValue={field.value || undefined}
              >
                <FormControl>
                  <SelectTrigger className="text-brand-gray">
                    <SelectValue placeholder="Select Your State" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ACT">
                    Australian Capital Territory
                  </SelectItem>
                  <SelectItem value="NSW">New South Wales</SelectItem>
                  <SelectItem value="NT">Northern Territory</SelectItem>
                  <SelectItem value="QLD">Queensland</SelectItem>

                  <SelectItem value="SA">South Australia</SelectItem>
                  <SelectItem value="TAS">Tasmania</SelectItem>
                  <SelectItem value="VIC">Victoria</SelectItem>
                  <SelectItem value="WA">Western Australia</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </>
          )}
        />
        <FormField
          control={form.control}
          name={`question`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  id="question"
                  rows={5}
                  placeholder="How can we help you today?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" loading={loading} rightIcon={<ArrowRight />}>
          Send Question
        </Button>
        {successMessage && (
          <p className="text-sm text-success my-3">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-sm text-error my-3">{errorMessage}</p>
        )}
      </form>
    </Form>
  );
};
