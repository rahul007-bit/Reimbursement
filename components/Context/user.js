import React, { createContext } from "react";

export const UserContext = createContext({ user: null });

const User = ({ children }) => {
  return (
    <UserContext.Provider value={{ user: null }}>
      {children}
    </UserContext.Provider>
  );
};
export default User;
