import { cn } from "@/lib/utils";
import React from "react";
import { InputProps } from "./input";

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;

interface InputWithIconProps extends InputProps {
  icon: React.ReactNode,
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2",
          className,
        )}
      >
        {icon}
        <input
          {...props}
          ref={ref}
          className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    );
  },
);

InputWithIcon.displayName = "Search";

export { InputWithIcon };