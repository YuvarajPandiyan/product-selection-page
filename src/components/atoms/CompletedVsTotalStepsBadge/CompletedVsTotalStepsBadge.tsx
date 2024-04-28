import React, { memo } from "react";

import cx from "classnames";

type CompletedVsTotalStepsBadgeProps = {
  completed: number;
  className?: string;
  totalNumberOfSteps: number;
};

const CompletedVsTotalStepsBadge: React.FC<CompletedVsTotalStepsBadgeProps> =
  memo(({ completed = 1, totalNumberOfSteps, className }) => {
    return (
      <div
        className={cx(
          "max-w-16 text-base font-semibold text-white me-2 px-2.5 py-0.5 rounded bg-gradient-to-r from-blue-500 to-pink-500",
          className
        )}
      >
        {completed} of {totalNumberOfSteps}{" "}
      </div>
    );
  });

export { CompletedVsTotalStepsBadge };
