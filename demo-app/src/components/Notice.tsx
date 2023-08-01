import { ComponentPropsWithoutRef } from "react";

import style from "design-system/notice.module.css";

export const Notice = (props: ComponentPropsWithoutRef<"div">) => (
  <div
    {...props}
    className={`${props.className || ""} ${style.notice}`.trim()}
  />
);
