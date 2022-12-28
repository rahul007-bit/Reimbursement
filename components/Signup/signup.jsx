import React, { useState } from "react";
import { useRouter } from "next/router";

import { Box, Container, Paper, Typography } from "@mui/material";
import { submit } from "../../Hooks/apiHooks";
import { useAtom } from "jotai";
import { snackBarAtom } from "../../store";
import UserForm from "../Forms/UserForm";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    moodleId: "",
    email: "",
    password: "",
    department: "",
    type: "student",
  });
  const router = useRouter();
  const [, setSnackBar] = useAtom(snackBarAtom);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);

    // validation here
    if (
      form.moodleId === "" ||
      form.password === "" ||
      form.firstName === "" ||
      form.lastName === "" ||
      form.email === "" ||
      form.type === "" ||
      form.department === ""
    ) {
      setSnackBar({
        type: "error",
        message: "Please fill all the required fields",
        open: true,
      });
      setLoading(false);
      return;
    }

    submit("user/sign_up", {
      user: body,
    })
      .then((response) => {
        if (response.success || response.status === 200) {
          setSnackBar({
            open: true,
            type: "success",
            message: response.message,
          });
          return router.push("/login");
        } else if (response.validation) {
          setSnackBar({
            open: true,
            type: "error",
            message: response.validation.body.message,
          });
        } else {
          setSnackBar({
            open: true,
            type: "error",
            message: response.message,
          });
        }
      })
      .catch((error) => {
        setSnackBar({
          type: "error",
          message: error.message ? error.message : "Oops! Something went wrong",
          open: true,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Paper sx={{ p: 3, py: 4, mt: 8, mx: 1 }} variant={"outlined"}>
        <Box>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h4">
                Sign up
              </Typography>
              <UserForm
                loading={loading}
                onSubmit={handleSubmit}
                usedFor={"signUp"}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                formData={form}
              />
            </Box>
          </Container>
        </Box>
      </Paper>
    </div>
  );
}
