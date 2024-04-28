import { createContext } from "react";
import { stateValueType } from "./types";

const ProductSelectionContext = createContext<
  | never[]
  | [stateValueType, React.Dispatch<React.SetStateAction<stateValueType>>]
>([]);

export { ProductSelectionContext };
