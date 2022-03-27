/** @jsx jsx */
import { jsx } from "theme-ui";
import { MDXPTypes, setMDXPType, useDeck } from "@mdxp/core";
import { HeaderLayout, Place } from "@mdxp/components";

// We set the footer with Place instead of the Footer argument of the HeaderLayout
// This is because we want content to be able to have content until the bottom of the page
// Our footer is in this case just "Floating" above
const MDXPHeaderLayout = ({ children, showSlideNum = true, sx = {} }) => {
  const { slideIndex } = useDeck();

  return (
    <HeaderLayout
      sxHeader={{
        bg: "AFRYXBackground",
        color: "MDXPGray6",
        width: "100%",
        textAlign: "center",
        padding: "0",
        lineHeight: "160%",

        "& code": {
          fontVariant: "none",
        },
        "& a": {
          color: "MDXPGray6",
        },
      }}
      sx={{
        justifyContent: "unset",
        pt: [2, 3, 4],
        "& p": { maxWidth: "45ch", textAlign: "left", mt: 0 },
        "& h3": { mt: 0 },
        "& ul": { mt: 0 },
        "& img": { maxWidth: "58.333%" },
        "& li": { pb: 1 },
        "& li li": { pb: 0 },
        ...sx,
      }}
    >
      {children}
      <Place bottom="0" sx={{ width: "100%", zIndex: 1 }}>
        {showSlideNum && (
          <div
            sx={{
              variant: "text.subtitle",
              fontSize: ["large", "small", "large", "large"],
              float: "right",
              lineHeight: "100%",
              mr: 2,
              mb: 1,
            }}
          >
            {slideIndex + 1}
          </div>
        )}
      </Place>
    </HeaderLayout>
  );
};

export default setMDXPType(MDXPHeaderLayout, MDXPTypes.LAYOUT);
