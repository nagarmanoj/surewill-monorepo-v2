"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { useSubmit } from "~/hooks/useSubmit";
import { routes } from "~/config/routes";
import type { UpdateWillInput } from "~/app/api/wills/[willId]/custom/roles/types";
import { HandleRemainsFormSection } from "~/components/will-forms/components/HandleRemains";
import { EMPTY_ADDRESS } from "~/utils/addresses";
import { GuardianFormSection } from "./form-sections/Guardian";
import { PetsFormSection } from "./form-sections/Pets";
import { DonateOrgansFormSection } from "./form-sections/DonateOrgans";
import { formatFormValues } from "./utils";
import { formSchema, FieldValues } from "./schema";
import { trackDataLayer } from "~/libs/dataLayer";

type Props = {
  willId: string;
  initialValues: FieldValues;
};

export function CustomWillRoles({ willId, initialValues }: Props) {
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
      `/api/wills/${willId}/custom/roles`,
      {
        method: "PUT",
        payload: formatFormValues(values),
      }
    );
    if (response.success) {
      trackDataLayer({ event: "complete_role" });
      refresh();
      push(routes.dashboard.willCustomAssets);
    } else {
      toast.error(
        typeof response.error === "string"
          ? response.error
          : "Something went wrong"
      );
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-form-full"
        noValidate
      >
        <div className="space-y-10">
          <GuardianFormSection
            control={form.control}
            initialChoiceValue={initialValues.hasChildren}
            errors={form.formState.errors}
            initialGuardianAddress={initialValues.guardian?.address || null}
            initialBackupGuardianAddress={
              initialValues.backupGuardian?.address || null
            }
            clearGuardians={() => {
              form.setValue("guardian", null);
              form.setValue("backupGuardian", null);
              form.setValue("hasChildren", false);
            }}
            setEmptyGuardians={() => {
              form.setValue("guardian.fullName", "");
              form.setValue("guardian.address", EMPTY_ADDRESS);
              form.setValue("backupGuardian.fullName", "");
              form.setValue("backupGuardian.address", EMPTY_ADDRESS);
              form.setValue("hasChildren", true);
            }}
          />
          <div>
            <PetsFormSection
              control={form.control}
              initialChoiceValue={initialValues.hasPets}
              errors={form.formState.errors}
              clearPets={() => {
                form.setValue("pets", []);
                form.setValue("hasPets", false);
              }}
              setEmptyPets={() => {
                form.setValue("pets", [
                  {
                    name: "",
                    type: "",
                    ownerFullName: "",
                    ownerAddress: EMPTY_ADDRESS,
                  },
                ]);
                form.setValue("hasPets", true);
              }}
            />
          </div>
          <HandleRemainsFormSection control={form.control} />
          <DonateOrgansFormSection control={form.control} />
          <Button
            type="submit"
            loading={loading}
            className="mb-6 w-full sm:w-auto md:w-[250px]"
            rightIcon={<ArrowRight />}
          >
            Continue to assets
          </Button>
        </div>
      </form>
    </Form>
  );
}
