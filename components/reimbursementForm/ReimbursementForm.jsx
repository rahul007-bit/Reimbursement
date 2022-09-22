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

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const ReimbursementForm = () => {
  const getUserDetails = (event, value) => {
    handleChange("user", value);
  };

  const getCertification = (event, value) => {
    handleChange("certification", value);
  };

  const [formData, setFormData] = useReducer(formReducer, {
    user: "",
    certificates: "",
  });
  const handleChange = (name, value) => {
    setFormData({
      name: name,
      value: value,
    });
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
            <form className="w-full flex flex-col justify-center items-center">
              <Box className="w-full">
                <Stack spacing={3}>
                  <Autocomplete
                    name="user"
                    disablePortal
                    id="combo-box-demo"
                    options={[{ label: "Student" }, { label: "Teacher" }]}
                    renderInput={(params) => (
                      <TextField name="user" {...params} label="Select Role" />
                    )}
                    onInputChange={getUserDetails}
                  />
                  {/* render when user is student */}
                  {formData.user === "Student" && (
                    <StudentForm handleChange={handleChange} />
                  )}
                  {/* render when user is stuff */}

                  {formData.user === "Teacher" && (
                    <StaffForm handleChange={handleChange} />
                  )}

                  {formData.user && (
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
                        onInputChange={getCertification}
                        sx={{ width: "100%" }}
                        renderInput={(params) => (
                          <TextField {...params} label="Select Courses" />
                        )}
                      />
                    </Stack>
                  )}
                  {formData.certification === "NPTEL" && (
                    <NptelForm handleChange={handleChange} />
                  )}
                  {formData.certification === "GlobalCertification" && (
                    <GlobalCertification handleChange={handleChange} />
                  )}
                  {formData.certification === "Paperpublication" && (
                    <PaperPublication handleChange={handleChange} />
                  )}
                  {formData.certification === "FTTP/STP" && (
                    <Fdpform handleChange={handleChange} />
                  )}
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
