import { memo } from "react";
import { ExitSetupBtnProps, exitSetupBtnWrapperType } from "./types";

const ExitSetupBtn: React.FC<ExitSetupBtnProps> = memo(({ handleOnClick }) => {
  return (
    <button
      className="underline underline-offset-4 text-gray-400"
      onClick={handleOnClick}
    >
      Exit Setup
    </button>
  );
});

const exitSetupBtnWrapper: exitSetupBtnWrapperType = (handleOnClick, key) => {
  return <ExitSetupBtn handleOnClick={handleOnClick} key={key} />;
};

export { exitSetupBtnWrapper };
