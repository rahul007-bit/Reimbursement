import {
  AppBar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";
import dynamic from "next/dynamic";
const UserTable = dynamic(() => import("../../components/Admin/UserTable"));

import { useUserProfile } from "../../Hooks/apiHooks";
import Layout from "../../components/Layout";
import TabPanel, { a11yProps } from "../../components/Util/TabPanel";
import { useCookies } from "react-cookie";

export default function AddUser() {
  const { loading, userData } = useUserProfile();
  const [cookies] = useCookies(["loginType"]);

  const [value, setValue] = React.useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", width: 1, justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );

  // if (error) return <Error statusCode={error} />;

  return (
    <Layout userData={userData}>
      {/* <Container sx={{ mt: 10 }}> */}
      <AppBar position={"relative"} elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{ style: { background: "#fff" } }}
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab label="Students" {...a11yProps(0)} />
          {cookies && cookies.loginType === "admin" && (
            <Tab label="Head Of Departements" {...a11yProps(1)} />
          )}
          {cookies && cookies.loginType === "admin" && (
            <Tab label="Accountant" {...a11yProps(2)} />
          )}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant={"h5"}>Students</Typography>
            <Divider />
            <UserTable usedFor={"students"} userData={userData} />
          </CardContent>
        </Card>
      </TabPanel>
      {cookies && cookies.loginType === "admin" && (
        <>
          <TabPanel value={value} index={1}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant={"h5"}>Head Of Departements</Typography>
                <Divider />
                <UserTable usedFor={"sub_admin"} userData={userData} />
              </CardContent>
            </Card>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant={"h5"}>Accountant</Typography>
                <Divider />
                <UserTable usedFor={"receptionist"} userData={userData} />
              </CardContent>
            </Card>
          </TabPanel>
        </>
      )}
      {/* </Container> */}
    </Layout>
  );
}
