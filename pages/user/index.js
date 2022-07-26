import React, { useState } from "react";
import { UserHome } from "../../components/UserHome";
import { useUserProfile } from "../../Hooks/apiHooks";
import { AppBar, Box, CircularProgress, Tab, Tabs } from "@mui/material";
import Layout from "../../components/Layout";
import TabPanel, { a11yProps } from "../../components/Util/TabPanel";

export default function Home() {
  const { error, loading, userData } = useUserProfile();
  const [value, setValue] = useState(0);
  if (loading)
    return (
      <Box sx={{ display: "flex", width: 1, justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  // if (error) return <Error statusCode={error} />;
  return (
    <>
      <Layout userData={userData} title={"Reimbursement"}>
        {/*<UserHome userData={userData} />*/}
        <AppBar position={"relative"}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
          >
            <Tab label="Pending Request" {...a11yProps(0)} />
            <Tab label="Approved Request" {...a11yProps(1)} />
            <Tab label="All Request" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <UserHome userData={userData} status={"PENDING"} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UserHome userData={userData} status={"Approved"} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <UserHome userData={userData} />
        </TabPanel>
      </Layout>
    </>
  );
}
