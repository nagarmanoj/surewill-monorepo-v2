import { FormControl } from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type Props = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

export function PercentageSelect({ placeholder, value, onChange }: Props) {
  return (
    <Select onValueChange={onChange} defaultValue={value || undefined}>
      <FormControl>
        <SelectTrigger className="max-w-[220px] text-brand-gray">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="10">10%</SelectItem>
        <SelectItem value="20">20%</SelectItem>
        <SelectItem value="30">30%</SelectItem>
        <SelectItem value="40">40%</SelectItem>
        <SelectItem value="50">50%</SelectItem>
        <SelectItem value="60">60%</SelectItem>
        <SelectItem value="70">70%</SelectItem>
        <SelectItem value="80">80%</SelectItem>
        <SelectItem value="90">90%</SelectItem>
        <SelectItem value="100">100%</SelectItem>
      </SelectContent>
    </Select>
  );
}
