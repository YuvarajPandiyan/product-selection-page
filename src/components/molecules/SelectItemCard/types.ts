import { MutableRefObject } from "react";
import { option } from "../MultiSelectDropdown/types";

type SelectItemCardProps = {
  idx?: number;
  item: option | undefined;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  setClickedCardIndex?: (clickedCardIndex: number) => void;
  searchElemRef: MutableRefObject<HTMLInputElement | null> | null;
  handleRemoveSelectedProduct?: (idx: number) => void | undefined;
};

export type { SelectItemCardProps };
