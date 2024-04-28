import { memo } from "react";

import { DefaultPrefixProps } from "./types";

const DefaultPrefix: React.FC<DefaultPrefixProps> = memo(
  ({ fill = "#b7b7b7" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      id="search"
    >
      <path
        fill={fill}
        fillRule="evenodd"
        d="M14.192 15.606a7 7 0 1 1 1.414-1.414l5.172 5.172a1 1 0 0 1-1.414 1.414l-5.172-5.172ZM15 10a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
);

export { DefaultPrefix };
