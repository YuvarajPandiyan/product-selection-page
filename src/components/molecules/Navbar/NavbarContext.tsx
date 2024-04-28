import { createContext } from "react";
import { navbarState } from "./types";

const NavbarContext = createContext<
  never[] | [navbarState, React.Dispatch<React.SetStateAction<navbarState>>]
>([]);

export { NavbarContext };
