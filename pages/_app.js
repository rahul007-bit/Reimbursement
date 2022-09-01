import "../styles/globals.css";
import dynamic from "next/dynamic";
const ProgressBar = dynamic(
  () => import("../components/ProgressBar/ProgressBar"),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ProgressBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
