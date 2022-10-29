import React, { useState } from "react";
import { UserHome } from "../../components/UserHome";
import { useUserProfile } from "../../Hooks/apiHooks";
import {
  AppBar,
  Box,
  CircularProgress,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import Layout from "../../components/Layout";
import PropTypes from "prop-types";
import TabPanel, { a11yProps } from "../../components/Util/TabPanel";

export default function Home() {
  const { error, loading, userData } = useUserProfile();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  if (loading)
    return (
      <Box sx={{ display: "flex" }}>
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
            aria-label="full width tabs example"
          >
            <Tab label="Pending Request" {...a11yProps(0)} />
            <Tab label="Approved Request" {...a11yProps(1)} />
            <Tab label="All Request" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <UserHome userData={userData} status={"PENDING"} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <UserHome userData={userData} status={"Approved"} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <UserHome userData={userData} />
        </TabPanel>
      </Layout>
    </>
  );
}
