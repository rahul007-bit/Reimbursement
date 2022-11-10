import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import Chats from "./Dashboard/Chats";
const Dashboard = ({ charts }) => {
  return (
    <>
      <Box
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        {/* chat 1 pie chart*/}
        <Typography variant={"h4"} margin={6}>
          Summary
        </Typography>

        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 2, sm: 4, md: 8 }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {charts.map((chart, idx) => (
            <Grid key={idx} item xs={2} sm={3} md={3}>
              <Card>
                <CardHeader title={chart.name} />
                <CardContent>
                  <Chats chart={chart.key} />
                </CardContent>
              </Card>
            </Grid>
          ))}
          {/* <Grid item xs={2} sm={3} md={3}>
            <Card>
              <CardContent>
                <Chats />
              </CardContent>
            </Card>
          </Grid> */}
        </Grid>
        {/* chat 2 bar graph */}
      </Box>
    </>
  );
};
export default Dashboard;
