import Header from "../components/header/header";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) router.replace("/login");
  }, []);
  return (
    <>
      <Header />
    </>
  );
}
