import { items, items as itemsType, option } from "./types";

const getFilteredBooks = (
  items: itemsType,
  searchInputValue: string | undefined
) => {
  const lowerCasedInputValue = searchInputValue?.toLowerCase() || "";
  return items.filter((item: option) => {
    return item.label.toLowerCase().includes(lowerCasedInputValue);
  });
};

const getKeyValue =
  <T extends object, U extends keyof T>(obj: T) =>
  (key: U) =>
    obj[key];

const findCorrectIndexForSelectCard = ({
  selectedItems,
}: {
  selectedItems: items;
}) => {
  let maxIndexAlreadySelected = 0;
  const idxVsItem: { [key: number]: option } = selectedItems.reduce(
    (acc, item) => {
      if (maxIndexAlreadySelected < (item.index || 0)) {
        maxIndexAlreadySelected = item.index || 0;
      }
      return { ...acc, [item.index || 0]: item };
    },
    {}
  );

  const arr = [];

  for (let i = 0; i <= maxIndexAlreadySelected; i++) {
    if (!idxVsItem[i]) {
      arr.push(i);
    }
  }

  return arr[0] >= 0 ? arr[0] : selectedItems.length;
};

export { getKeyValue, getFilteredBooks, findCorrectIndexForSelectCard };
