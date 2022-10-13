import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Grid as Table } from "gridjs-react";
import React from "react";
import UserTable from "../../UserHome/UserTable";

export default function AdminTable({ data }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        m: 8,
        flexDirection: "column",
      }}
    >
      {/* chat 1 pie chart*/}
      {/* <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 2, sm: 4, md: 8 }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={2} sm={3} md={3}>
          <Card>
            <CardContent> */}
      <Typography variant="h6" marginBottom={4}>
        Reimbursement Request
      </Typography>
      <UserTable data={data} user={"admin"} />
      {/* //         </CardContent>
    //       </Card>
    //     </Grid>
    //   </Grid> */}
    </Box>
  );
}
