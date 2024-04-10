import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type Props = {
  onChange: (value: string) => void;
  value: string | undefined;
};

export function PetType({ onChange, value }: Props) {
  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className="h-[44px] text-brand-gray">
        <SelectValue placeholder="Type of pet" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="dog">Dog</SelectItem>
        <SelectItem value="cat">Cat</SelectItem>
        <SelectItem value="fish">Fish</SelectItem>
        <SelectItem value="bird">Bird</SelectItem>
        <SelectItem value="small mammal">Small Mammal</SelectItem>
        <SelectItem value="reptile">Reptile</SelectItem>
        <SelectItem value="other">Other</SelectItem>
      </SelectContent>
    </Select>
  );
}
