import { memo } from "react";
import { ItemComponentProps } from "./types";

const ItemComponent: React.FC<ItemComponentProps> = memo(
  ({ label, icon, isItemAlreadySelected }) => {
    return (
      <div className="flex items-center w-full">
        <div className="flex items-center min-w-44">
          {icon && (
            <img
              src={`assets/icons/${icon}.svg`}
              alt={`icon ${icon}`}
              className="max-h-5 min-h-5 m-1"
            />
          )}
          <span className="">{label}</span>
        </div>
        {isItemAlreadySelected && (
          <div className="flex justify-end w-full">
            <img
              src={"assets/icons/tick.svg"}
              alt="tick icon"
              className="max-h-3 m-1"
            />
          </div>
        )}
      </div>
    );
  }
);

export { ItemComponent };
