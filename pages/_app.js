import "../styles/globals.css";

import dynamic from "next/dynamic";
import { createTheme, ThemeProvider } from "@mui/material";
import { Provider as JotaiProvider } from "jotai";
import Snack from "../components/Util/Snackbar";
import Head from "next/head";
import { SWRConfig } from "swr";
// import Footer from "../components/header/Footer";

export const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#424483",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#1e88e5",
    },
    info: {
      main: "#9ccc65",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#434242",
    },
    background: {
      default: "#f5f5f5",
    },

    warning: {
      main: "#fb8c00",
    },
  },
  typography: {
    fontFamily: 'system-ui,"Martel Sans", "Helvetica", "Arial", sans-serif',
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Reimbursement</title>
      </Head>
      <ThemeProvider theme={theme}>
        <SWRConfig value={{ provider: () => new Map() }}>
          <JotaiProvider>
            {/* <ProgressBar /> */}
            <Snack />
            <Component {...pageProps} />
          </JotaiProvider>
        </SWRConfig>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
