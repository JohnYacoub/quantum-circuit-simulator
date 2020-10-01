import { createMuiTheme } from "@material-ui/core/styles";

const QuantumTheme = createMuiTheme({
  palette: {
    primary: { main: "#f8f8ff" },
    secondary: { main: "#000000" },
  },
  overrides: {
    MuiTab: {
      root: {
        backgroundColor: "transparent",
        minWidth: "9em",
        minHeight: "2em",
        fontFamily: "Source Code Pro, monospace",
        fontWeight: "bold",
        letterSpacing: "-0.03em",
        textTransform: "none",
        opacity: "1",
        color: "black",
        borderRadius: "0em",
      },
    },
    MuiTabs: {
      root: {
        width: "30vw",
        minHeight: "0em",
      },
      indicator: {
        backgroundColor: "#07dacf",
        left: "1em",
        width: "7em",
      },
    },
    MuiPaper: {
      rounded: {
        padding: "2em",
        textAlign: "center",
        borderRadius: "0",
      },
    },
    MuiGrid: {
      container: {
        justifyContent: "center",
      },
    },
    MuiListItemIcon: {
      root: {
        color: "white",
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "grey",
        margin: "0 1em 0 1em",
      },
    },
    MuiSvgIcon: {
      root: {
        fontSize: "1.4rem",
      },
    },
    MuiButton: {
      label: {
        justifyContent: "end",
      },
    },
  },
});

export default QuantumTheme;
