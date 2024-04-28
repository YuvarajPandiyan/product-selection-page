import cx from "classnames";
import React, { memo, useCallback } from "react";

import { SelectItemCardProps } from "./types";

const SelectItemCard: React.FC<SelectItemCardProps> = memo(
  ({
    idx,
    item,
    onClick,
    searchElemRef,
    setClickedCardIndex,
    handleRemoveSelectedProduct,
  }) => {
    const isItemPresent = !!item;
    const handleCardOnClick: React.MouseEventHandler<HTMLDivElement> =
      useCallback(
        (e) => {
          if (isItemPresent) {
            return;
          }
          searchElemRef?.current?.click(); // to open the dropdown
          searchElemRef?.current?.focus(); // to point cursor on input cell
          if (onClick) {
            onClick(e);
          }
          if (setClickedCardIndex && idx) {
            setClickedCardIndex(idx);
          }
        },
        [idx, onClick, isItemPresent, searchElemRef, setClickedCardIndex]
      );

    const handleRemoveOnClick: React.MouseEventHandler<HTMLButtonElement> =
      useCallback(
        (e) => {
          // scoping event only for the remove btn
          e.stopPropagation();
          e.preventDefault();

          if (handleRemoveSelectedProduct && typeof idx === "number") {
            handleRemoveSelectedProduct(idx);
          }
        },
        [handleRemoveSelectedProduct, idx]
      );

    return (
      <div
        onClick={handleCardOnClick}
        className={cx(
          "rounded-lg shadow-md min-h-48 max-w-48 border-[0.1px] border-gray-500/20 flex items-center justify-center",
          {
            "hover:cursor-pointer": !isItemPresent,
          }
        )}
      >
        {!isItemPresent && (
          <div className="rounded-lg h-14 w-[3.5rem] border-[0.1px] border-gray-500/20 bg-gray-100 flex items-center justify-center">
            <img src="assets/icons/plus.svg" alt="plus icon" className="h-5" />
          </div>
        )}

        {isItemPresent && (
          <div className="flex justify-center items-center">
            <span>
              <div className="pb-10 flex flex-col justify-center items-center flex-">
                <img
                  src={`assets/icons/${item.icon}.svg`}
                  alt={`${item.icon} icon`}
                  className="h-12"
                />
                <div className="pt-2 font-semibold">{item.label}</div>
              </div>
              <button
                className="font-thin text-xs text-gray-400 flex hover:shadow-sm"
                onClick={handleRemoveOnClick}
              >
                <img
                  src={"assets/icons/cross.svg"}
                  alt={"cross icon"}
                  className="h-4 pr-1"
                />
                Remove
              </button>
            </span>
          </div>
        )}
      </div>
    );
  }
);

export { SelectItemCard };
