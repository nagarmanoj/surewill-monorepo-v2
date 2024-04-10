"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import type { UpdateWillInput } from "~/app/api/wills/[willId]/family/types";
import { useSubmit } from "~/hooks/useSubmit";
import { routes } from "~/config/routes";
import { HandleRemainsFormSection } from "../components/HandleRemains";
import { trackDataLayer } from "~/libs/dataLayer";
import { AddressSchema, EMPTY_ADDRESS } from "~/utils/addresses";
import { GuardianFormSection } from "./form-sections/Guardian";
import { PetsFormSection } from "./form-sections/Pets";
import { ExecutorFormSection } from "./form-sections/Executor";
import { AssetsFormSection } from "./form-sections/Assets";
import { formatFormValues } from "./utils";
import { formSchema, FieldValues } from "./schema";

type Props = {
  willId: string;
  isWillPaid: boolean;
  initialValues: FieldValues;
  isInitialCreate: boolean;
};

export function WillFamilyForm({
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
      `/api/wills/${willId}/family`,
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
      push(routes.dashboard.review.family);
    } else {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  const partner = form.watch("partner");
  const executor = form.watch("executor");
  const backupExecutor = form.watch("backupExecutor");
  const partnerAsGuardian = form.watch("partnerAsGuardian");
  const partnerAsBackupGuardian = form.watch("partnerAsBackupGuardian");
  const partnerAsExecutor = form.watch("partnerAsExecutor");
  const professionalAsExecutor = form.watch("professionalAsExecutor");
  const professionalAsBackupExecutor = form.watch(
    "professionalAsBackupExecutor"
  );
  const guardian = form.watch("guardian");
  const backupGuardian = form.watch("backupGuardian");

  const petAndExecutorPeopleOptions = [
    partner,
    !partnerAsGuardian ? guardian : null,
    backupGuardian,
  ]
    .filter(Boolean)
    .filter(
      (person) => person?.fullName && person?.address?.postalCode.length > 0
    ) as { fullName: string; address: AddressSchema }[];

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
      form.setValue("executor.address", partner.address);
      form.setValue("professionalAsExecutor", false);
    } else {
      form.setValue("partnerAsExecutor", false);
      form.setValue("executor.fullName", "");
      form.setValue("executor.address", EMPTY_ADDRESS);
      clearBackupExecutorDetails();
    }
  };

  const togglePartnerAsGuardian = (partnerAsGuardian: boolean) => {
    if (partnerAsGuardian) {
      form.setValue("partnerAsGuardian", true);
      form.setValue("guardian.fullName", partner.fullName);
      form.setValue("guardian.address", partner.address);
    } else {
      form.setValue("guardian.fullName", "");
      form.setValue("guardian.address", EMPTY_ADDRESS);
      form.setValue("partnerAsGuardian", false);
    }
  };

  const togglePartnerAsBackupGuardian = (partnerAsGuardian: boolean) => {
    if (partnerAsGuardian) {
      form.setValue("partnerAsBackupGuardian", true);
      form.setValue("backupGuardian.fullName", partner.fullName);
      form.setValue("backupGuardian.address", partner.address);
    } else {
      form.setValue("backupGuardian.fullName", "");
      form.setValue("backupGuardian.address", EMPTY_ADDRESS);
      form.setValue("partnerAsBackupGuardian", false);
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
          <GuardianFormSection
            control={form.control}
            partner={partner}
            initialGuardianAddress={initialValues?.guardian?.address}
            initialBackupGuardianAddress={
              initialValues?.backupGuardian?.address
            }
            errors={form.formState.errors}
            partnerAsGuardian={partnerAsGuardian}
            partnerAsBackupGuardian={partnerAsBackupGuardian}
            togglePartnerAsGuardian={togglePartnerAsGuardian}
            togglePartnerAsBackupGuardian={togglePartnerAsBackupGuardian}
          />
          <PetsFormSection
            control={form.control}
            setFormValue={form.setValue}
            initialPets={initialValues.pets}
            errors={form.formState.errors}
            isInitialCreate={isInitialCreate}
            peopleOptions={petAndExecutorPeopleOptions}
            partner={partner}
          />
          <div>
            <HandleRemainsFormSection control={form.control} />
          </div>
          <ExecutorFormSection
            control={form.control}
            setFormValue={form.setValue}
            partner={partner}
            guardian={guardian}
            backupGuardian={backupGuardian}
            toggleProfessionalExecutor={toggleProfessionalExecutor}
            toggleProfessionalBackupExecutor={toggleProfessionalBackupExecutor}
            togglePartnerExecutor={togglePartnerExecutor}
            partnerAsExecutor={partnerAsExecutor}
            professionalAsExecutor={professionalAsExecutor}
            professionalAsBackupExecutor={professionalAsBackupExecutor}
            clearBackupExecutor={clearBackupExecutorDetails}
            errors={form.formState.errors}
            initialExecutor={initialValues.executor}
            initialBackupExecutor={initialValues.backupExecutor || undefined}
            executor={executor}
            backupExecutor={backupExecutor}
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
