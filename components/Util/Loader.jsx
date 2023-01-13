import { Box, LinearProgress } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: 1,
        justifyContent: "center",
        height: 1,
        alignItems: "center",
      }}
    >
      {/*<CircularProgress />*/}
      <LinearProgress
        sx={{
          width: "40%",
        }}
        variant={"indeterminate"}
      />
    </Box>
  );
};

export default Loader;
