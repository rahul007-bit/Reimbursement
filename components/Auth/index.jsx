import React from "react";
import { url } from "../../Hooks/apiHooks";
import { Cookies } from "react-cookie";
import User from "../Context/user";

export const Auth = ({ children, user }) => {
  return <User value={user}>{children}</User>;
};
