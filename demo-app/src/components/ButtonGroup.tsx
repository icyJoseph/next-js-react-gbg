import { ComponentPropsWithoutRef } from "react";

type AllowedGroupElement = keyof Pick<
  JSX.IntrinsicElements,
  "nav" | "div" | "section"
>;
type ButtonGroupProps<T extends AllowedGroupElement> = { gap?: string; as?: T };

export const ButtonGroup = <T extends AllowedGroupElement>({
  as: renderAs,
  gap,
  style,
  ...rest
}: ComponentPropsWithoutRef<T> & ButtonGroupProps<T>) => {
  const mergedStyle = { ...style, "--gap": gap || "0.5rem" };

  const Tag = renderAs || "div";

  return <Tag {...rest} style={mergedStyle} />;
};
