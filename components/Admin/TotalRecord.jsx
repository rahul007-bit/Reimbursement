import React from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Drawer,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import ReactEcharts from "echarts-for-react";

const TotalRecord = () => {
  var option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
      textStyle: {
        //The style of the legend text
        color: "#858d98",
      },
    },

    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          {
            value: 1048,
            name: "Search Engine",
          },
          {
            value: 735,
            name: "Direct",
          },
          {
            value: 580,
            name: "Email",
          },
          {
            value: 484,
            name: "Union Ads",
          },
          {
            value: 300,
            name: "Video Ads",
          },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
    textStyle: {
      fontFamily: "Poppins, sans-serif",
    },
  };
  return (
    <>
      {/* <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={2}
        sx={{
          display: "flex",
          m: "auto",
          py: 5,
          px: 4,
          justifyContent: "space-evenly",
          maxWidth: 1000,
        }}
      >
        <Box>
          <Card
            sx={{
              transition: "0.2s",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <CardContent>
              <Typography
                fontWeight={"bold"}
                variant="subtitle1"
                textAlign={"center"}
              >
                Total Reimbursements
              </Typography>
              <Typography variant="h6">131321</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Card
            sx={{
              transition: "0.2s",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <CardContent>
              <Typography
                fontWeight={"bold"}
                variant="subtitle1"
                textAlign={"center"}
              >
                Total Reimbursements
              </Typography>
              <Typography variant="h6">131321</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Card
            sx={{
              transition: "0.2s",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <CardContent>
              <Typography
                textAlign={"center"}
                fontWeight={"bold"}
                variant="subtitle1"
              >
                Total Reimbursements
              </Typography>
              <Typography variant="h6">131321</Typography>
            </CardContent>
          </Card>
        </Box>
      </Stack> */}
      <Box sx={{ flexGrow: 1, mt: 3 }}>
        {/* chat 1 pie chart*/}
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 2, sm: 4, md: 8 }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item xs={2} sm={3} md={3}>
            <Card>
              <CardContent>
                <ReactEcharts style={{ height: "350px" }} option={option} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default TotalRecord;
