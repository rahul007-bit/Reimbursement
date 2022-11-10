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
import { CSVLink } from "react-csv";
import { useRouter } from "next/router";

export default function AdminTable() {
  const [initState, setState] = useState({
    status: null,
    department: null,
    certificate: null,
  });

  const [data, setData] = useState({});
  const [userData, setUserData] = useState([]);
  const router = useRouter();
  const {
    loading,
    data: fetchData,
    error,
  } = useFetch(
    `/reimbursement/fullInfo?${
      initState.status ? `status=${initState.status}` : ""
    }${initState.department ? "&department=" + initState.department : ""}${
      initState.certificate ? "&certificate_name=" + initState.certificate : ""
    }`,
    [initState]
  );

  const Header = [
    "Certificate Name",
    "Applied At",
    "Applied By",
    "Moodle Id",
    "Amount",
    "Status",
    "Account Number",
    "IFSCode",
  ];

  useEffect(() => {
    if (!loading && fetchData) {
      if (error) {
        setData(null);
      } else if (fetchData.status === 200) {
        setData(fetchData);
        setUserData(
          fetchData.data.map((d) => [
            d.certificate_name,
            new Date(d.created_at).toLocaleDateString(),
            d.user[0]?.first_name,
            d.user[0]?.moodleId,
            d.amountToReimbursement,
            d.status,
            d.bankDetails.accountNumber,
            d.bankDetails.IFSCode,
          ])
        );
      }
    }
  }, [loading, fetchData, error]);
  const handleClick = () => {
    router.replace("/admin/view_request");
  };

  const handleChange = (e, v) => {
    setState((prev) => ({ ...prev, [e]: v ? v.value : null }));
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
      <>
        <Typography variant="h5" margin={1}>
          Reimbursement Requests
        </Typography>
        <Stack gap={1} direction={"row"}>
          <Button onClick={handleClick} variant="contained">
            Open Request Page
          </Button>
          {/* <Button
              variant="contained"
              color="secondary"
              onClick={() => setOpenModal(true)}
            >
              Customize result
            </Button> */}

          <CSVLink
            data={userData}
            headers={Header}
            filename={`${Date()}-student`}
          >
            <Button variant={"contained"} disabled={!data}>
              <Typography variant={"button"}>Export </Typography>
            </Button>
          </CSVLink>
        </Stack>
        <Box sx={{ maxWidth: "550px", m: 3, width: 1 }}>
          <Stack gap={3} direction={"row"} width={1}>
            <Autocomplete
              name="certificate"
              // value={modalState.certificate}
              options={[
                { label: "All", value: null },
                { label: "NPTEL", value: "NPTEL" },
                {
                  label: "Global Certification",
                  value: "Global Certification",
                },
                { label: "Paper Publication", value: "Paper Publication" },
                { label: "FTTP / STP", value: "FTTP / STP" },
              ]}
              onChange={(_, v) => handleChange("certificate", v)}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Select Certificate" />
              )}
            />
            <Autocomplete
              name="department"
              // value={modalState.department}
              options={[
                { label: "All", value: null },
                { value: "IT", label: "IT" },
                { value: "CS", label: "CS" },
                { value: "MACH", label: "MACH" },
                { value: "CIVIL", label: "CIVIL" },
              ]}
              onChange={(_, v) => handleChange("department", v)}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Select Department" />
              )}
            />
            <Autocomplete
              name="status"
              // value={{ label: modalState.status }}
              options={[
                { label: "All", value: null },
                { label: "PENDING", value: "PENDING" },
                { label: "Approved", value: "Approved" },
              ]}
              onChange={(_, v) => handleChange("status", v)}
              sx={{ width: "100%" }}
              renderInput={(params) => <TextField {...params} label="Status" />}
            />
          </Stack>
        </Box>
        {!loading ? (
          <UserTable data={data} user={"admin"} />
        ) : (
          <Box sx={{ display: "flex", width: 1, justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
      </>
    </Box>
  );
}
