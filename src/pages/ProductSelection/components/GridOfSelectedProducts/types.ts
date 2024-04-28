import { option } from "../../../../components/molecules/MultiSelectDropdown/types";

type GridOfSelectedProductsProps = {
  noRows?: number;
  noColumns?: number;
};

type indexVsKeyType = { [key: number]: option };

export type { GridOfSelectedProductsProps, indexVsKeyType };
