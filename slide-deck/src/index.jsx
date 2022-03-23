/** @jsx jsx */
import { jsx } from "theme-ui";
import { Fragment } from "react";
import ReactDOM from "react-dom";
import Deck from "@mdxp/core";
import * as components from "@mdxp/components";

import theme from "./theme/theme.js";
import themeComponents from "./theme/theme-components.js";

import "./index.css";
import MDXPresentation from "./presentation.mdx";

import { ThemeProvider } from "theme-ui";

import Prism from "@theme-ui/prism";

ReactDOM.render(
  <ThemeProvider
    components={{
      code: Prism,
      pre: ({ children }) => <Fragment>{children}</Fragment>,
    }}
  >
    <Deck
      components={{
        ...components,
        ...themeComponents,
      }}
      Layout={themeComponents.MDXPHeaderLayout}
      layoutOptions={{ showSlideNum: true }}
      theme={theme}
      keyboardTarget={window}
    >
      <MDXPresentation />
    </Deck>
  </ThemeProvider>,
  document.getElementById("root")
);
