import { useField } from "formik";
import { Input, InputProps } from "../Inputs/input";

interface FormikInputProps extends InputProps {
  name: string;
}

export const FormikInput = ({ name, ...otherProps }: FormikInputProps) => {
  const [state, meta, helper] = useField(name);
  return (
    <div>
      <Input {...state} {...otherProps} />
      {meta?.error && <p className="text-sm text-error">{meta?.error}</p>}
    </div>
  );
};
