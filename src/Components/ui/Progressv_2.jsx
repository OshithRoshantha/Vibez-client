import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef(
  ({ className, value = 0, ...props }, ref) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(${value - 100}%)` }}
      />
    </ProgressPrimitive.Root>
  )
);

Progress.displayName = "Progress";

export { Progress };
