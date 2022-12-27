import React, { useEffect } from "react";
import AdminDashboard from "../../components/Admin";
import { useUserProfile } from "../../Hooks/apiHooks";
import { Box, CircularProgress } from "@mui/material";
import Layout from "../../components/Layout";
import { gql } from "@apollo/client";
import client from "../../apolloClient";

const AdminHome = ({
  getReimbursementsStatusCount,
  getReimbursementsDepartmentWise,
  certificateStatusCount,
}) => {
  const { loading, userData } = useUserProfile();
  const [statusData, setStatusData] = React.useState([]);
  const [status, setStatus] = React.useState([]);

  const [departmentData, setDepartmentData] = React.useState([]);
  const [department, setDepartment] = React.useState([]);
  useEffect(() => {
    if (getReimbursementsStatusCount) {
      const sortByStatus = getReimbursementsStatusCount.map((item) => {
        const count = item.certificate_name.reduce((acc, curr) => {
          // each certificate name has a key name

          if (typeof acc[curr.name] == "undefined") {
            acc[curr.name] = 1;
          } else {
            acc[curr.name] += 1;
          }
          return acc;
        }, {});

        const data = Object.keys(count).map((key) => {
          return {
            name: key,
            data: [count[key]],
          };
        });
        return {
          name: item.status,
          data,
        };
      });

      let series = [];

      certificateStatusCount?.forEach((item) => {
        series.push({
          name: item.certificate_name,
          data: [],
        });
      });

      sortByStatus.forEach((item, pass) => {
        const status = item.name;
        certificateStatusCount?.forEach((item, idx) => {
          let count = 0;
          item.status.forEach((childStatus) => {
            if (childStatus.status === status) {
              count += 1;
            }
          });
          series[idx].data.push(count);
        });
      });
      setStatus(sortByStatus);
      setStatusData(series);
    }
  }, [getReimbursementsStatusCount, certificateStatusCount]);

  useEffect(() => {
    if (getReimbursementsDepartmentWise) {
      const sortByDepartment = getReimbursementsDepartmentWise.map((item) => {
        const count = item.certificate_name.reduce((acc, curr) => {
          // each certificate name has a key name

          if (typeof acc[curr.name] == "undefined") {
            acc[curr.name] = 1;
          } else {
            acc[curr.name] += 1;
          }
          return acc;
        }, {});

        const data = Object.keys(count).map((key) => {
          return {
            name: key,
            data: [count[key]],
          };
        });
        return {
          name: item.department,
          data,
        };
      });
      let series = [];
      sortByDepartment.forEach((item, pass) => {
        item.data.forEach((item) => {
          if (series.length === 0) {
            series.push(item);
          } else {
            const index = series.findIndex((i) => i.name === item.name);
            if (index === -1) {
              if (pass === 0) {
                series.push({
                  name: item.name,
                  data: [item.data.reduce((a, b) => a + b, 0)],
                });
              } else {
                series.push({
                  name: item.name,
                  data: [
                    ...Array.from({ length: pass }, () => 0),
                    item.data.reduce((a, b) => a + b, 0),
                  ],
                });
              }
            } else {
              series[index].data.push(item.data.reduce((a, b) => a + b, 0));
            }
          }
        });
      });

      setDepartment(sortByDepartment);
      setDepartmentData(series);
    }
  }, [getReimbursementsDepartmentWise]);

  if (loading)
    return (
      <Box sx={{ display: "flex", width: 1, justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );

  // if (error) return <Error statusCode={error} />;

  return (
    <Layout userData={userData}>
      <AdminDashboard
        statusCount={statusData}
        status={status}
        departmentCount={departmentData}
        department={department}
      />
    </Layout>
  );
};

// export async function getServerSideProps() {
//   try {
//     const {
//       data: {
//         getReimbursementsStatusCount: { data: getReimbursementsStatusCount },
//       },
//     } = await client.query({
//       query: gql`
//         query GetReimbursementsStatusCount {
//           getReimbursementsStatusCount {
//             status
//             message
//             success
//             data {
//               count
//               status
//               certificate_name {
//                 name
//                 id
//               }
//             }
//           }
//         }
//       `,
//     });

//     const {
//       data: {
//         getReimbursementsDepartmentWise: { data: departmentWiseData },
//       },
//     } = await client.query({
//       query: gql`
//         query GetReimbursementsDepartmentWise {
//           getReimbursementsDepartmentWise {
//             status
//             message
//             success
//             data {
//               count
//               department
//               certificate_name {
//                 name
//                 id
//               }
//             }
//           }
//         }
//       `,
//     });
//     const props = {};
//     console.log(departmentWiseData);
//     if (departmentWiseData) {
//       props.getReimbursementsDepartmentWise = departmentWiseData;
//     } else {
//       props.getReimbursementsDepartmentWise = [];
//     }

//     return {
//       props: {
//         getReimbursementsStatusCount,
//         ...props,
//       },
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       props: {
//         getReimbursementsStatusCount: [],
//         getReimbursementsDepartmentWise: [],
//       },
//     };
//   }
// }

AdminHome.getInitialProps = async () => {
  try {
    // graphql query for getReimbursementsStatusCount
    const {
      data: {
        getReimbursementsStatusCount: { data: getReimbursementsStatusCount },
      },
    } = await client.query({
      query: gql`
        query GetReimbursementsStatusCount {
          getReimbursementsStatusCount {
            status
            message
            success
            data {
              count
              status
              certificate_name {
                name
                id
              }
            }
          }
        }
      `,
    });

    // graphql query for getReimbursementsDepartmentWise

    const {
      data: {
        getReimbursementsDepartmentWise: { data: departmentWiseData },
      },
    } = await client.query({
      query: gql`
        query GetReimbursementsDepartmentWise {
          getReimbursementsDepartmentWise {
            status
            message
            success
            data {
              count
              department
              certificate_name {
                name
                id
              }
            }
          }
        }
      `,
    });
    //

    const {
      data: {
        getReimbursementsCertificateStatusCount: {
          data: certificateStatusCount,
        },
      },
    } = await client.query({
      query: gql`
        query GetReimbursementsCertificateStatusCount {
          getReimbursementsCertificateStatusCount {
            status
            message
            success
            data {
              count
              status {
                status
                id
              }
              certificate_name
            }
          }
        }
      `,
    });

    const props = {};
    console.log(getReimbursementsStatusCount);
    if (departmentWiseData) {
      props.getReimbursementsDepartmentWise = departmentWiseData;
    } else {
      props.getReimbursementsDepartmentWise = [];
    }

    if (certificateStatusCount) {
      props.certificateStatusCount = certificateStatusCount;
    } else {
      props.certificateStatusCount = [];
    }

    return {
      // props: {
      getReimbursementsStatusCount,
      ...props,
      // },
    };
  } catch (error) {
    console.log(error);
    return {
      // props: {
      getReimbursementsStatusCount: [],
      getReimbursementsDepartmentWise: [],
      certificateStatusCount: [],
      // },
    };
  }
};

export default AdminHome;
