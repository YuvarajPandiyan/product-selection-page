import { exitSetupBtnWrapper } from "./components/ExitSetupBtn";
import { productSelectionPageNavActionsType } from "./types";

export const productSelectionPageNavActions: productSelectionPageNavActionsType =
  (handleOnClick) => [
    {
      renderer: exitSetupBtnWrapper(handleOnClick, 0),
    },
  ];
