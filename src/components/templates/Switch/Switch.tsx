import { forwardRef, Fragment } from "react";
import "./Switch.css";

type Option = { value: string; label: string };

type SwitchProps = {
  name: string; // for form
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export const Switch = forwardRef<HTMLFormElement, SwitchProps>((props, ref) => {
  const { options, name, value, onChange, className = "" } = props;

  const formProps = onChange ? {} : { ref: ref };
  const inputProps = (option: Option) =>
    onChange
      ? {
          checked: value === option.value,
          onChange: () => onChange(option.value),
        }
      : {};

  return (
    <form {...formProps} className={`t-switch ${className}`}>
      {options.map((option, i) => {
        const id = `${name}-${i}`;
        return (
          <Fragment key={option.value}>
            <input
              type="radio"
              id={id}
              name={name}
              value={option.value}
              {...inputProps(option)}
            />
            <label htmlFor={id}>{option.label}</label>
          </Fragment>
        );
      })}
    </form>
  );
});
