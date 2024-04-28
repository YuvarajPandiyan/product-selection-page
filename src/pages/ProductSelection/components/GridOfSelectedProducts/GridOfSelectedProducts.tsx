import React, { memo, useCallback, useContext, useMemo } from "react";
import cx from "classnames";

import { arrayRange } from "../../../../helpers/array";
import { SelectItemCard } from "../../../../components/molecules/SelectItemCard";

import { ProductSelectionContext } from "../../ProductSelectionContext";

import { GridOfSelectedProductsProps, indexVsKeyType } from "./types";

const GridOfSelectedProducts: React.FC<GridOfSelectedProductsProps> = memo(
  ({ noRows = 2, noColumns = 2 }) => {
    const [{ searchElemRef, selectedItems }, setState] = useContext(
      ProductSelectionContext
    );

    const numOfCard = arrayRange(noRows * noColumns);

    const indexVsKey: indexVsKeyType = useMemo(() => {
      return selectedItems?.reduce((acc: {}, item) => {
        if (!item.index) {
          console.error("item.index is undefined");
        }
        return { ...acc, [item.index || 0]: item };
      }, {});
    }, [selectedItems]);

    const setClickedCardIndex = useCallback(
      (clickedCardIndex: number) => {
        setState((prevState) => ({ ...prevState, clickedCardIndex }));
      },
      [setState]
    );

    const handleRemoveSelectedProduct = (idx: number) => {
      setState((prevState) => {
        const { selectedItems } = prevState;
        const filteredSelectedItems = selectedItems.filter(
          (item) => item.index !== idx
        );
        return {
          ...prevState,
          selectedItems: filteredSelectedItems,
          selectedItemsByKey: filteredSelectedItems.reduce((acc, item) => {
            return { ...acc, [item?.value]: item.value };
          }, {}),
        };
      });
    };

    return (
      <div className="w-25">
        <div
          className={cx("gap-8 grid auto-rows-min", `grid-cols-${noColumns}`)}
        >
          {numOfCard.map((row) => {
            const item = indexVsKey[row];
            return (
              <SelectItemCard
                key={row}
                idx={row}
                item={item}
                searchElemRef={searchElemRef}
                setClickedCardIndex={setClickedCardIndex}
                handleRemoveSelectedProduct={handleRemoveSelectedProduct}
              />
            );
          })}
        </div>
        <div className="pt-8 text-sm text-gray-400">
          {selectedItems.length} Product added
        </div>
      </div>
    );
  }
);

export { GridOfSelectedProducts };
