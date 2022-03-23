/** @jsx jsx */
import "./index.css";

import { jsx } from "theme-ui";
import { Fragment } from "react";
import ReactDOM from "react-dom";
import Deck from "@mdxp/core";
import * as components from "@mdxp/components";

import Prism from "@theme-ui/prism";

import theme from "./theme/theme.js";
import themeComponents from "./theme/theme-components.js";

import MDXPresentation from "./presentation.mdx";

ReactDOM.render(
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
  </Deck>,

  document.getElementById("root")
);
