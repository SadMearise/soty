import { ComponentType, PropsWithChildren } from "react";

type WithButtonStylesProps = {
  variant: string;
  width?: string;
};

const baseStyles: string[] = [
  "inline-block",
  "cursor-pointer",
  "text-center",
  "align-middle",
  "select-none",
  "no-underline",
  "whitespace-nowrap",
];

const variantStyles: Record<string, string> = {
  "default-white": "text-base font-semibold px-8 py-2 bg-white text-black rounded-full hover:scale-[1.04]",
  "big-white":
    "text-base font-bold border border-solid border-grey-50 px-8 py-3 bg-white text-black rounded-full hover:scale-[1.04]",
  "default-green": "text-base font-semibold px-8 py-2 bg-green text-black rounded-full hover:scale-[1.04]",
  link: "text-sm font-semibold px-8 bg-transparent text-white hover:underline",
};

const widthStyles: Record<string, string> = {
  "fit-content": "w-fit",
  full: "w-full",
};

const withButtonStyles = <P extends object>(Button: ComponentType<P>) => {
  return ({ children, variant, width = "fit-content", ...props }: PropsWithChildren<WithButtonStylesProps> & P) => {
    const styles = [...baseStyles, variantStyles[variant], widthStyles[width]];

    return (
      <Button
        {...(props as P)}
        styles={styles.join(" ")}
      >
        {children}
      </Button>
    );
  };
};

export default withButtonStyles;
// TEXT BUTTONS

// 7 31 bg-transparent color-white border-1px-solid-grey hover: scale border-white
// link hover: underline

// 8 bg-transparent color-grey hover: color-white scale
// 8 32 bg-transparent color-grey hover: color-white scale

// 3 15 3 32 bg-transparent border-1px-solid-grey color-white icon hover: scale border-white

// 12 32
