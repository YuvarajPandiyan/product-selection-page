import { MouseEventHandler } from "react";

type ButtonProps = {
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export type { ButtonProps };
