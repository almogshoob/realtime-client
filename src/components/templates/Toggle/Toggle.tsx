import "./Toggle.css";

/*
Costumization:
use className prop with the next variables:
	--toggle-width
   	--toggle-transition-delay
   	--toggle-bg-color
   	--toggle-fg-color
   	--toggle-check-color
*/

type Props = {
  isOn: boolean;
  onToggle: () => void;
  id: string;
  className: string;
};

export function Toggle({ isOn, onToggle, id, className = "" }: Props) {
  return (
    <div className={`t-toggle ${className}`}>
      <input type="checkbox" id={id} checked={isOn} onChange={onToggle} />
      <label htmlFor={id} />
    </div>
  );
}
