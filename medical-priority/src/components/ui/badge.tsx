import * as React from "react";

function classes(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={classes(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
