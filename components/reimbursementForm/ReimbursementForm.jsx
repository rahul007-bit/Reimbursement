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
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { submit, url } from "../../Hooks/apiHooks";
import PaymentDetails from "./paymentDetails";
import { useRouter } from "next/router";
import axios from "axios";
import { useAtom } from "jotai";
import { snackBarAtom } from "../../store";
import { useCookies } from "react-cookie";

const ReimbursementForm = ({ user: userDetails }) => {
  const [, setSnackBar] = useAtom(snackBarAtom);
  const [cookie] = useCookies();
  const [certificationDetails, setCertificationDetails] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const input1Ref = createRef();
  const input2Ref = createRef();

  const router = useRouter();

  useEffect(() => {
    setUser(userDetails);
  }, [userDetails]);

  async function uploadImage(file) {
    const form = new FormData();
    form.append("file", file);
    try {
      const response = await axios({
        method: "POST",
        url: url + "user/upload/file",
        data: form,
        headers: {
          "x-auth-token": cookie.auth_token,
          "Content-Type": "form-data",
        },
      });
      console.log(response);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let imageUrl1 = "";

    if (input1Ref.current.files[0]) {
      const result1 = await uploadImage(input1Ref.current.files[0]);
      if (!result1.success) {
        setSnackBar({ open: true, type: "error", message: result1.message });
        setLoading(false);

        return;
      }
      imageUrl1 = result1.data;
    } else {
      setLoading(false);
      return;
    }
    console.log(imageUrl1);
    const body = {
      ...certificationDetails,
      // recipientUrl: imageUrl2,
      certificateUrl: imageUrl1,
    };
    body.additionalDetails.first_name = user.user.first_name;
    body.additionalDetails.email = user.user.email;
    body.department = user.user.department;
    submit("user/requestReimburse", body).then((response) => {
      if (response.status === 200 || response.success) {
        setSnackBar({
          type: "success",
          message: "Successfully Applied",
          open: true,
        });
        router.push("/");
      } else if (response.status === 400 || response.validation?.body) {
        setSnackBar({
          type: "error",
          message: response.validation.body.message,
          open: true,
        });
      } else {
        setSnackBar({
          type: "error",
          message: response.message,
          open: true,
        });
      }
      setLoading(false);
    });
    // console.log(certificationDetails);
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
      <div className="flex h-full w-full mt-10 items-center justify-center">
        <div className="shadow-xl h-fit m-auto sm:w-3/4 md:w-3/4 lg:w-3/5 w-full flex justify-evenly items-center rounded-md py-8 mt-10 mx-3 max-w-xl">
          <Box
            sx={{
              width: "90%",
            }}
          >
            <Typography variant="h4" mb={2}>
              Apply for Reimbursement
            </Typography>
            <Divider variant="fullWidth" className="mb-4" />
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
                  {user && (
                    <StudentForm handleChange={handleChange} user={user} />
                  )}
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
                    <Stack direction={"column"} gap={2}>
                      <Typography variant="h8" gutterBottom>
                        Upload your Certificate
                      </Typography>
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
          </Box>
        </div>
      </div>
    </>
  );
};

export default ReimbursementForm;
