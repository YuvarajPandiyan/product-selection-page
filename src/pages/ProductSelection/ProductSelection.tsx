import { memo, useCallback, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import { NavbarContext } from "../../components/molecules/Navbar/NavbarContext";

import { ProductSelectSection } from "./components/ProductSelectSection";
import { GridOfSelectedProducts } from "./components/GridOfSelectedProducts";

import { INITIAL_STATE } from "./contents";
import { stateValueType } from "./types";
import { ProductSelectionContext } from "./ProductSelectionContext";
import { productSelectionPageNavActions } from "./generator";

const ProductSelection = memo(() => {
  const [state, setState] = useState<stateValueType>(INITIAL_STATE);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setNavbarState] = useContext(NavbarContext);

  const handleOnClick = useCallback(() => {
    setState(({ searchElemRef }) => {
      return { ...INITIAL_STATE, searchElemRef };
    });
  }, [setState]);

  useEffect(() => {
    setNavbarState((prevState) => {
      return {
        ...prevState,
        navRightSection: productSelectionPageNavActions(handleOnClick),
      };
    });

    // clearing out the nav state on unmounting of the comp
    return () => {
      setNavbarState((prevState) => {
        return { ...prevState, navRightSection: undefined };
      });
    };
  }, [handleOnClick, setNavbarState]);

  return (
    <>
      <Helmet>
        <title>axima | Product select page</title>
      </Helmet>
      <ProductSelectionContext.Provider value={[state, setState]}>
        <div className="flex justify-center items-center w-full h-[90vh]">
          <div className="flex gap-4 xl:gap-64 flex-col xl:flex-row">
            <GridOfSelectedProducts />
            <ProductSelectSection />
          </div>
        </div>
      </ProductSelectionContext.Provider>
    </>
  );
});

export { ProductSelection };
