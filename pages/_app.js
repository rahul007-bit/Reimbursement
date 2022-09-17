import "../styles/globals.css";
import dynamic from "next/dynamic";
import { createTheme, ThemeProvider } from "@mui/material";

const ProgressBar = dynamic(
  () => import("../components/ProgressBar/ProgressBar"),
  {
    ssr: false,
  }
);

export const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#424483",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#a3aabb",
    },
    info: {
      main: "#9ccc65",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#434242",
    },
    background: {
      default: "#f6f6f7",
    },
    warning: {
      main: "#fb8c00",
    },
  },
  typography: {
    fontFamily: `Montserrat, sans-serif`,
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      {" "}
      <ThemeProvider theme={theme}>
        <ProgressBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
