import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-[color,background-color,border-color,transform,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_18px_34px_-20px_rgba(105,74,43,0.42)] hover:-translate-y-0.5 hover:shadow-[0_24px_40px_-22px_rgba(105,74,43,0.48)] dark:shadow-none",
        destructive: "bg-destructive text-destructive-foreground",
        outline:
          "border border-input bg-background/75 backdrop-blur-sm hover:bg-background dark:bg-background",
        secondary:
          "bg-secondary/85 text-secondary-foreground hover:bg-secondary dark:bg-secondary",
        ghost: "",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  children?: ReactNode;
}
const addClassNameRecursively = (
  children: ReactNode,
  className: string,
): ReactNode => {
  const foo = (child: ReactNode) => {
    if (!isValidElement(child)) return child;
    const element = child as React.ReactElement<{
      className?: string;
      children?: ReactNode;
    }>;
    return cloneElement(element, {
      className: `${element.props.className || ""} ${className}`.trim(),
      children: addClassNameRecursively(element.props.children, className),
    });
  };
  return Children.map(children, foo);
};
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          "cursor-can-hover",
        )}
        ref={ref}
        {...props}
      >
        {addClassNameRecursively(children, "pointer-events-none")}
      </Comp>
    );
  },
);
Button.displayName = "Button";
export { Button, buttonVariants };
