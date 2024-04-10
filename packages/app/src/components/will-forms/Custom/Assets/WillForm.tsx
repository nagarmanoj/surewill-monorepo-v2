"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useSubmit } from "~/hooks/useSubmit";
import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import type { UpdateWillInput } from "~/app/api/wills/[willId]/custom/assets/types";
import { routes } from "~/config/routes";
import { trackDataLayer } from "~/libs/dataLayer";
import { AddressSchema } from "~/utils/addresses";
import { PetCareSection } from "./form-sections/PetCare";
import { SpecialItemsSection } from "./form-sections/SpecialItems";
import { ResidualEstateSection } from "./form-sections/ResidualEstate";
import { FinancialSection } from "./form-sections/Financial";
import { formatFormValues } from "./utils";
import { FieldValues, formSchema } from "./schema";

type Props = {
  willId: string;
  initialValues: FieldValues;
  peopleOptions: Array<{
    id: string;
    fullName: string;
    address: AddressSchema;
  }>;
  hasChildren: boolean;
};

export function CustomWillAssets({
  willId,
  initialValues,
  peopleOptions,
  hasChildren,
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
      `/api/wills/${willId}/custom/assets`,
      {
        method: "PUT",
        payload: formatFormValues(values),
      }
    );
    if (response.success) {
      trackDataLayer({ event: "complete_asset" });
      refresh();
      push(routes.dashboard.willCustomExecutors);
    } else {
      toast.error(
        typeof response.error === "string"
          ? response.error
          : "Something went wrong"
      );
      setLoading(false);
    }
  };

  const residualEstateBeneficiaries = form.watch("residualEstateBeneficiaries");
  const assetPercentageAssigned = residualEstateBeneficiaries.reduce(
    (total, beneficiary) => {
      total += Number(beneficiary.percentageAssets);
      return total;
    },
    0
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-form-full"
        noValidate
      >
        <ResidualEstateSection
          control={form.control}
          peopleOptions={peopleOptions}
          setFormValue={form.setValue}
          errors={form.formState.errors}
          assetPercentageAssigned={assetPercentageAssigned}
          hasChildren={hasChildren}
        />
        <FinancialSection
          control={form.control}
          peopleOptions={peopleOptions}
          setFormValue={form.setValue}
          errors={form.formState.errors}
          clearErrors={form.clearErrors}
        />
        <PetCareSection control={form.control} />
        <SpecialItemsSection
          control={form.control}
          peopleOptions={peopleOptions}
          setFormValue={form.setValue}
          errors={form.formState.errors}
        />
        <Button
          type="submit"
          loading={loading}
          className="mb-6 w-full sm:w-auto md:w-[250px]"
          rightIcon={<ArrowRight />}
        >
          Continue to executor
        </Button>
      </form>
    </Form>
  );
}
