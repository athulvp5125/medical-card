
import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="flex items-center border rounded-md px-3 bg-background">
        {icon && <div className="mr-2 text-muted-foreground">{icon}</div>}
        <Input
          className={cn("border-0 focus-visible:ring-0 focus-visible:ring-offset-0", className)}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

InputWithIcon.displayName = "InputWithIcon";

export { InputWithIcon };
