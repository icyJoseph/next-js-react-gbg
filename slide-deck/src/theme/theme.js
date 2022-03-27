import syntaxTheme from "@theme-ui/prism/presets/oceanic-next.json";

export default {
  googleFont:
    "https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Roboto:ital,wght@0,300;0,400;0,500;1,400&display=swap",

  /* Style Definitions */
  fonts: {
    body: "Roboto, sans-serif",
    mono: '"Roboto Mono", monospace',
  },

  fontSizes: {
    xxsmall: "1rem", // 16px
    xsmall: "1.25rem", // 20px
    small: "1.5rem", // 24px
    base: "1.75rem", // 28px
    large: "2.25rem", // 36px
    xlarge: "2.75rem", // 44px
    xxlarge: "4rem", // 64px
    xxxlarge: "6rem", // 96px
  },

  fontWeights: {
    default: "400",
    light: "300",
    strong: "500",
  },

  lineHeights: {
    default: "150%",
    mono: "160%",
    title: "140%",
    small: "100%",
  },

  space: [0, 10, 25, 50, 75, 100, 150, 250],

  colors: {
    MDXPYellow: "#FFAC00",
    MDXPOrange: "#F26419",
    MDXPCharcoal: "#2F4858",
    MDXPBlue: "#33658A",
    MDXPLightBlue: "#86BBD8",

    MDXPGray0: "#2E2E2E",
    MDXPGray1: "#333333",
    MDXPGray2: "#4F4F4F",
    MDXPGray3: "#828282",
    MDXPGray4: "#BDBDBD",
    MDXPGray5: "#E0E0E0",
    MDXPGray6: "#F2F2F2",

    AFRYXElement: "#F3FFAF",
    AFRYXBackground: "#323232",

    // Necessary Theme-UI definitions (It's probably better to use predefined color variables)
    text: "#333333",
    background: "#F2F2F2",
    primary: "#FFAC00",
    secondary: "#F26419",
    accent: "#33658A",
    highlight: "#FFAC00",
    muted: "#828282",
  },

  breakpoints: ["0px", "1280px", "1680px", "2560px"],

  /* Style Variants */
  text: {
    main: {
      fontFamily: "body",
      lineHeight: "default",
      fontSize: ["xsmall", "small", "base", "xlarge"],
    },

    mono: {
      fontFamily: "mono",
      lineHeight: "mono",
      fontSize: ["1rem", "1rem", "1.1rem", "1.75rem"],
    },

    title: {
      fontFamily: "body",
      lineHeight: "title",
      textTransform: "uppercase",
      fontWeight: "default",
      fontSize: ["xlarge", "xlarge", "xxlarge", "xxxlarge"],
    },

    subtitle: {
      fontFamily: "body",
      lineHeight: "title",
      fontWeight: "light",
      textTransform: "lowercase",
      fontVariant: "small-caps",
      fontSize: ["base", "large", "xxlarge", "xxxlarge"],
    },
  },

  gradient: {
    light: {
      background: (t) =>
        `radial-gradient(100% 100% at 50% 0%, ${t.colors.MDXPGray6} 0%, ${t.colors.MDXPGray4} 100%)`,
    },
    dark: {
      background: (t) =>
        `radial-gradient(100% 100% at 50% 0%, ${t.colors.MDXPGray2} 0%, ${t.colors.MDXPGray1} 100%)`,
    },
    yellow: {
      background: (t) =>
        `linear-gradient(270deg, ${t.colors.MDXPYellow} 0%, ${t.colors.MDXPOrange} 250%)`,
    },
  },

  /* Style Applications */
  styles: {
    root: {
      bg: "AFRYXBackground",
    },

    pre: {
      variant: "text.mono",
      overFlow: "auto",
    },

    p: {
      my: [1, 2, 3],
    },

    h1: {
      variant: "text.title",
    },

    h2: {
      variant: "text.subtitle",
    },

    strong: {
      fontWeight: "strong",
      color: "MDXPGray0",
      fontSize: "1em",
    },

    blockquote: {
      background: "#e0e0e0",
      borderLeft: "10px solid #ccc",
      minWidth: "45ch",
      margin: "24px auto",
      padding: "16px",
      boxShadow: "0 9px 18px rgba(0,0,0,0.30), 0 7px 6px rgba(0,0,0,0.22)",

      "& p": {
        margin: 0,
      },
    },

    code: syntaxTheme,
  },

  mdxp: {
    slide: {
      variant: "text.main",
    },
  },
};
