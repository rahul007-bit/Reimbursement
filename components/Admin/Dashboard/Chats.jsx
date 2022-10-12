import { Box, Card, CardContent, Grid } from "@mui/material";
import EChartsReact from "echarts-for-react";
import React from "react";

export default function Chats() {
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
      textStyle: {
        //The style of the legend text
        color: "#858d98",
      },
    },
    // color: chartDoughnutColors,
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "16",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
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
      },
    ],
    textStyle: {
      fontFamily: "Poppins, sans-serif",
    },
  };

  return (
    <>
      {/* <Box
        sx={{
          display: "flex",
          width: 1,
          height: 1,
          alignContent: "center",
          justifyContent: "center",
        }}
      > */}
      <Box sx={{ flexGrow: 1 }}>
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
                <EChartsReact style={{ height: "350px" }} option={option} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2} sm={3} md={3}>
            <Card>
              <CardContent>
                <EChartsReact style={{ height: "350px" }} option={option} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* chat 2 bar graph */}
      </Box>
    </>
  );
}
