import React, { useState } from "react";
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
                    options={[{ label: "Student" }, { label: "NPTEL" }]}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Role" />
                    )}
                    onInputChange={getUserDetails}
                  />
                  {/* <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
                    <TextField
                      fullWidth
                      label="Student Name"
                      id="outlined-required"
                      required
                    ></TextField>
                    <TextField
                      fullWidth
                      label="email"
                      id="outlined-required"
                      required
                    ></TextField>
                    
                  

                  </Stack>
                  <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
                    <TextField
                      sx={{width:255}}
                      label="Course Name"
                      id="outlined-required"
                      required
                    ></TextField>
                     <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={[{ label: "First Half" }, { label: "Second half" }]}
                    sx={{ width: 260 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Academic Year" />
                    )}
                
                  />
                    
                    </Stack>
                  
                    <Typography variant="h8" gutterBottom>
        Duration
      </Typography>
      <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
                    <TextField
                      fullWidth
                      label="Start Date"
                      id="outlined-required"
                      required
                    ></TextField>
                    <TextField
                      fullWidth
                      label="End Date"
                      id="outlined-required"
                      required
                    ></TextField>
                     <TextField
                      fullWidth
                      label="Exam Date"
                      id="outlined-required"
                      required
                    ></TextField>
                    
                    
                  

                  </Stack>
                  <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={[{ label: "Elite" }, { label: "Gold" },{label: "Silver"}]}
                    sx={{ width: 250 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Class Received(if any)" />
                    )}
                
                  />
                   
                   <TextField
                      sx={{width:250}}
                      label="Reimbursement Amount"
                      id="outlined-required"
                      required
                    ></TextField>
                    
                  </Stack> */}

                  {user === "NPTEL" && <NptelForm />}
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
