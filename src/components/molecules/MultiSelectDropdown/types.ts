import { stateValueType } from "../../../pages/ProductSelection/types";

type option = { label: string; value: string; icon?: string; index?: number };
type items = option[];

type SelectDropdownProps = {
  id: string;
  type?: string;
  items: items;
  label?: string;
  width?: string;
  required?: boolean;
  placeholder?: string;
  selectedItems: items;
  prefix?: React.ReactNode;
  clickedCardIndex?: number | undefined;
  searchInputValue: string | undefined;
  setState: React.Dispatch<React.SetStateAction<stateValueType>>; // TODO: find how to remove the stateValueType dependency
  selectedItemsByKey: { [key: string]: number }; // {itemValue: selectedItems arr index}
};

type DefaultPrefixProps = {
  fill?: string;
};

type ItemComponentProps = {
  label: string;
  icon?: string;
  isItemAlreadySelected: boolean;
};

export type {
  DefaultPrefixProps,
  SelectDropdownProps,
  items,
  option,
  ItemComponentProps,
};
