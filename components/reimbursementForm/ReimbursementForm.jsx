import React, { createRef, useEffect, useState } from "react";
import StudentForm from "./CretificationForm/studentform";
import NptelForm from "./CretificationForm/nptelform";
import GlobalCertification from "./CretificationForm/globalcertification";
import PaperPublication from "./CretificationForm/paperpublication";
import Fdpform from "./CretificationForm/fdpform";

import {
  Autocomplete,
  Box,
  Divider,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { submit } from "../../Hooks/apiHooks";
import PaymentDetails from "./paymentDetails";
import { useRouter } from "next/router";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
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
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const input1Ref = createRef();
  const input2Ref = createRef();
  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let imageUrl1 = "";

    // let imageUrl2 = "";
    if (input1Ref.current.files[0]) {
      const result1 = await uploadImage(input1Ref.current.files[0]);
      if (!result1) {
        setSnackType("error");
        setMessage("ERROR while uploading the use Certificate");
        return;
      }
      imageUrl1 = result1;
      // const result2 = await uploadImage(input2Ref.current.files[0]);
      // if (!result2) {
      //   setSnackType("error");
      //   setMessage("ERROR while uploading the use Certificate");
      //   return;
      // }
      // imageUrl2 = result2;
    } else {
      setLoading(false);
      return;
    }
    console.log(imageUrl1);
    submit("user/requestReimburse", {
      ...certificationDetails,
      // recipientUrl: imageUrl2,
      certificateUrl: imageUrl1,
    }).then((response) => {
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
      setLoading(false);
    });
    // console.log(certificationDetails);
  };

  const uploadImage = async (image) => {
    const url = "https://alive-api.nixonbit.com/api/v1/alive/user/upload";
    const formData = new FormData();
    formData.append("image", image);
    return await axios({
      method: "POST",
      url: url,
      data: formData,
      headers: {
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpblR5cGUiOiJMT0NBTCIsImlkIjoiNjJhMmU0MzA1Mjk2YzIwYWZjYWExMGUwIiwiaWF0IjoxNjYzNTU5NjgwfQ.Afx8cH0VBd9INzMVXiDAlq12VWtWvvPc4zXxnP8qub4",
        "Content-Type": "form-data",
      },
    })
      .then((response) => {
        const result = response.data;
        return result.location;
      })
      .catch((err) => {
        console.error(err, "ERROR while posting the use post");
        return null;
      });
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
                    value={{ label: "Student" }}
                    options={[{ label: "Student" }, { label: "Teacher" }]}
                    renderInput={(params) => (
                      <TextField name="user" {...params} label="Select Role" />
                    )}
                    // onInputChange={getUserDetails}
                  />
                  {/* render when user is student */}
                  {/*{certificationDetails.additionalDetails?.name ===*/}
                  {/*  "Student" && */}
                  <StudentForm handleChange={handleChange} user={user} />
                  {/*}*/}
                  {/* render when user is stuff */}

                  {/*{certificationDetails.additionalDetails?.name ===*/}
                  {/*  "Teacher" && <StaffForm handleChange={handleChange} />}*/}

                  {/*{certificationDetails.additionalDetails?.name && (*/}
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
                  {/*)}*/}
                  {certificationDetails.certificate_name === "NPTEL" && (
                    <NptelForm handleChange={handleChange} />
                  )}
                  {certificationDetails.certificate_name ===
                    "Global Certification" && (
                    <GlobalCertification handleChange={handleChange} />
                  )}
                  {certificationDetails.certificate_name ===
                    "Paper Publication" && (
                    <PaperPublication handleChange={handleChange} />
                  )}
                  {certificationDetails.certificate_name === "FTTP / STP" && (
                    <Fdpform handleChange={handleChange} />
                  )}
                  {certificationDetails.certificate_name && (
                    <PaymentDetails handleChange={handleChange} />
                  )}
                  {certificationDetails.certificate_name && (
                    <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
                      <div className="block">
                        <label className="m-4 my-3 text-gray-700">
                          Upload your Certificate
                        </label>

                        <input
                          ref={input1Ref}
                          type="file"
                          className="block w-full text-sm text-slate-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-violet-50 file:text-violet-700
                      hover:file:bg-violet-100
                    "
                          required={true}
                        />
                      </div>
                      {/*  <div className="block">*/}
                      {/*    <label className="m-4 my-3 text-gray-700">*/}
                      {/*      Upload your recipient*/}
                      {/*    </label>*/}
                      {/*    <input*/}
                      {/*      type="file"*/}
                      {/*      ref={input2Ref}*/}
                      {/*      className="block w-full text-sm text-slate-500*/}
                      {/*  file:mr-4 file:py-2 file:px-4*/}
                      {/*  file:rounded-full file:border-0*/}
                      {/*  file:text-sm file:font-semibold*/}
                      {/*  file:bg-violet-50 file:text-violet-700*/}
                      {/*  hover:file:bg-violet-100*/}
                      {/*"*/}
                      {/*      required={true}*/}
                      {/*    />*/}
                      {/*  </div>*/}
                    </Stack>
                  )}
                  <LoadingButton
                    variant="contained"
                    loading={loading}
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
