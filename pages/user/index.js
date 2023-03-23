import React, { useState } from "react";
import { UserHome } from "../../components/UserHome";
import { useUserProfile } from "../../Hooks/apiHooks";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  CircularProgress,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Layout from "../../components/Layout";
import TabPanel, { a11yProps } from "../../components/Util/TabPanel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
        <AppBar position={"relative"} elevation={0}>
          <Tabs
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{ style: { background: "#fff" } }}
            textColor="inherit"
            variant="fullWidth"
          >
            <Tab label="Pending Request" {...a11yProps(0)} />
            {userData?.type === "user" && (
              <Tab label="Approved Request" {...a11yProps(1)} />
            )}
            {userData?.type === "user" && (
              <Tab label="All Request" {...a11yProps(2)} />
            )}
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Accordion
            TransitionProps={{ unmountOnExit: true }}
            defaultExpanded={true}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }} variant={"h6"}>
                Pending Request
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <UserHome userData={userData} status={"PENDING"} />
            </AccordionDetails>
          </Accordion>
          {userData?.type === "user" && (
            <Accordion TransitionProps={{ unmountOnExit: true }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }} variant={"h6"}>
                  In Process Request
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <UserHome userData={userData} status={"In Process"} />
              </AccordionDetails>
            </Accordion>
          )}
        </TabPanel>
        {userData?.type === "user" && (
          <>
            <TabPanel value={value} index={1}>
              <UserHome userData={userData} status={"Approved"} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <UserHome userData={userData} />
            </TabPanel>
          </>
        )}
      </Layout>
    </>
  );
}
