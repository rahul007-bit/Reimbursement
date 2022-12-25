import { useEffect, useMemo, useReducer, useState } from "react";
import { useRouter } from "next/router";
import { Cookies, useCookies } from "react-cookie";
// export const url = "https://quiet-thicket-18761.herokuapp.com/api/"; //https://reimbursementserver.herokuapp.com/"http://localhost:8080/api/";
export const url = "http://localhost:8000/api/"; //https://reimbursementserver.herokuapp.com/"http://localhost:8080/api/";

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
  useEffect(() => {
    const controller = new AbortController();
    const session = sessionStorage.getItem("user");
    const user = !!session ? JSON.parse(session) : session;
    if (user) {
      setUserData(user);
      setLoading(false);
    } else
      fetch("/api/details", { signal: controller.signal })
        .then((response) => response.json())
        .then((result) => {
          setError(result.status === 200 ? false : result.status);
          sessionStorage.setItem("user", JSON.stringify(result.data));
          setUserData(result.data);
        })
        .catch(() => {
          setError(500);
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
