import { MutableRefObject } from "react";
import { option } from "../../components/molecules/MultiSelectDropdown/types";

type stateValueType = {
  clickedCardIndex?: number | undefined;
  selectedItems: option[];
  searchInputValue: string | undefined;
  selectedItemsByKey: { [key: string]: number }; // {itemValue: selectedItems arr index}
  searchElemRef: MutableRefObject<HTMLInputElement | null> | null;
};

type productSelectionPageNavActionsType = (handleOnClick: () => void) => {
  renderer: JSX.Element;
}[];

export type { stateValueType, productSelectionPageNavActionsType };
