import React, { useState } from "react";
import StudentForm from "./CretificationForm/studentform";
import Staffform from "./CretificationForm/staffform.jsx";
import NptelForm from "./CretificationForm/nptelform";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Box, Stack, Divider, Typography } from "@mui/material";

const ReimbursementForm = ({ formData }) => {
  const [user, setUser] = useState("");
  const getUserDetails = (event, value) => {
    console.log(value);
    setUser(value);
  };
  return (
    <>
      <div className="flex h-full w-full ">
        <div className="shadow h-fit m-auto sm:w-1/2 lg:w-2/5 w-full flex justify-evenly items-center rounded-md py-8">
          <Box
            sx={{
              width: "90%",
            }}
          >
            <Typography variant="h4" mb={2}>
              Apply for Reimbursement
            </Typography>
            <Divider variant="middle" className="mb-4" />
            <form className="w-full flex flex-col justify-center items-center">
              <Box className="w-full">
                <Stack spacing={3}>
                  <Stack direction="row" spacing={3}></Stack>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={[{ label: "Student" }, { label: "Staff" }]}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Role" />
                    )}
                    onInputChange={getUserDetails}
                  />

                  {user === "Student" && <StudentForm />}
                  {user === "Staff" && <Staffform />}
                  {user === "Nptel" && <NptelForm />}
                </Stack>
              </Box>
            </form>
          </Box>
        </div>
      </div>
    </>
  );
};

export default ReimbursementForm;
