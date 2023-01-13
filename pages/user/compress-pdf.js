import { LoadingButton } from "@mui/lab";
import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Layout from "../../components/Layout";
import { url, useUserProfile } from "../../Hooks/apiHooks";
import { snackBarAtom } from "../../store";

const CompressPdf = () => {
  const { error, loading, userData } = useUserProfile();
  const [loadingButton, setLoading] = useState(false);
  const [, setSnackBar] = useAtom(snackBarAtom);
  const [cookie] = useCookies();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(event.target);
      const response = await axios({
        method: "POST",
        url: url + "file/compress",
        data: formData,
        responseType: "blob",
        headers: {
          "x-auth-token": cookie.auth_token,
          "Content-Type": "form-data",
        },
      });
      console.log(response.data);
      const href = URL.createObjectURL(response.data);
      window.open(href);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSnackBar({
        open: true,
        message: "failed To Compress your file ",
        type: "error",
      });
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", width: 1, justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Layout userData={userData} title="Compress PDF">
      <div className="flex h-full w-full mt-10 items-center justify-center">
        <div className="shadow-xl h-fit m-auto sm:w-3/4 lg:w-2/5 md:3/5 w-full flex justify-evenly items-center rounded-md py-8 mt-10 mx-3">
          <Box
            sx={{
              width: "90%",
            }}
          >
            <Typography variant="h4" mb={2}>
              Compress Your PDF
            </Typography>
            <Divider variant="fullWidth" className="mb-4" />
            <form onSubmit={handleSubmit}>
              <Stack direction={"column"} spacing={2}>
                <Typography variant="h8" gutterBottom>
                  Select your Certificate
                </Typography>
                <input
                  type="file"
                  name="file"
                  className="block w-full text-sm text-slate-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-violet-50 file:text-violet-700
                      hover:file:bg-violet-100
                    "
                  accept=".pdf"
                  required={true}
                />
                <LoadingButton
                  loading={loadingButton}
                  variant="contained"
                  type="submit"
                >
                  Compress
                </LoadingButton>
              </Stack>
            </form>
          </Box>
        </div>
      </div>
    </Layout>
  );
};

export default CompressPdf;
