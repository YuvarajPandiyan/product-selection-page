import { memo, useContext } from "react";
import { NavbarProps } from "./types";
import { NavbarContext } from "./NavbarContext";

const Navbar: React.FC<NavbarProps> = memo(() => {
  const [{ navRightSection }] = useContext(NavbarContext);
  console.log({ navRightSection });
  return (
    <div className="flex h-20 mx-20">
      <div className="flex gap-2 justify-center items-center">
        <span className="text-3xl font-semibold">axiamatic</span>
      </div>
      <div className="w-full flex justify-end items-center">
        {navRightSection &&
          navRightSection.map(({ renderer }) => {
            return renderer;
          })}
      </div>
    </div>
  );
});

export { Navbar };
