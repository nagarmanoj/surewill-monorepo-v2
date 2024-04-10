"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useSubmit } from "~/hooks/useSubmit";
import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import type { UpdateWillInput } from "~/app/api/wills/[willId]/custom/executors/types";
import { routes } from "~/config/routes";
import { trackDataLayer } from "~/libs/dataLayer";
import { AddressSchema } from "~/utils/addresses";
import { formatFormValues } from "./utils";
import { ExecutorFormSection } from "./form-sections/Executor";
import { BackupExecutorFormSection } from "./form-sections/BackupExecutor";
import { FieldValues, formSchema } from "./schema";

type Props = {
  willId: string;
  isWillPaid: boolean;
  initialValues: FieldValues;
  peopleOptions: Array<{
    id: string;
    fullName: string;
    address: AddressSchema;
    email: string;
  }>;
};

export function CustomWillExecutors({
  willId,
  isWillPaid,
  initialValues,
  peopleOptions,
}: Props) {
  const { loading, setLoading, apiFetch, push, refresh, toast } = useSubmit();
  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
    mode: "onChange",
    shouldFocusError: true,
  });

  const onSubmit = async (values: FieldValues) => {
    setLoading(true);
    const response = await apiFetch<{}, UpdateWillInput>(
      `/api/wills/${willId}/custom/executors`,
      {
        method: "PUT",
        payload: {
          ...formatFormValues(values),
          isWillPaid,
        },
      }
    );
    if (response.success) {
      trackDataLayer({ event: "complete_executor" });
      refresh();
      push(routes.dashboard.review.custom);
    } else {
      toast.error(
        typeof response.error === "string"
          ? response.error
          : "Something went wrong"
      );
      setLoading(false);
    }
  };

  const executor = form.watch("executor");
  const backupExecutor = form.watch("backupExecutor");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-form-full"
        noValidate
      >
        <div className="mb-8 flex flex-col gap-8">
          <ExecutorFormSection
            control={form.control}
            setFormValue={form.setValue}
            people={peopleOptions.filter(
              (person) => person.fullName !== backupExecutor?.fullName // backup executor cannot be the same as executor
            )}
            initialExecutorName={initialValues?.executor?.fullName}
            initialExecutorAddress={initialValues?.executor?.address || null}
            clearExecutorErrors={() => form.clearErrors("executor")}
            errors={form.formState.errors}
          />
          <BackupExecutorFormSection
            control={form.control}
            setFormValue={form.setValue}
            people={peopleOptions.filter(
              (person) => person.fullName !== executor?.fullName
            )} // backup executor cannot be the same as executor
            initialExecutorName={initialValues?.backupExecutor?.fullName}
            initialExecutorAddress={
              initialValues?.backupExecutor?.address || null
            }
            clearExecutorErrors={() => form.clearErrors("backupExecutor")}
            errors={form.formState.errors}
          />
        </div>
        <Button
          type="submit"
          loading={loading}
          className="mb-6 w-full sm:w-auto md:w-[250px]"
          rightIcon={<ArrowRight />}
        >
          Continue to review
        </Button>
      </form>
    </Form>
  );
}
