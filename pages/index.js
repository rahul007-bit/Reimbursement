import Header from "../components/header/header";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { UserHome } from "../components/UserHome";
import { Auth } from "../components/Auth";
import { Suspense, Fragment } from "react";

const isSSR = typeof window === "undefined";

const SsrSuspense = isSSR ? Fragment : Suspense;

export default function Home() {
  return (
    <>
      <Suspense fallback={"loading.."}>
        <Auth user={"user"}>
          <Header />
          <UserHome />
        </Auth>
      </Suspense>
    </>
  );
}
