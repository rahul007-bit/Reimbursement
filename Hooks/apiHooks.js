import { useEffect, useMemo, useReducer, useState } from "react";
import { useRouter } from "next/router";
import { Cookies, useCookies } from "react-cookie";
import { snackBarAtom } from "../store";
import { useAtom } from "jotai";
// // export const url = "https://server.reimbursements.live/api/"; //https://reimbursementserver.herokuapp.com/"http://localhost:8080/api/";
// export const url = "http://localhost:8000/api/"; //https://reimbursementserver.herokuapp.com/"http://localhost:8080/api/";

export const url = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
  loading: true,
  error: undefined,
  data: undefined,
};

function apiReducer(state, action) {
  switch (action.type) {
    case "DATA_FETCH_START":
      return { ...state, loading: true };
    case "DATA_FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "DATA_FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: undefined,
      };
    default:
      return state;
  }
}

///use Effect, fetch GET
export function useFetch(endpoint, initialData = [], fullUrl = false) {
  // const history = useHistory();
  let u = fullUrl ? endpoint : url + endpoint;

  const [data, dispatch] = useReducer(apiReducer, initialState);
  const [cookies] = useCookies();

  const [_, setSnackBar] = useAtom(snackBarAtom);
  const router = useRouter();

  useEffect(() => {
    const token = cookies.auth_token;
    const controller = new AbortController();
    dispatch({ type: "DATA_FETCH_START" });
    url &&
      fetch(u, {
        signal: controller.signal,
        method: "GET",
        headers: new Headers({
          "x-auth-token": token,
          "Content-Type": "application/json",
        }),
        // mode: "no-cors",
      })
        .then(async (response) => {
          if (!response.ok) {
            const error = await response.json();
            if (
              error.status === 401 &&
              router.pathname !== "/login" &&
              router.pathname !== "/signup"
            ) {
              router.push("/logout");
              setSnackBar({
                open: true,
                type: "error",
                message: error.message ? error.message : "Unauthorized",
              });
            }

            throw {
              status: response.status,
              error: parseError(error),
            };
          }
          return response.json();
        })
        .then((json) => {
          dispatch({ type: "DATA_FETCH_SUCCESS", payload: json });
        })
        .catch((error) => {
          dispatch({ type: "DATA_FETCH_FAILURE", payload: error });
        });
    return () => {
      controller.abort();
    };
  }, initialData);

  return data;
}

//POST,PUT,
export async function submit(endpoint, body, type = "POST", isFile = false) {
  return fetch("/api/submit", {
    method: "POST",
    body: JSON.stringify({
      endpoint: endpoint,
      body: body,
      type: type,
    }),
  })
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => {
      throw error;
    });
}

export const useUserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [, setSnackBar] = useAtom(snackBarAtom);

  useEffect(() => {
    const controller = new AbortController();
    const session = sessionStorage.getItem("user");
    let user = null;
    if (!!session && session !== "undefined") {
      user = JSON.parse(session);
    }
    if (user) {
      setUserData(user);
      setLoading(false);
    } else
      fetch("/api/details", { signal: controller.signal })
        .then((response) => response.json())
        .then((result) => {
          setError(
            result.status === 200
              ? false
              : {
                  status: result.status,
                  message: result.message,
                }
          );
          if (
            result.status === 401 &&
            (router.pathname !== "/login" || router.pathname !== "/signup")
          ) {
            setSnackBar({
              open: true,
              message: result.message,
              type: "error",
            });

            router.push("/logout");
            return;
          }
          sessionStorage.setItem("user", JSON.stringify(result.data));
          setUserData(result.data);
        })
        .catch((err) => {
          console.error(err);
          setError({
            status: 400,
            message: "Oops! Something went wrong",
          });
        })
        .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);
  return {
    loading: loading,
    userData: userData,
    error: error,
  };
};

function parseError(str) {
  try {
    const json = JSON.parse(str);
    return json.message;
  } catch (e) {
    return str || "Oops! Something went wrong";
  }
}
