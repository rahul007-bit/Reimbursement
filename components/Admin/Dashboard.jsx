import React from "react";
import { Box, Card, CardContent, CardHeader, Grid } from "@mui/material";
import Chats from "./Dashboard/Chats";
import getChartColorsArray from "../Util/chartColor";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Dashboard = ({
  charts,
  statusCount,
  status,
  departmentCount,
  department,
}) => {
  const chartColumnColors = getChartColorsArray(
    '["#0B84A5","#F6C85F","#6F4E7C","#9ED867","#CA472F","#FFA056","#FFA056","#8DDDD0"]'
  );

  const optionsRequest = {
    chart: {
      height: 350,
      type: "bar",

      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    colors: chartColumnColors,
    xaxis: {
      categories: status.map((s) => s.name),
    },
    yaxis: {
      type: "numeric",
      title: {
        text: "Requests",
      },
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " requests";
        },
      },
    },
  };

  const optionsDepartment = {
    chart: {
      toolbar: {
        show: !1,
      },
      zoom: {
        enabled: !0,
      },
    },
    plotOptions: {
      bar: {
        horizontal: !1,
        borderRadius: 10,
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    colors: chartColumnColors,
    xaxis: {
      categories: department.map((s) => s.name),
      title: {
        text: "Departments",
      },
    },
    yaxis: {
      title: {
        text: "Requests",
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " requests";
        },
      },
    },
  };

  return (
    <>
      <Box
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        <Grid
          container
          spacing={2}
          columns={{ xs: 2, sm: 4, md: 12 }}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <Grid item xs={4}>
            <Card variant="outlined">
              <CardHeader title={"Requests"} />
              <CardContent>
                <Chats chart={"status"} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Card variant="outlined">
              <CardHeader title="Requests" />
              <CardContent>
                <Chart
                  series={statusCount}
                  options={optionsRequest}
                  type="bar"
                  height={340}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Card variant="outlined">
              <CardHeader title="Department" />
              <CardContent>
                <Chart
                  series={departmentCount}
                  options={optionsDepartment}
                  type="bar"
                  height={340}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card variant="outlined">
              <CardHeader title={"Department"} />
              <CardContent>
                <Chats chart={"department"} />
              </CardContent>
            </Card>
          </Grid>

          {/* {charts.map((chart, idx) => (
            <Grid key={idx} item xs={4}>
              <Card variant="outlined">
                <CardHeader title={chart.name} />
                <CardContent>
                  <Chats chart={chart.key} />
                </CardContent>
              </Card>
            </Grid>
          ))} */}
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
