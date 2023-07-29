import React, { createRef, useEffect, useState } from "react";
import StudentForm from "./CretificationForm/studentform";

import {
  Autocomplete,
  Box,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { submit, url, useFetch } from "../../Hooks/apiHooks";
import PaymentDetails from "./paymentDetails";
import { useRouter } from "next/router";
import axios from "axios";
import { useAtom } from "jotai";
import { snackBarAtom } from "../../store";
import { useCookies } from "react-cookie";
import InputField from "../Forms/InputFields";
import client from "../../apolloClient";

const ReimbursementForm = ({ user: userDetails }) => {
  const [, setSnackBar] = useAtom(snackBarAtom);
  const [cookie] = useCookies();
  const [certificationDetails, setCertificationDetails] = useState({});
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState({});
  const [questions, setQuestions] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const input1Ref = createRef();
  const router = useRouter();

  const {
    data: certificatesData,
    loading: loadingCertificates,
    error,
  } = useFetch(`user/certificate`);

  useEffect(() => {
    if (!loadingCertificates) {
      if (error) {
        setCertificates([]);
      } else {
        setCertificates(
          certificatesData.data.map((c) => ({
            label: c.certificate_name,
            value: c._id,
          }))
        );
      }
    }
  }, [certificatesData, loadingCertificates, error]);

  useEffect(() => {
    setUser(userDetails);
  }, [userDetails]);

  useEffect(() => {
    if (selectedCertificate._id) {
      setQuestions(() => {
        const q = selectedCertificate.questions.map((q) => {
          if (q.type === "50") {
            return {
              ...q,
              answer: [],
            };
          }
          return {
            ...q,
            answer: "",
          };
        });
        return q;
      });
    }
  }, [selectedCertificate, certificatesData]);

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
    if (validateForm() === false) {
      setLoading(false);
      return;
    }
    // check if account number is valid
    if (
      certificationDetails.bankDetails.accountNumber.length <= 15 &&
      certificationDetails.bankDetails.accountNumber.length >= 10
    ) {
      setSnackBar({
        open: true,
        type: "error",
        message: "Account number should be 10-15 digits",
      });
      setLoading(false);
      return;
    }
    if (certificationDetails.bankDetails.IFSCode.length !== 11) {
      setSnackBar({
        open: true,
        type: "error",
        message: "IFSC code should be 11 digits",
      });
      setLoading(false);
      return;
    }

    if (input1Ref.current.files[0]) {
      // check file size less than 1mb
      if (input1Ref.current.files[0].size > 1000000) {
        setSnackBar({
          open: true,
          type: "error",
          message: "File size should be less than 1mb",
        });
        setLoading(false);
        return;
      }
      // check file type is image or pdf only
      if (
        !input1Ref.current.files[0].type.includes("image") &&
        !input1Ref.current.files[0].type.includes("pdf")
      ) {
        setSnackBar({
          open: true,
          type: "error",
          message: "File type should be image or pdf",
        });
        setLoading(false);
        return;
      }

      const result1 = await uploadImage(input1Ref.current.files[0]);
      if (!result1?.success) {
        setSnackBar({
          open: true,
          type: "error",
          message: result1 ? result1?.message : "Something went wrong",
        });
        setLoading(false);
        return;
      }
      imageUrl1 = result1.data;
    } else {
      setLoading(false);
      return;
    }
    const body = {
      certificate_id: selectedCertificate._id,
      certificateUrl: imageUrl1,
      amountToReimburse: certificationDetails.amountToReimbursement,
      reimbursementDetails: {
        certificate_name: selectedCertificate.certificate_name,
        questions: [...questions],
      },
      bankDetails: {
        accountNumber: certificationDetails.bankDetails.accountNumber,
        IFSCode: certificationDetails.bankDetails.IFSCode,
      },
    };

    submit("user/requestReimburse", body).then((response) => {
      if (response.status === 200 || response.success) {
        setSnackBar({
          type: "success",
          message: "Successfully Applied",
          open: true,
        });
        client.resetStore();
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
  };

  const validateForm = () => {
    if (!certificationDetails.amountToReimbursement) {
      setSnackBar({
        open: true,
        type: "error",
        message: "Please enter amount to be reimbursed",
      });
      return false;
    }
    if (
      !certificationDetails.bankDetails.accountNumber ||
      !certificationDetails.bankDetails.IFSCode
    ) {
      setSnackBar({
        open: true,
        type: "error",
        message: "Please enter bank details",
      });
      return false;
    }

    return questions.every((q, idx) => {
      if (q.required) {
        if (q.type === "50") {
          if (q.answer.length === 0)
            setSnackBar({
              open: true,
              type: "error",
              message: `Please select at least one option for question ${
                idx + 1
              }`,
            });
          return q.answer.length > 0;
        }
        if (q.answer === "")
          setSnackBar({
            open: true,
            type: "error",
            message: `Please enter answer for question ${idx + 1}`,
          });
        return q.answer;
      } else return true;
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
      <div className="flex min-h-[790px] w-full my-10 items-center justify-center">
        <div className="shadow-xl h-fit m-auto sm:w-3/4 md:w-3/4 lg:w-3/5 w-full flex justify-evenly items-center rounded-md py-8 mt-10 mx-3 max-w-xl">
          <Box
            sx={{
              width: "90%",
            }}
          >
            <Typography variant="h4" mb={2}>
              Apply for Reimbursement
            </Typography>
            <Divider
              variant="fullWidth"
              sx={{
                mb: 2,
              }}
            />
            <form
              className="w-full flex flex-col justify-center items-center"
              onSubmit={handleSubmit}
            >
              <Box className="w-full">
                <Stack spacing={3}>
                  {user && (
                    <StudentForm handleChange={handleChange} user={user} />
                  )}
                  <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
                    <Autocomplete
                      name="certificate_name"
                      options={certificates}
                      value={
                        selectedCertificate._id
                          ? {
                              label: selectedCertificate.certificate_name,
                              value: selectedCertificate._id,
                            }
                          : null
                      }
                      onChange={(e, v) => {
                        if (v)
                          setSelectedCertificate(() => {
                            return certificatesData.data.filter(
                              (certificate) => {
                                return certificate._id === v.value;
                              }
                            )[0];
                          });
                        else setSelectedCertificate({});
                      }}
                      sx={{ width: "100%" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Type of Reimbursement"
                          required
                        />
                      )}
                    />
                  </Stack>
                  {/*)}*/}

                  {selectedCertificate._id &&
                    questions.map((question) => (
                      <InputField
                        key={question._id}
                        question={question}
                        setQuestions={setQuestions}
                        usedFor="reimbursement"
                      />
                    ))}

                  {selectedCertificate.certificate_name && (
                    <PaymentDetails handleChange={handleChange} />
                  )}
                  {selectedCertificate.certificate_name && (
                    <Stack direction={"column"} gap={2}>
                      <Typography variant="h8" gutterBottom>
                        Upload your Certificate / Receipt
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
                        // only accept images and pdfs
                        accept="image/*,application/pdf"
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
