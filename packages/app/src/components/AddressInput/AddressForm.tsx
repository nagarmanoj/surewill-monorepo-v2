import { Input } from "~/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";

type Props = {
  formFieldPrefix: string;
};

export function AddressForm({ formFieldPrefix }: Props) {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
      <FormField
        name={`${formFieldPrefix}.line2`}
        render={({ field }) => (
          <FormItem className="col-span-1">
            <FormControl>
              <Input placeholder="Line 2 (optional)" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name={`${formFieldPrefix}.city`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="City" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name={`${formFieldPrefix}.state`}
        render={({ field }) => (
          <FormItem className="col-span-1">
            <FormControl>
              <Input placeholder="State" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name={`${formFieldPrefix}.postalCode`}
        render={({ field }) => (
          <FormItem className="col-span-1">
            <FormControl>
              <Input placeholder="Postal Code" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
