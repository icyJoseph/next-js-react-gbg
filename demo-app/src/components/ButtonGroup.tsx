import type { ComponentPropsWithoutRef } from "react";

import groupStyle from "design-system/button-group.module.css";

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
  const mergedStyle = { ...style, "--btn-gap": gap || "0.5rem" };
  const className = `${rest.className || ""} ${groupStyle.btnGroup}`;

  const Tag = renderAs || "div";

  return <Tag {...rest} className={className} style={mergedStyle} />;
};
