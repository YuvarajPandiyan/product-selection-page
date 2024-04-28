import { memo, useCallback, useContext } from "react";

import { ITEMS } from "../../../../constants/items";

import { Button } from "../../../../components/atoms/Button";
import { CompletedVsTotalStepsBadge } from "../../../../components/atoms/CompletedVsTotalStepsBadge";
import MultiSelectDropdown from "../../../../components/molecules/MultiSelectDropdown";

import { ProductSelectionContext } from "../../ProductSelectionContext";
import { MULTI_SELECT_ID, TOTAL_NUMBER_OF_STEPS } from "./contents";
import { submitSelectedProduct } from "../../services";
import { INITIAL_STATE } from "../../contents";

const ProductSelectSection = memo(() => {
  const [
    { searchInputValue, selectedItems, selectedItemsByKey, clickedCardIndex },
    setState,
  ] = useContext(ProductSelectionContext);

  const handleOnclickNext = useCallback(async () => {
    try {
      alert("Please check the network tab for api call");
      const response = await submitSelectedProduct(selectedItems);
      console.log({ response });
    } catch (error) {
      console.warn(error);
    } finally {
      // resetting the state
      setState(({ searchElemRef }) => ({ ...INITIAL_STATE, searchElemRef }));
    }
  }, [setState, selectedItems]);

  return (
    <div className="w-25 mt-24">
      <div className="text-start pb-8">
        <CompletedVsTotalStepsBadge
          completed={1}
          className="mb-6"
          totalNumberOfSteps={TOTAL_NUMBER_OF_STEPS}
        />
        <div className="text-3xl font-medium pb-4">
          Let's add your internal tools
        </div>
        <div>
          Search to quickly add products your team uses today. You'll be able to
          add as many as you need later but for now let's add four.
        </div>
      </div>
      <MultiSelectDropdown
        id={MULTI_SELECT_ID}
        items={ITEMS}
        setState={setState}
        selectedItems={selectedItems}
        clickedCardIndex={clickedCardIndex}
        searchInputValue={searchInputValue}
        selectedItemsByKey={selectedItemsByKey}
        placeholder="Search for any software..."
      />
      <Button
        className="mt-4"
        onClick={handleOnclickNext}
        disabled={selectedItems.length === 0}
      >
        Next
      </Button>
    </div>
  );
});

export { ProductSelectSection };
