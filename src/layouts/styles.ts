import { styled } from "@stitches/react";

export const Container = styled("main", {
  display: "grid",
  alignItems: "flex-start",
  justifyContent: "center",
  backgroundColor: "#f7f7f7",
  height: "100vh",
  gridTemplateColumns: "25fr 75fr",

  ".archivesList ul": {
    listStyle: "none !important",
  },

  form: {
    marginTop: "5rem",
  },

  ".inputsGrid": {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    rowGap: "1rem",
    columnGap: "2rem",
    position: "relative",

    "& + .inputsGrid": {
      marginTop: "1rem",
    },
  },

  ".inputGroup": {
    display: "inline-grid",
    gridTemplateColumns: "10fr 90fr",
    gap: "0.5rem",
    alignItems: "center",
    marginTop: "2rem",
    background: "#efefef",
    padding: "0.5rem",
    borderRadius: "10px",
    border: "2px solid #e2e2e2",

    input: {
      width: "100%",
      height: "100%",
      padding: "0.5rem",
      background: "transparent",

      "&::placeholder": {
        color: "#646464",
      },
    },
  },

  section: {
    padding: "2.5rem 3rem",
    height: "100%",
    overflow: "auto",

    h1: {
      fontSize: "2.25rem",
      color: "#252525",
      lineHeight: "1.2",
    },

    h2: {
      fontSize: "1.25rem",
      color: "rgba(37, 37, 37, 0.8)",
      fontWeight: "400",
      marginTop: "0.25rem",
    },

    h3: {
      fontSize: "1.5rem",
      color: "#252525",
      marginTop: "2.5rem",
    },
  },

  ".inputControl": {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",

    label: {
      color: "rgba(37, 37, 37, 0.5)",
      marginBottom: "0.5rem",
    },

    'input[type="color"]': {
      padding: "0",
      minHeight: "3.5rem",
    },

    "input,textarea,select": {
      background: "rgba(37, 37, 37, 0.05)",
      borderRadius: "8px",
      padding: "1rem 1.25rem",
      color: "rgba(37, 37, 37, 0.9)",
      fontSize: "1rem",
      width: "100%",
      border: "2px solid transparent",
      transition: "0.2s",
      fontWeight: "400",

      "&::placeholder": {
        color: "rgba(37, 37, 37, 0.5)",
      },

      "&:focus, &:hover": {
        borderColor: "rgba(37, 37, 37, 0.2)",
      },

      "&.errorInput": {
        borderColor: "#FF3F48",
      },

      "& + p": {
        color: "#FF3F48",
        marginTop: "0.5rem",
      },
    },

    "select,option": {
      cursor: "pointer",
    },

    "& + .inputControl": {
      marginTop: "1rem",
    },
  },

  table: {
    width: "100%",
    maxHeight: "100%",
    borderCollapse: "collapse",
    marginTop: "3rem",
    position: "relative",

    td: {
      fontSize: "1rem",
      textAlign: "center",
      color: "rgba(37, 37, 37, 0.7)",
      padding: "0.5rem 0",
    },

    "td:first-child": {
      img: {
        maxWidth: "100%",
      },

      maxWidth: "3.5rem",
    },

    tr: {
      width: "100%",
    },

    "td:last-child a": {
      color: "inherit",

      "&.statusUpdateButton": {
        color: "var(--primary-400)",
      },

      "& + a": {
        marginLeft: "0.5rem",
      },
    },

    thead: {
      width: "100%",
      textAlign: "center",
      fontWeight: 700,
      color: "rgba(37, 37, 37, 0.7)",
    },

    tbody: {
      width: "100%",
      textAlign: "center",
      fontWeight: "400",

      "&::before": {
        content: "-",
        display: "block",
        lineHeight: "1rem",
        color: " #f7f7f7",
      },

      tr: {
        background: "rgba(37, 37, 37, 0.05)",
        padding: "1rem 0.5rem",
        borderBottom: "8px solid #f7f7f7",
      },
    },
  },
});

export const DropzoneContainer = styled("div", {
  flex: "1",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "3rem",
  borderWidth: "2px",
  borderColor: "rgba(37, 37, 37, 0.2)",
  borderStyle: "dashed",
  background: "rgba(37, 37, 37, 0.05)",
  outline: "none",
  borderRadius: "8px",
  transition: "border 0.24s ease-in-out",
  color: "rgba(37, 37, 37, 0.5)",
  cursor: "pointer",

  "&:hover": {
    borderColor: "rgba(37, 37, 37, 0.4)",
  },
});

export const Button = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
  padding: "1rem 1.25rem",
  fontSize: "1.1rem",
  marginTop: "2.5rem",
  color: "#fff",
  backgroundColor: "#267adc",
  transition: "0.2s",

  "&:hover": {
    filter: "brightness(90%)",
  },
});
