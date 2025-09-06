import { CSSProperties } from "react";
import "./CircleLoader.css";

type Props = {
  color?: string;
  fontSize?: string;
  center?: "absolute" | "inline";
  style?: CSSProperties;
};

export const CircleLoader = ({ color, fontSize, center, style }: Props) => {
  const wrapperStyle: CSSProperties = {
    ...(color && { color }),
    ...(fontSize && { fontSize }),
    ...(center === "absolute" && {
      position: "absolute",
      inset: 0,
      display: "grid",
      placeItems: "center",
    }),
    ...(center === "inline" && {
      marginInline: "auto",
      width: "fit-content", // TODO check if necessary
    }),
    ...style,
  };
  return (
    <div style={wrapperStyle}>
      <svg viewBox="0 0 100 100" width="1em" className="TCircleLoader">
        <circle
          cx="50"
          cy="50"
          r="40"
          strokeWidth="10"
          stroke="currentColor"
          fill="none"
        />
      </svg>
    </div>
  );
};
