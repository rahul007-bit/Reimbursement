import Header from "../components/header/header";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { UserHome } from "../components/UserHome";
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    // console.log(token);
    if (!token) router.replace("/login");
  }, []);
  return (
    <>
      <Header />
      <UserHome />
    </>
  );
}
