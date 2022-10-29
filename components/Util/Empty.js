import React from "react";
import empty from "../../assest/empty.svg";
import Image from "next/image";
import { Typography } from "@mui/material";
const Empty = () => {
  return (
    <div className={"flex items-center flex-col"}>
      <Image src={empty} alt="" width={"350px"} height={"350px"} />
      <Typography variant={"h4"}>Sorry There nothing to show!!</Typography>
    </div>
  );
};

export default Empty;
