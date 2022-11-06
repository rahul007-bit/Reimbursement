import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import UserTable from "../../UserHome/UserTable";
import { useFetch } from "../../../Hooks/apiHooks";
import { LoadingButton } from "@mui/lab";

export default function AdminTable() {
  const [initState, setState] = useState({
    status: "PENDING",
    department: null,
    certificate: null,
  });

  const [openModal, setOpenModal] = useState(false);
  const [modalState, setModalState] = useState(initState);
  const [data, setData] = useState({});
  const {
    loading,
    data: fetchData,
    error,
  } = useFetch(
    `/reimbursement/fullInfo?status=${initState.status}${
      initState.department ? "&department=" + initState.department : ""
    }${
      initState.certificate ? "&certificate_name=" + initState.certificate : ""
    }`,
    [initState]
  );
  useEffect(() => {
    if (!loading && fetchData) {
      console.log(error);
      if (error) {
        setData(null);
      } else if (fetchData.status === 200) {
        setData(fetchData);
      }
    }
  }, [loading, fetchData, error]);
  const handleClick = () => {
    // if (usedIn === "admin") {
    router.replace("/admin/view_request");
    // }
  };

  const handleChange = (e, v) => {
    setModalState((prev) => ({ ...prev, [e]: v ? v.label : null }));
  };

  const submitChange = () => {
    setState(modalState);
    setOpenModal(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mx: {
          sm: 2,
          md: 4,
          lg: 8,
        },
        my: 8,
        flexDirection: "column",
      }}
    >
      {!loading ? (
        <>
          <Typography variant="h5" margin={1}>
            Reimbursement Requests
          </Typography>
          <Stack gap={1} direction={"row"}>
            <Button onClick={handleClick} sx={{ m: 1.5 }} variant="contained">
              Open Request Page
            </Button>
            <Button
              sx={{ m: 1.5 }}
              variant="contained"
              color="secondary"
              onClick={() => setOpenModal(true)}
            >
              Customize result
            </Button>
          </Stack>

          <UserTable data={data} user={"admin"} />

          {/* Dialog  */}
          <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            onClose={() => setOpenModal(false)}
            open={openModal}
            scroll={"paper"}
          >
            {/*{openModal && (*/}
            <DialogTitle>Reimbursement details</DialogTitle>
            <DialogContent dividers>
              {/* <Divider variant={"fullWidth"} sx={{ mb: 3 }} /> */}
              <Stack gap={3}>
                <Autocomplete
                  name="certificate"
                  id="combo-box-demo"
                  // value={modalState.certificate}
                  options={[
                    { label: "NPTEL" },
                    { label: "Global Certification" },
                    { label: "Paper Publication" },
                    { label: "FTTP / STP" },
                  ]}
                  onChange={(_, v) => handleChange("certificate", v)}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Certificate" />
                  )}
                />
                <Autocomplete
                  name="department"
                  id="combo-box-demo"
                  // value={modalState.department}
                  options={[
                    { label: "IT" },
                    { label: "CS" },
                    { label: "MACH" },
                    { label: "CIVIL" },
                  ]}
                  onChange={(_, v) => handleChange("department", v)}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Department" />
                  )}
                />
                <Autocomplete
                  name="status"
                  id="combo-box-demo"
                  // value={{ label: modalState.status }}
                  options={[{ label: "PENDING" }, { label: "Approved" }]}
                  onChange={(_, v) => handleChange("status", v)}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Status" />
                  )}
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenModal(false)}>Close</Button>
              <Button
                sx={{ m: 2 }}
                variant={"contained"}
                onClick={submitChange}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
}
