import * as React from "react";

function classes(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

function Button({ className, type = "button", ...props }: React.ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={classes(
        "inline-flex h-9 items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/85 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Button };
