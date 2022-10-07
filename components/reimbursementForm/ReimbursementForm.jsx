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
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { submit } from "../../Hooks/apiHooks";
import PaymentDetails from "./paymentDetails";
import { useRouter } from "next/router";

const ReimbursementForm = () => {
  const [certificationDetails, setCertificationDetails] = useState({});
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const handleClose = () => {
    setOpen(false);
    setSnackType("");
    setMessage("");
  };
  const [snackType, setSnackType] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    submit("user/requestReimburse", { ...certificationDetails }).then(
      (response) => {
        if (response.status === 200 || response.success) {
          setOpen(true);
          setMessage("Successfully Applied");
          setSnackType("success");
          setTimeout(() => {
            router.push("/");
          }, 500);
        } else if (response.status === 400 || response.validation?.body) {
          setSnackType("error");
          setOpen(true);
          setMessage(response.validation.body.message);
        }
      }
    );
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
                        ["name"]: v ? v.label : "",
                      })
                    }
                    options={[{ label: "Student" }, { label: "Teacher" }]}
                    renderInput={(params) => (
                      <TextField name="user" {...params} label="Select Role" />
                    )}
                    // onInputChange={getUserDetails}
                  />
                  {/* render when user is student */}
                  {certificationDetails.additionalDetails?.name ===
                    "Student" && <StudentForm handleChange={handleChange} />}
                  {/* render when user is stuff */}

                  {certificationDetails.additionalDetails?.name ===
                    "Teacher" && <StaffForm handleChange={handleChange} />}

                  {certificationDetails.additionalDetails?.name && (
                    <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
                      <Autocomplete
                        name="certificate_name"
                        id="combo-box-demo"
                        options={[
                          { label: "NPTEL" },
                          { label: "Global Certification" },
                          { label: "Paper Publication" },
                          { label: "FTTP / STP" },
                        ]}
                        onChange={(e, v) =>
                          handleChange("certificate_name", v ? v.label : "")
                        }
                        // onInputChange={getCertification}
                        sx={{ width: "100%" }}
                        renderInput={(params) => (
                          <TextField {...params} label="Select Certificate" />
                        )}
                      />
                    </Stack>
                  )}
                  {certificationDetails.additionalDetails?.name &&
                    certificationDetails.certificate_name === "NPTEL" && (
                      <NptelForm handleChange={handleChange} />
                    )}
                  {certificationDetails.additionalDetails?.name &&
                    certificationDetails.certificate_name ===
                      "Global Certification" && (
                      <GlobalCertification handleChange={handleChange} />
                    )}
                  {certificationDetails.additionalDetails?.name &&
                    certificationDetails.certificate_name ===
                      "Paper Publication" && (
                      <PaperPublication handleChange={handleChange} />
                    )}
                  {certificationDetails.additionalDetails?.name &&
                    certificationDetails.certificate_name === "FTTP / STP" && (
                      <Fdpform handleChange={handleChange} />
                    )}
                  {certificationDetails.additionalDetails?.name &&
                    certificationDetails.certificate_name && (
                      <PaymentDetails handleChange={handleChange} />
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
            {open && (
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity={snackType}
                  sx={{ width: "100%" }}
                >
                  {message}
                </Alert>
              </Snackbar>
            )}
          </Box>
        </div>
      </div>
    </>
  );
};

export default ReimbursementForm;
