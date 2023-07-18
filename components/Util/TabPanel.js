import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { md: 3 }, minHeight: "790px" }}>{children}</Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
  };
}
export default TabPanel;
