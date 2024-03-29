import { useEffect, useMemo, useReducer, useState } from "react";
import { useRouter } from "next/router";
import { Cookies, useCookies } from "react-cookie";
import { snackBarAtom } from "../store";
import { useAtom } from "jotai";
import useSWR from "swr";
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

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const fetcherWithToken = ([url, token]) => {
  return fetch(url, {
    headers: new Headers({
      "x-auth-token": token,
      "Content-Type": "application/json",
    }),
  }).then((res) => res.json());
};
///use Effect, fetch GET
export function useFetch(endpoint, initialData = [], fullUrl = false) {
  // const history = useHistory();
  let u = fullUrl ? endpoint : url + endpoint;
  const [cookies] = useCookies();
  const token = cookies.auth_token;
  const { data, error, isLoading } = useSWR([u, token], fetcherWithToken, {
    revalidateOnReconnect: true,
  });

  return {
    data,
    error: error,
    loading: isLoading,
  };
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
