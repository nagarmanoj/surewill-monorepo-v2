"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import type { UpdateWillInput } from "~/app/api/wills/[willId]/relationship/types";
import { useSubmit } from "~/hooks/useSubmit";
import { routes } from "~/config/routes";
import { EMPTY_ADDRESS } from "~/utils/addresses";
import { trackDataLayer } from "~/libs/dataLayer";
import { HandleRemainsFormSection } from "../components/HandleRemains";
import { AssetsFormSection } from "./form-sections/Assets";
import { PetsFormSection } from "./form-sections/Pets";
import { ExecutorFormSection } from "./form-sections/Executor";
import { formatFormValues } from "./utils";
import { formSchema, FieldValues } from "./schema";

type Props = {
  willId: string;
  isWillPaid: boolean;
  initialValues: FieldValues;
  isInitialCreate: boolean;
};

export function WillRelationshipForm({
  willId,
  isWillPaid,
  initialValues,
  isInitialCreate,
}: Props) {
  const { apiFetch, loading, setLoading, push, refresh, toast } = useSubmit();
  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
    mode: "onChange",
    shouldFocusError: true,
  });

  const onSubmit = async (values: FieldValues) => {
    setLoading(true);
    const response = await apiFetch<{}, UpdateWillInput>(
      `/api/wills/${willId}/relationship`,
      {
        method: "PUT",
        payload: {
          ...formatFormValues(values),
          isWillPaid,
        },
      }
    );
    if (response.success) {
      trackDataLayer({ event: "complete_will" });
      refresh();
      push(routes.dashboard.review.relationship);
    } else {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  const partner = form.watch("partner");
  const partnerAsExecutor = form.watch("partnerAsExecutor");
  const professionalAsExecutor = form.watch("professionalAsExecutor");
  const professionalAsBackupExecutor = form.watch(
    "professionalAsBackupExecutor"
  );

  const clearExecutorDetails = () => {
    form.setValue("executor.fullName", "");
    form.setValue("executor.email", "");
    form.setValue("executor.address", EMPTY_ADDRESS);
    form.clearErrors("executor");
  };

  const clearBackupExecutorDetails = () => {
    form.setValue("backupExecutor.fullName", "");
    form.setValue("backupExecutor.email", "");
    form.setValue("backupExecutor.address", EMPTY_ADDRESS);
    form.clearErrors("backupExecutor");
  };

  const toggleProfessionalExecutor = (professionalAsExecutor: boolean) => {
    if (professionalAsExecutor) {
      form.setValue("professionalAsExecutor", true);
      togglePartnerExecutor(false);
      clearExecutorDetails();
    } else {
      form.setValue("professionalAsExecutor", false);
    }
  };

  const toggleProfessionalBackupExecutor = (
    professionalAsExecutor: boolean
  ) => {
    if (professionalAsExecutor) {
      form.setValue("professionalAsBackupExecutor", true);
      clearBackupExecutorDetails();
    } else {
      form.setValue("professionalAsBackupExecutor", false);
    }
  };

  const togglePartnerExecutor = (partnerAsExecutor: boolean) => {
    if (partnerAsExecutor) {
      form.setValue("partnerAsExecutor", true);
      form.setValue("executor.fullName", partner.fullName);
      form.setValue("executor.address", {
        ...partner.address,
        line2: partner.address.line2 || "",
      });
      toggleProfessionalExecutor(false);
    } else {
      form.setValue("partnerAsExecutor", false);
      form.setValue("executor.fullName", "");
      form.setValue("executor.address", EMPTY_ADDRESS);
      clearBackupExecutorDetails();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-2 max-w-form-full"
        noValidate
      >
        <div className="space-y-10">
          <AssetsFormSection
            control={form.control}
            initialPartnerAddress={initialValues.partner.address}
            errors={form.formState.errors}
          />
          <div>
            <PetsFormSection
              control={form.control}
              partner={partner}
              setFormValue={form.setValue}
              initialPets={initialValues.pets}
              isInitialCreate={isInitialCreate}
              errors={form.formState.errors}
            />
          </div>
          <div>
            <HandleRemainsFormSection control={form.control} />
          </div>
          <ExecutorFormSection
            control={form.control}
            partner={partner}
            toggleProfessionalExecutor={toggleProfessionalExecutor}
            toggleProfessionalBackupExecutor={toggleProfessionalBackupExecutor}
            togglePartnerExecutor={togglePartnerExecutor}
            partnerAsExecutor={partnerAsExecutor}
            professionalAsExecutor={professionalAsExecutor}
            professionalAsBackupExecutor={professionalAsBackupExecutor}
            clearBackupExecutor={clearBackupExecutorDetails}
            errors={form.formState.errors}
            initialExecutorAddress={initialValues.executor.address}
            initialBackupExecutorAddress={initialValues.backupExecutor?.address}
          />
          <Button
            type="submit"
            loading={loading}
            className="mb-6 w-full sm:w-auto md:w-[250px]"
            rightIcon={<ArrowRight />}
          >
            Continue to review
          </Button>
        </div>
      </form>
    </Form>
  );
}
