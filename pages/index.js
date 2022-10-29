import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/user");
  }, [router]);
  return <></>;
};

export default Index;
