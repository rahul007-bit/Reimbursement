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
      orient: "horizontal",
      left: "center",
      bottom: "0",
      textStyle: {
        color: "#858d98",
      },
    },
    // color: chartPieColors,
    series: [
      {
        name: "Requests",
        type: "pie",
        radius: ["30%", "60%"],
        data: data,
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
      <EChartsReact
        style={{ height: "350px" }}
        option={option}
        showLoading={loading}
      />
    </>
  );
}
