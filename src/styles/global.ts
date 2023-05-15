import { globalCss } from "@stitches/react";
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    fontFamily: roboto.style.fontFamily,
  },

  button: {
    all: "unset",
    cursor: "pointer",
  },
});
