import { useForm } from "react-hook-form";
import { Input } from "./input";

interface InputHookProps {
  name: string;
  placeholder?: string;
}

export const InputHook = ({ name, placeholder }: InputHookProps) => {
  const { register } = useForm();

  return (
    <div>
      {name}
      <Input {...register(name)} placeholder={placeholder} />
    </div>
  );
};
