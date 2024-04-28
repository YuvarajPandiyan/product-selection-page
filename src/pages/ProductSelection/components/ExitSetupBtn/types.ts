type ExitSetupBtnProps = {
  handleOnClick: () => void;
};

type exitSetupBtnWrapperType = (
  handleOnClick: () => void,
  key: number
) => JSX.Element;

export type { ExitSetupBtnProps, exitSetupBtnWrapperType };
