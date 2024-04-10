"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import type { WillCreationType } from "@prisma/client";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { AddressInput } from "~/components/AddressInput";
import type { UpdateProfileInput } from "~/app/api/profile/types";
import { apiRoutes, routes } from "~/config/routes";
import { useSubmit } from "~/hooks/useSubmit";
import { trackDataLayer } from "~/libs/dataLayer";
import { getInitialAddressLine } from "~/utils/addresses";
import { FormSection } from "./FormSection";
import { formSchema, FieldValues } from "./schema";

type Props = {
  willId?: string;
  initialValues: FieldValues;
  willCreationType?: WillCreationType;
  isNameChangeDisabled: boolean;
};

export function ProfileForm({
  willId,
  initialValues,
  willCreationType,
  isNameChangeDisabled,
}: Props) {
  const { apiFetch, loading, setLoading, push, refresh, toast } = useSubmit();
  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialValues,
      willCreationType: willCreationType || initialValues.willCreationType,
    },
  });

  const onSubmit = async (values: FieldValues) => {
    setLoading(true);
    const response = await apiFetch<{}, UpdateProfileInput>(apiRoutes.profile, {
      method: "POST",
      payload: {
        ...values,
        willId,
      },
    });
    if (response.success) {
      trackDataLayer({ event: "complete_profile" });
      const nextUrl: { [key in WillCreationType]: string } = {
        ["SINGLE"]: routes.dashboard.willSingle,
        ["RELATIONSHIP"]: routes.dashboard.willRelationship,
        ["FAMILY"]: routes.dashboard.willFamily,
        ["CUSTOM"]: routes.dashboard.willCustom,
      };
      const creationType = (willCreationType ||
        initialValues.willCreationType) as WillCreationType;
      refresh();
      push(nextUrl[creationType]);
    } else {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-6 max-w-form-2"
        noValidate
      >
        <FormSection
          heading="Legal name"
          description="Enter your full legal name"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="hidden">First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="First name"
                    {...field}
                    disabled={isNameChangeDisabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="hidden">Middle Name</FormLabel>
                <FormControl>
                  <Input placeholder="Middle name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="hidden">Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Last name"
                    {...field}
                    disabled={isNameChangeDisabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>
        <FormSection
          heading="Date of Birth"
          description="Select your date of birth"
        >
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="hidden">Date of birth</FormLabel>
                <FormControl className="max-w-[200px]">
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>
        <FormSection
          heading="Residential address"
          description="Enter your current address"
        >
          <FormItem>
            <FormLabel className="hidden">Address</FormLabel>
            <AddressInput
              initialValue={getInitialAddressLine(initialValues.address)}
              formFieldPrefix="address"
              errors={form.formState.errors?.address}
            />
            <FormMessage />
          </FormItem>
        </FormSection>
        <Button
          type="submit"
          loading={loading}
          rightIcon={<ArrowRight />}
          className="w-full sm:w-auto"
        >
          Continue to Will
        </Button>
      </form>
    </Form>
  );
}
