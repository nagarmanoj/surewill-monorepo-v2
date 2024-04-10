import {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useMemo,
} from "react";
import { FieldError, useFormContext } from "react-hook-form";
import usePlacesAutocomplete, { getDetails } from "use-places-autocomplete";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from "~/components/ui/popover";
import { Button } from "~/components//ui/button";
import { cn } from "~/libs/utils";
import type { AddressSchema } from "~/utils/addresses";
import { AddressForm } from "./AddressForm";
import { formatAddressComponents } from "./utils";

type AddressError = {
  line1?: FieldError;
  line2?: FieldError;
  city?: FieldError;
  state?: FieldError;
  postalCode?: FieldError;
};

type Props = {
  initialValue?: string;
  formFieldPrefix: string;
  errors?: AddressError;
  onInputChange?: () => void;
};

export const AddressInput = forwardRef<{ clearInputValue: () => void }, Props>(
  (
    { initialValue, formFieldPrefix, errors = {}, onInputChange }: Props,
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState(initialValue || "");
    const [showFullAddress, setShowFullAddress] = useState(false);

    // Allow parent component to clear the internal state during form changes
    useImperativeHandle(ref, () => ({
      clearInputValue() {
        setInputValue("");
      },
    }));

    const hasLine1Error = useMemo(() => !!errors.line1, [errors]);

    useEffect(() => {
      const hasAddressError = Object.values(errors).some((value) => !!value);
      if (hasAddressError) {
        if (!hasLine1Error) {
          setShowFullAddress(true);
        } else {
          setShowFullAddress(false);
        }
      }
    }, [errors, hasLine1Error]);

    const { setValue: setFormValue, clearErrors } = useFormContext();

    const {
      setValue,
      suggestions: { loading, status, data },
    } = usePlacesAutocomplete({
      requestOptions: {
        componentRestrictions: { country: "au" },
      },
      debounce: 500,
    });

    const handleSelectAddress = async (address: {
      place_id: string;
      description: string;
    }) => {
      const addressDetails = await getDetails({
        placeId: address.place_id,
        fields: ["name", "address_components"],
      });
      if (!addressDetails?.address_components) {
        return setShowFullAddress(true);
      }
      const formattedAddress = formatAddressComponents(
        addressDetails.address_components,
        addressDetails.name
      );
      setInputValue(address.description);
      setFormValue(formFieldPrefix, formattedAddress);
      clearErrors(formFieldPrefix);
      const hasRequiredFields = Object.keys(formattedAddress)
        .filter((key) => key !== "line2") // line2 is the only field not required
        .every((key) => !!formattedAddress[key as keyof AddressSchema]);
      if (!hasRequiredFields) {
        setShowFullAddress(true);
        setInputValue(formattedAddress.line1);
      } else {
        setShowFullAddress(false);
      }
      setOpen(false);
    };

    const renderResults = () => {
      if (!data.length) return <></>;
      return (
        <ul>
          {data.map((suggestion) => {
            const { place_id, structured_formatting } = suggestion;
            return (
              <li
                key={place_id}
                value={place_id}
                onClick={() => handleSelectAddress(suggestion)}
                className="cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 outline-none hover:bg-brand-green hover:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                <span className="font-medium">
                  {structured_formatting.main_text}
                </span>{" "}
                <small>{structured_formatting.secondary_text}</small>
              </li>
            );
          })}
        </ul>
      );
    };

    const renderNoResults = () => (
      <div>
        <div className="p-4 text-sm">No results found</div>
        <hr className="pb-2" />
        <Button
          variant="link"
          size="sm"
          className="text-brand-gray"
          onClick={() => {
            setShowFullAddress(true);
            setOpen(false);
          }}
        >
          Enter address manually
        </Button>
      </div>
    );

    const renderLoading = () => (
      <div className="p-2">
        <div className="text">Loading...</div>
      </div>
    );

    return (
      <>
        <Popover open={open} onOpenChange={() => console}>
          <PopoverAnchor>
            <Input
              placeholder="Address"
              value={inputValue || ""}
              aria-invalid={hasLine1Error}
              onChange={(event) => {
                setOpen(true);
                const { value } = event.target;
                setValue(value);
                setFormValue(`${formFieldPrefix}.line1`, value);
                setFormValue(`${formFieldPrefix}.line2`, "");
                setFormValue(`${formFieldPrefix}.city`, "");
                setFormValue(`${formFieldPrefix}.state`, "");
                setFormValue(`${formFieldPrefix}.postalCode`, "");
                setInputValue(value);
                onInputChange?.();
              }}
            />
            {hasLine1Error && (
              <p className="mt-2 text-sm text-error">Please enter an address</p>
            )}
          </PopoverAnchor>
          <PopoverContent
            className="w-auto min-w-[325px] max-w-lg p-2"
            align="start"
            onInteractOutside={() => setOpen(false)}
            onOpenAutoFocus={(event) => event?.preventDefault()}
          >
            {loading && renderLoading()}
            {status === "OK" && renderResults()}
            {(status === "ZERO_RESULTS" || status === "") && renderNoResults()}
          </PopoverContent>
        </Popover>
        <div className={cn("mt-4 hidden", showFullAddress && "block")}>
          <AddressForm formFieldPrefix={formFieldPrefix} />
        </div>
      </>
    );
  }
);

AddressInput.displayName = "AddressInput";
