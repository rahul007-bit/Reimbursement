// Footer with mui
import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box component="footer" square variant="outlined">
      <Divider />
      <Container
        maxWidth="lg"
        sx={{
          py: 2,
        }}
      >
        <Grid container direction="column" alignItems="center">
          <Grid
            container
            direction="row"
            justifyContent={{
              xs: "center",
              sm: "space-between",
              md: "space-between",
            }}
            columns={{
              xs: 1,
              sm: 2,
            }}
          >
            <Grid item alignItems="center">
              <Typography color="black" variant="caption">
                A.P. Shah Institute of Technology. All rights reserved &copy;{" "}
                {new Date().getFullYear()}
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" variant="subtitle2">
                APSIT Reimbursement Portal v1.0.0
              </Typography>
            </Grid>
          </Grid>
          {/* <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle2">
              Developed with ❤️ at APSIT
            </Typography>
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
