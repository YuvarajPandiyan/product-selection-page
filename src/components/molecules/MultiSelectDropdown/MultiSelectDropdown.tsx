import React, { memo, useCallback, useEffect, useRef } from "react";
import cx from "classnames";

import { useCombobox, useMultipleSelection } from "downshift";

import { items, option, SelectDropdownProps } from "./types";
import { DefaultPrefix } from "./DefaultPrefix";
import { ItemComponent } from "./ItemComponent";

import {
  findCorrectIndexForSelectCard,
  getFilteredBooks,
  getKeyValue,
} from "./helper";

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  id,
  label,
  items,
  setState,
  placeholder,
  type = "text",
  width = "",
  required = false,
  prefix = <DefaultPrefix />,
  selectedItems,
  searchInputValue,
  clickedCardIndex,
  selectedItemsByKey,
}) => {
  const searchElemRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setState((prevState) => {
      return {
        ...prevState,
        searchElemRef,
      };
    });
  }, [setState, searchElemRef]);

  const handleOnSearchInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState((prevValue) => {
        return { ...prevValue, searchInputValue: event.target.value };
      });
    },
    [setState]
  );

  const filteredItems = React.useMemo(() => {
    return getFilteredBooks(items, searchInputValue);
  }, [items, searchInputValue]);

  const {
    isOpen,
    getMenuProps,
    getItemProps,
    getInputProps,
    highlightedIndex,
  } = useCombobox({
    items: filteredItems,
    itemToString(item) {
      return item ? item?.label : "";
    },
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    selectedItem: null,
    inputValue: searchInputValue,
    stateReducer(state, actionAndChanges) {
      const { changes, type } = actionAndChanges;

      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            highlightedIndex: 0, // with the first option highlighted.
          };
        default:
          return changes;
      }
    },
    onStateChange({
      inputValue: newInputValue,
      type,
      selectedItem: newSelectedItem,
    }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (
            newSelectedItem &&
            !getKeyValue(selectedItemsByKey)(newSelectedItem.value)
          ) {
            console.log(
              getKeyValue(selectedItemsByKey)(newSelectedItem?.value),
              { selectedItemsByKey, newSelectedItem }
            );
            setState((prevValue) => {
              const updatedSelectedItems: items = [
                ...(selectedItems || []),
                {
                  ...newSelectedItem,
                  index:
                    clickedCardIndex ||
                    findCorrectIndexForSelectCard({ selectedItems }),
                },
              ];
              return {
                ...prevValue,
                searchInputValue: "",
                clickedCardIndex: undefined,
                selectedItems: updatedSelectedItems,
                selectedItemsByKey: updatedSelectedItems.reduce((acc, item) => {
                  return { ...acc, [item?.value]: item.value };
                }, {}),
              };
            });
          } else if (newSelectedItem) {
            setState((prevValue) => {
              const updatedSelectedItems: items = selectedItems.filter(
                (item: option) => item.value !== newSelectedItem.value
              );
              return {
                ...prevValue,
                searchInputValue: "",
                clickedCardIndex: undefined,
                selectedItems: updatedSelectedItems,
                selectedItemsByKey: updatedSelectedItems.reduce((acc, item) => {
                  return { ...acc, [item?.value]: item.value };
                }, {}),
              };
            });
          }
          break;

        case useCombobox.stateChangeTypes.InputChange:
          setState((prevValue) => {
            return { ...prevValue, searchInputValue: newInputValue };
          });
          break;
        default:
          break;
      }
    },
  });

  const { getDropdownProps } = useMultipleSelection({
    selectedItems,
    onStateChange({ selectedItems: newSelectedItems = [], type }) {
      switch (type) {
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
        case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
          setState((prevValue) => {
            return {
              ...prevValue,
              searchInputValue: "",
              selectedItems: newSelectedItems,
            };
          });
          break;
        default:
          break;
      }
    },
  });

  return (
    <div className={cx("w-inherit", { [width]: width })}>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <div className="relative mb-3">
        {prefix && (
          <span className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          type={type}
          required={required}
          placeholder={placeholder}
          onChange={handleOnSearchInputChange}
          {...getInputProps(
            getDropdownProps({ preventKeyAction: isOpen, ref: searchElemRef })
          )}
          className="ease-in-out duration-75 bg-gray-200 focus:bg-white border-gray-300 text-gray-900 text-sm focus:outline focus:outline-blue-400 block w-full p-2 rounded-lg ps-12"
        />
      </div>

      <div
        className={cx(
          "absolute overflow-y-scroll max-h:[2rem] z-10 bg-white rounded-lg w-inherit drop-shadow-md border-[0.1px] border-gray-500/20",
          {
            hidden: !isOpen, // comment here for always open the dropdown (while debugging)
            [width]: width,
          }
        )}
      >
        <ul className="text-sm py-2 " {...getMenuProps()}>
          {filteredItems.map((item, index) => {
            const isItemAlreadySelected = !!getKeyValue(selectedItemsByKey)(
              item.value
            );
            return (
              <li
                className="py-2 px-2 transition ease-in-out delay-150"
                key={`${item.value}${index}`}
                {...getItemProps({ item, index })}
              >
                <div
                  className={cx(
                    "flex items-center min-h-8 mx-1 px-4 rounded-lg hover:bg-blue-500 dark:hover:text-white",
                    {
                      "bg-blue-500 text-white":
                        isItemAlreadySelected || highlightedIndex === index,
                    }
                  )}
                >
                  <ItemComponent
                    label={item.label}
                    icon={item.icon}
                    isItemAlreadySelected={isItemAlreadySelected}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default memo(SelectDropdown);
