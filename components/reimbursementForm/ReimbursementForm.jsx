import React, { useReducer } from "react";
import StudentForm from "./CretificationForm/studentform";
import StaffForm from "./CretificationForm/staffform.jsx";
import NptelForm from "./CretificationForm/nptelform";
import GlobalCertification from "./CretificationForm/globalcertification";
import PaperPublication from "./CretificationForm/paperpublication";
import Fdpform from "./CretificationForm/fdpform";

import {
  Box,
  Divider,
  Stack,
  Typography,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

const ReimbursementForm = () => {
  const [certificationDetails, setCertificationDetails] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(certificationDetails);
  };
  const handleChange = (name, value) => {
    setCertificationDetails((prev) => ({
      ...prev,
      [name]:
        typeof value === "object"
          ? {
              ...prev[name],
              [Object.entries(value)[0][0]]: Object.entries(value)[0][1],
            }
          : value,
    }));
  };

  return (
    <>
      <div className="flex h-full w-full mt-10">
        <div className="shadow-xl h-fit m-auto sm:w-1/2 lg:w-2/5 w-full flex justify-evenly items-center rounded-md py-8">
          <Box
            sx={{
              width: "90%",
            }}
          >
            <Typography variant="h4" mb={2}>
              Apply for Reimbursement
            </Typography>
            <Divider variant="middle" className="mb-4" />
            <form
              className="w-full flex flex-col justify-center items-center"
              onSubmit={handleSubmit}
            >
              <Box className="w-full">
                <Stack spacing={3}>
                  <Autocomplete
                    name="user"
                    disablePortal
                    id="combo-box-demo"
                    required
                    onChange={(e, v) =>
                      handleChange("additionalDetails", {
                        [e.target.name]: v ? v.label : "",
                      })
                    }
                    options={[{ label: "Student" }, { label: "Teacher" }]}
                    renderInput={(params) => (
                      <TextField name="user" {...params} label="Select Role" />
                    )}
                    // onInputChange={getUserDetails}
                  />
                  {/* render when user is student */}
                  {certificationDetails.user === "Student" && (
                    <StudentForm handleChange={handleChange} />
                  )}
                  {/* render when user is stuff */}

                  {certificationDetails.user === "Teacher" && (
                    <StaffForm handleChange={handleChange} />
                  )}

                  {certificationDetails.user && (
                    <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
                      <Autocomplete
                        name="certification"
                        disablePortal
                        id="combo-box-demo"
                        options={[
                          { label: "NPTEL" },
                          { label: "GlobalCertification" },
                          { label: "Paperpublication" },
                          { label: "FTTP/STP" },
                        ]}
                        onChange={(e, v) =>
                          handleChange("certification", v ? v.label : "")
                        }
                        // onInputChange={getCertification}
                        sx={{ width: "100%" }}
                        renderInput={(params) => (
                          <TextField {...params} label="Select Certificate" />
                        )}
                      />
                    </Stack>
                  )}
                  {certificationDetails.certification === "NPTEL" && (
                    <NptelForm handleChange={handleChange} />
                  )}
                  {certificationDetails.certification ===
                    "GlobalCertification" && (
                    <GlobalCertification handleChange={handleChange} />
                  )}
                  {certificationDetails.certification ===
                    "Paperpublication" && (
                    <PaperPublication handleChange={handleChange} />
                  )}
                  {certificationDetails.certification === "FTTP/STP" && (
                    <Fdpform handleChange={handleChange} />
                  )}
                  <LoadingButton
                    variant="contained"
                    loading={false}
                    type={"submit"}
                  >
                    Submit
                  </LoadingButton>
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
