/** @jsx jsx */
import "./index.css";

import { jsx } from "theme-ui";
import { Fragment } from "react";
import ReactDOM from "react-dom";
import Deck, { Zoom } from "@mdxp/core";
import * as components from "@mdxp/components";

import Prism from "@theme-ui/prism";

import theme from "./theme/theme.js";
import themeComponents from "./theme/theme-components.js";
import MDXPresentation from "./presentation.mdx";

ReactDOM.render(
  <Zoom
    maxWidth={1280}
    width={1280}
    aspectRatio={16 / 9}
    sx={{ maxWidth: "100vw", maxHeight: "100vh" }}
  >
    <Deck
      components={{
        ...components,
        ...themeComponents,
        code: Prism,
        pre: ({ children }) => <Fragment>{children}</Fragment>,
      }}
      Layout={themeComponents.MDXPHeaderLayout}
      layoutOptions={{ showSlideNum: true }}
      theme={theme}
      keyboardTarget={window}
    >
      <MDXPresentation />
    </Deck>
  </Zoom>,
  document.getElementById("root")
);
