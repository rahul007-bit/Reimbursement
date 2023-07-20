import React, { useEffect, useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material";
import HeaderBar from "../header/header";
import Head from "next/head";
import { useUserProfile } from "../../Hooks/apiHooks";
import { useAtom } from "jotai";
import { snackBarAtom } from "../../store";
import Footer from "../header/Footer";
import {
  Compress,
  FeedOutlined,
  Home,
  PersonAdd,
  RequestQuote,
} from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";

export const drawerWidth = 280;

const Layout = ({ children, title: Header = "Reimbursement", path }) => {
  const { error, loading, userData } = useUserProfile();
  const [, setSnackBar] = useAtom(snackBarAtom);
  const [value, setValue] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (!loading) {
      if (error?.status === 500) {
        setSnackBar({
          open: true,
          message: error.message,
          type: "error",
        });
      }
    }
  }, [userData, error, loading, setSnackBar]);
  useEffect(() => {
    if (path) setValue(path);
    else {
      setValue(
        userData?.type === "admin" || userData?.type === "sub_admin"
          ? "/admin"
          : "/user"
      );
    }
  }, [path, userData?.type]);

  const handleChange = (_, newValue) => {
    setValue(newValue);
    router.push(newValue);
  };

  // if (loading) return <Loader />;

  return (
    <>
      <Head>
        <title>{Header}</title>
      </Head>
      <HeaderBar userDetails={userData} />
      <Box
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          mt: { md: 8, sm: "56.2px", xs: "56.2px" },
          minHeight: "-webkit-fill-available",
          minHeight: "-moz-available",
          minHeight: "fill-available",
          background: "#f5f5f5",
          position: "relative",
          pb: {
            xs: "130px",
            sm: "130px",
            md: "60px",
          },
        }}
      >
        {children}

        <Footer />
        {userData && (
          <Paper
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              display: { xs: "block", sm: "block", md: "none" },
            }}
            elevation={3}
          >
            <BottomNavigation
              sx={{
                height: "auto",
                py: 1,
              }}
              showLabels
              value={value}
              onChange={handleChange}
            >
              <BottomNavigationAction
                label="Home"
                icon={<Home />}
                value={
                  userData.type === "admin" || userData.type === "sub_admin"
                    ? "/admin"
                    : "/user"
                }
                LinkComponent={
                  <Link
                    href={
                      userData.type === "admin" || userData.type === "sub_admin"
                        ? "/admin"
                        : "/user"
                    }
                  />
                }
              />
              {(userData.type === "admin" || userData.type === "sub_admin") && (
                <BottomNavigationAction
                  label="View Requests"
                  icon={<RequestQuote />}
                  value={"/admin/view_request"}
                  LinkComponent={<Link href="/admin/view_request" />}
                />
              )}
              {(userData.type === "admin" || userData.type === "sub_admin") && (
                <BottomNavigationAction
                  label="Add Users"
                  icon={<PersonAdd />}
                  value={"/admin/add_users"}
                  LinkComponent={<Link href="/admin/add_users" />}
                />
              )}
              {(userData.type === "admin" || userData.type === "sub_admin") && (
                <BottomNavigationAction
                  label="Forms"
                  icon={<FeedOutlined />}
                  value={"/admin/view-forms"}
                  LinkComponent={<Link href="/admin/view-forms" />}
                />
              )}

              {userData.type === "user" && (
                <BottomNavigationAction
                  label="New Request"
                  icon={<RequestQuote />}
                  value={"/user/reimbursement"}
                  LinkComponent={<Link href="/user/reimbursement" />}
                />
              )}
              {userData.type === "user" && (
                <BottomNavigationAction
                  label="Compress PDF"
                  icon={<Compress />}
                  value={"/user/compress-pdf"}
                  LinkComponent={<Link href="/user/compress-pdf" />}
                />
              )}
            </BottomNavigation>
          </Paper>
        )}
      </Box>
    </>
  );
};

export default Layout;
