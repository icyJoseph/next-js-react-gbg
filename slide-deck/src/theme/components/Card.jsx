import React from "react";
import { Block } from "@mdxp/components";

const Card = ({ children, sx = {}, ...props }) => (
  <Block
    sx={{
      p: 2,
      boxShadow: "0 9px 18px rgba(0,0,0,0.30), 0 7px 6px rgba(0,0,0,0.22)",
      width: "100%",
      "& > *": { m: 0, p: 0 },
      ...sx,
    }}
    {...props}
  >
    {children}
  </Block>
);

export default Card;
