import cx from "classnames";
import React, { memo } from "react";
import { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = memo(
  ({ children, onClick, className, disabled }) => {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={cx(
          "w-full py-1 text-white font-semibold rounded-md bg-blue-500 hover:bg-blue-400 disabled:bg-gray-400",
          className
        )}
      >
        {children}
      </button>
    );
  }
);

export { Button };
