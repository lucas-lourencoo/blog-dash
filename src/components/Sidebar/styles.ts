import { keyframes, styled } from "@stitches/react";

const goDown = keyframes({
  from: {
    transform: "translateY(-1rem)",
  },
  to: {
    transform: "translateY(0)",
  },
});

export const Container = styled("main", {
  flex: "1",
  minHeight: "100vh",
  backgroundColor: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem 1.5rem",
  color: "rgba(37, 37, 37, 0.8)",

  ul: {
    listStyle: "none",
    flex: 1,
    width: "100%",
    marginTop: "1rem",
  },

  ".submenu": {
    marginTop: "0",
    display: "none",
    animation: `${goDown} .5s forwards`,

    a: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      color: "inherit",
      width: "100%",
      padding: "1rem 1.5rem",
      fontSize: "1rem",
    },
  },
});

export const LinkActivable = styled("a", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flex: "1",
  width: "100%",
  fontSize: "1rem",
  padding: "1rem",
  textDecoration: "none",
  color: "#252525",
  borderRadius: "8px",
  cursor: "pointer",

  ".leftSide": {
    display: "flex",
    alignItems: "center",
  },

  span: {
    marginLeft: "1rem",
    display: "inline-block",
  },

  "&:hover": {
    background: "rgba(38, 122, 220, 0.05)",
    color: "#267adc",

    "svg path": {
      fill: "#267adc",
    },
  },
});
