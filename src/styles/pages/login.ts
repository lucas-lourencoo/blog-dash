import { styled } from "@stitches/react";

export const Container = styled("main", {
  maxWidth: "34rem",
  height: "100vh",
  margin: "0 auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",

  ".loginGrid": {
    display: "grid",
    gridAutoFlow: "row",

    a: {
      color: "rgba(37, 37, 37, 0.5)",
      fontSize: "1rem",
      marginTop: "0.5rem",
    },

    form: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      maxWidth: "100%",

      p: {
        color: "#FF3F48",
        margin: "0.25rem 0.5rem 1rem",
        fontSize: "0.875rem",
      },

      ".inputFormControl": {
        position: "relative",
        marginTop: "0.5rem",

        input: {
          width: "100%",
        },

        ".passwordEye": {
          position: "absolute",
          top: "15%",
          right: "1rem",
          background: "none",
          color: "rgba(37, 37, 37, 0.6)",
          padding: "0.75rem",
          margin: 0,
          transition: "0.2s",

          "&:hover": {
            backgroundColor: " rgba(200, 200, 200, 0.1)",
          },
        },
      },

      h3: {
        color: "#267ADC",
        textAlign: "center",
        fontSize: "1.25rem",
        marginBottom: "2.5rem",
      },

      input: {
        "&.errorInput": {
          border: "1px solid #FF3F48",
        },

        "&:focus": {
          border: "1px solid rgba(37, 37, 37, 0.6)",
        },

        border: "1px solid rgba(37, 37, 37, 0.6)",
        borderRadius: "80px",
        padding: "1.25rem 1.5rem",
        fontSize: "1rem",

        "&::placeholder": {
          color: "rgba(37, 37, 37, 0.3)",
        },

        "& + input": {
          marginTop: "0.5rem",
        },
      },

      'input[type="password"]': {
        fontFamily: "sans-serif",
      },

      button: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "80px",
        padding: "1.25rem 1.5rem",
        fontSize: "1.1rem",
        marginTop: "2.5rem",
        color: "#fff",
        backgroundColor: "#267ADC",
        transition: "0.2s",

        "&:hover": {
          filter: "brightness(90%)",
        },
      },
    },

    "button.googleLogin": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      justifySelf: "flex-end",
      width: "100%",
      marginTop: "3rem",

      color: "rgba(37, 37, 37, 0.6)",

      border: "1px solid rgba(37, 37, 37, 0.2)",
      borderRadius: "100px",

      fontSize: "1.25rem",
      padding: "1rem 0",

      transition: "0.2s",

      "&:hover": {
        filter: "brightness(90%)",
      },

      span: {
        marginLeft: "1rem",
      },
    },
  },

  a: {
    color: "rgba(37, 37, 37, 0.5)",
    fontSize: "1rem",
    marginTop: "4rem",
    textAlign: "center",
  },
});
