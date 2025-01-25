import { forwardRef } from "react";
import "./TextField.css";

type Props = React.ComponentPropsWithoutRef<"input"> & {
  name: string;
  label?: string;
  leadingChar?: string;
};

export const TextField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { name, label, leadingChar, ...inputProps } = props;

  return (
    <div
      className="t-textfield"
      {...(leadingChar ? { "leading-char": leadingChar } : {})}
    >
      {label && <label htmlFor={name}>{label}</label>}
      <input type="text" id={name} ref={ref} {...inputProps} />
    </div>
  );
});
