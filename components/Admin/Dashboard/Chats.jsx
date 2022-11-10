import { Box, CircularProgress } from "@mui/material";
import EChartsReact from "echarts-for-react";
import React, { useEffect, useState } from "react";
import { useFetch } from "../../../Hooks/apiHooks";

export default function Chats({ chart }) {
  const [data, setData] = useState([]);
  const { loading, data: fetchData } = useFetch(
    `reimburseCount?get=${chart}`,
    []
  );
  useEffect(() => {
    if (!loading && fetchData) {
      if (fetchData.status !== 404 || fetchData.status === 200) {
        const data = fetchData.data.map((d) => ({
          name: d._id,
          value: d.Total,
        }));
        setData(data);
      }
    }
  }, [loading, fetchData]);
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
        data: data,
      },
    ],
    textStyle: {
      fontFamily: "Poppins, sans-serif",
    },
  };

  return (
    <>
      {/* {!loading ? ( */}
      <EChartsReact
        style={{ height: "350px" }}
        option={option}
        showLoading={loading}
      />
      {/* ) : ( */}
      {/* <Box
        sx={{
          width: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box> */}
      {/* )} */}
    </>
  );
}
