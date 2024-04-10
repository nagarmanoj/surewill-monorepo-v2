"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import type { UpdateWillInput } from "~/app/api/wills/[willId]/single/types";
import { useSubmit } from "~/hooks/useSubmit";
import { routes } from "~/config/routes";
import { trackDataLayer } from "~/libs/dataLayer";
import { EMPTY_ADDRESS } from "~/utils/addresses";
import { HandleRemainsFormSection } from "../components/HandleRemains";
import { AssetBeneficiaries } from "./form-sections/AssetBeneficiaries";
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

export function WillSimpleForm({
  willId,
  isWillPaid,
  initialValues,
  isInitialCreate,
}: Props) {
  const { apiFetch, loading, setLoading, push, refresh, toast } = useSubmit();
  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
    shouldFocusError: true,
  });

  const onSubmit = async (values: FieldValues) => {
    setLoading(true);
    const response = await apiFetch<{}, UpdateWillInput>(
      `/api/wills/${willId}/single`,
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
      push(routes.dashboard.review.single);
    } else {
      toast.error(
        typeof response.error === "string"
          ? response.error
          : "Something went wrong"
      );
      setLoading(false);
    }
  };

  const toggleProfessionalExecutor = (professionalAsExecutor: boolean) => {
    if (professionalAsExecutor) {
      form.setValue("professionalAsExecutor", true);
      form.setValue("executor.fullName", "");
      form.setValue("executor.email", "");
      form.setValue("executor.address", EMPTY_ADDRESS);
      form.clearErrors("executor");
    } else {
      form.setValue("professionalAsExecutor", false);
    }
  };

  const professionalAsExecutor = form.watch("professionalAsExecutor");

  const peopleOptions = form.watch("assetBeneficiaries");
  const assetPercentageAssigned = peopleOptions.reduce((total, person) => {
    total += Number(person.percentageAssets);
    return total;
  }, 0);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-form-full"
        noValidate
      >
        <div className="space-y-10">
          <AssetBeneficiaries
            control={form.control}
            assetPercentageAssigned={assetPercentageAssigned}
            errors={form.formState.errors}
          />
          <PetsFormSection
            control={form.control}
            people={peopleOptions}
            setFormValue={form.setValue}
            initialPets={initialValues.pets}
            errors={form.formState.errors}
            isInitialCreate={isInitialCreate}
          />
          <HandleRemainsFormSection control={form.control} />
          <ExecutorFormSection
            control={form.control}
            people={peopleOptions}
            toggleProfessionalExecutor={toggleProfessionalExecutor}
            professionalAsExecutor={professionalAsExecutor}
            setFormValue={form.setValue}
            initialExecutorName={initialValues.executor?.fullName}
            errors={form.formState.errors}
          />
          <div>
            <Button
              type="submit"
              loading={loading}
              className="mb-6 w-full sm:w-auto md:w-[250px]"
              rightIcon={<ArrowRight />}
            >
              Continue to review
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
