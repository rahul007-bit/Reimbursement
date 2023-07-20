import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Paper,
  Popover,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import UserTable from "../../UserHome/UserTable";
import { useFetch } from "../../../Hooks/apiHooks";
import { CSVLink } from "react-csv";
import { useRouter } from "next/router";
import { Download, FilterAlt } from "@mui/icons-material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

export default function AdminTable() {
  const [initState, setState] = useState({
    status: null,
    department: null,
    certificate: null,
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [date, setDate] = useState({});
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [data, setData] = useState({});
  const [reimburseData, setReimbursementData] = useState([]);
  const router = useRouter();
  const {
    loading,
    data: fetchData,
    error,
  } = useFetch(
    `reimbursement/fullInfo?${
      initState.status ? `status=${initState.status}` : ""
    }${initState.department ? "&department=" + initState.department : ""}${
      initState.certificate ? "&certificate_id=" + initState.certificate : ""
    }${date.startDate ? "&startDate=" + date.startDate.toISOString() : ""}${
      date.endDate ? "&endDate=" + date.endDate.toISOString() : ""
    }
    `,
    [initState, date]
  );

  const {
    loading: loadingCertificate,
    data: certificateData,
    error: certificateError,
  } = useFetch("certificate/get");

  const Header = [
    "Certificate Name",
    "Applied At",
    "Applied By",
    "Department",
    "Institute Id",
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
        setReimbursementData(
          fetchData.data.map((d) => [
            d.reimbursementDetails.certificate_name,
            new Date(d.created_at).toLocaleDateString(),
            d.user[0]?.first_name,
            d.user[0]?.department,
            d.user[0]?.moodleId,
            d.amountToReimburse,
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
    setAnchorEl(null);
    setState((prev) => ({ ...prev, [e]: v ? v.value : null }));
  };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        flexDirection: "column",
      }}
      variant="outlined"
    >
      <>
        <Box sx={{ p: 2, mb: 1, width: 1 }}>
          <Stack gap={2} direction={"row"} flexWrap={"wrap"} marginBottom={2}>
            {isMobile ? (
              <Button
                variant="contained"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                startIcon={<FilterAlt />}
                aria-describedby={!!anchorEl ? "popover" : undefined}
              >
                Filter
              </Button>
            ) : (
              <>
                <Autocomplete
                  sx={{
                    width: 1 / 3,
                  }}
                  name="certificate"
                  // value={modalState.certificate}
                  loading={loadingCertificate}
                  options={
                    !loadingCertificate && certificateData
                      ? certificateData.data.map((d) => ({
                          value: d._id,
                          label: d.certificate_name,
                        }))
                      : []
                  }
                  onChange={(_, v) => handleChange("certificate", v)}
                  value={
                    !loadingCertificate &&
                    certificateData &&
                    initState.certificate
                      ? certificateData.data
                          .map((d) => ({
                            value: d._id,
                            label: d.certificate_name,
                          }))
                          .find((d) => d.value === initState.certificate)
                      : {
                          value: null,
                          label: "All",
                        }
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Select Certificate" />
                  )}
                />
                <Autocomplete
                  sx={{
                    width: 1 / 3,
                  }}
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
                  value={
                    [
                      { label: "All", value: null },
                      { value: "IT", label: "IT" },
                      { value: "CS", label: "CS" },
                      { value: "MACH", label: "MACH" },
                      { value: "CIVIL", label: "CIVIL" },
                    ].filter((d) => d.value === initState.department)[0]
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Select Department" />
                  )}
                />
                <Autocomplete
                  sx={{
                    width: 1 / 3,
                  }}
                  name="status"
                  // value={{ label: modalState.status }}
                  options={[
                    { label: "All", value: null },
                    { label: "PENDING", value: "PENDING" },
                    { label: "Approved", value: "Approved" },
                    { label: "Rejected", value: "Rejected" },
                    { label: "In Progress", value: "In Progress" },
                  ]}
                  value={
                    [
                      { label: "All", value: null },
                      { label: "PENDING", value: "PENDING" },
                      { label: "Approved", value: "Approved" },
                      { label: "Rejected", value: "Rejected" },
                      { label: "In Progress", value: "In Progress" },
                    ].filter((d) => d.value === initState.status)[0]
                  }
                  onChange={(_, v) => handleChange("status", v)}
                  renderInput={(params) => (
                    <TextField {...params} label="Status" />
                  )}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack direction={"row"} gap={2}>
                    <DatePicker
                      label="Select start Date"
                      inputFormat="MM/DD/YYYY"
                      value={date.startDate || Date.now()}
                      onChange={(newValue) => {
                        console.log(newValue.$d);
                        setDate((prev) => ({
                          ...prev,
                          startDate: newValue.$d,
                        }));
                      }}
                      renderInput={(params) => (
                        <TextField fullWidth {...params} />
                      )}
                    />
                    <DatePicker
                      label="Select end Date"
                      inputFormat="MM/DD/YYYY"
                      value={date.endDate || Date.now()}
                      onChange={(newValue) => {
                        setDate((prev) => ({ ...prev, endDate: newValue.$d }));
                      }}
                      renderInput={(params) => (
                        <TextField fullWidth {...params} />
                      )}
                    />
                  </Stack>
                </LocalizationProvider>
              </>
            )}
          </Stack>
          <CSVLink
            data={reimburseData}
            headers={Header}
            filename={`${new Date().toLocaleDateString()}-reimbursement.csv`}
          >
            <Button
              variant="contained"
              disabled={!data}
              color="error"
              endIcon={<Download />}
            >
              <Typography variant={"button"}>Export</Typography>
            </Button>
          </CSVLink>
          <Button
            onClick={handleClick}
            sx={{
              ml: 2,
            }}
            variant="outlined"
          >
            Open Request Page
          </Button>
        </Box>
        <Popover
          id="popover"
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              p: 2,
              width: "400px",
              gap: 2,
            }}
          >
            <Autocomplete
              name="certificate"
              // value={modalState.certificate}
              loading={loadingCertificate}
              options={
                !loadingCertificate && certificateData
                  ? certificateData.data.map((d) => ({
                      value: d._id,
                      label: d.certificate_name,
                    }))
                  : []
              }
              onChange={(_, v) => handleChange("certificate", v)}
              value={
                !loadingCertificate && certificateData && initState.certificate
                  ? certificateData.data
                      .map((d) => ({
                        value: d._id,
                        label: d.certificate_name,
                      }))
                      .find((d) => d.value === initState.certificate)
                  : {
                      value: null,
                      label: "All",
                    }
              }
              fullWidth
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
              fullWidth
              value={
                [
                  { label: "All", value: null },
                  { value: "IT", label: "IT" },
                  { value: "CS", label: "CS" },
                  { value: "MACH", label: "MACH" },
                  { value: "CIVIL", label: "CIVIL" },
                ].filter((d) => d.value === initState.department)[0]
              }
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
                { label: "Rejected", value: "Rejected" },
                { label: "In Progress", value: "In Progress" },
              ]}
              value={
                [
                  { label: "All", value: null },
                  { label: "PENDING", value: "PENDING" },
                  { label: "Approved", value: "Approved" },
                  { label: "Rejected", value: "Rejected" },
                  { label: "In Progress", value: "In Progress" },
                ].filter((d) => d.value === initState.status)[0]
              }
              fullWidth
              onChange={(_, v) => handleChange("status", v)}
              renderInput={(params) => <TextField {...params} label="Status" />}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack direction={"row"} gap={2}>
                <DatePicker
                  label="Select start Date"
                  inputFormat="MM/DD/YYYY"
                  value={date.startDate || Date.now()}
                  onChange={(newValue) => {
                    console.log(newValue.$d);
                    setDate((prev) => ({ ...prev, startDate: newValue.$d }));
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
                <DatePicker
                  label="Select end Date"
                  inputFormat="MM/DD/YYYY"
                  value={date.endDate || Date.now()}
                  onChange={(newValue) => {
                    setDate((prev) => ({ ...prev, endDate: newValue.$d }));
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Box>
        </Popover>

        {!loading ? (
          <UserTable data={data} user={"admin"} />
        ) : (
          <Box sx={{ display: "flex", width: 1, justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
      </>
    </Paper>
  );
}
