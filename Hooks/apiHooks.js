import { useEffect, useMemo, useReducer, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

// export const url = "https://reimbursementserver.herokuapp.com/api/"; //https://reimbursementserver.herokuapp.com/"http://localhost:8080/api/";
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
      return { ...state, loading: false, data: action.payload };
    default:
      return state;
  }
}

///use Effect, fetch GET
export function useFetch(endpoint, initialData = [], fullUrl = false) {
  // const history = useHistory();
  let u = fullUrl ? endpoint : url + endpoint;
  const token = localStorage.getItem("auth-token");
  const [data, dispatch] = useReducer(apiReducer, initialState);
  useEffect(() => {
    dispatch({ type: "DATA_FETCH_START" });
    url &&
      fetch(u, {
        method: "GET",
        headers: new Headers({
          "x-auth-token": token,
          "Content-Type": "application/json",
        }),
        // mode: "no-cors",
      })
        .then(async (response) => {
          if (!response.ok) {
            const error = await response.text();
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
  }, initialData);

  return data;
}

//POST,PUT,
export async function submit(endpoint, body, type = "POST") {
  const token = localStorage.getItem("auth-token");
  const u = url + endpoint;

  const header = new Headers();
  header.append("x-auth-token", token);
  header.append("Content-Type", "application/json");

  const requestOptions = {
    method: type,
    headers: header,
    body: JSON.stringify(body),
  };

  return fetch(u, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => {
      throw error;
    });
}

export const useUserProfile = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const controller = new AbortController();
    setUserData(JSON.parse(sessionStorage.getItem("user")));
    if (!token) {
      setLoading(false);
      setUserLoggedIn(false);
    } else if (!userData) {
      const header = new Headers();
      header.append("x-auth-token", token);
      header.append("Content-Type", "application/json");
      setLoading(true);

      const requestOptions = {
        method: "GET",
        headers: header,
        signal: controller.signal,
      };
      fetch(url + `details`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === 200) {
            console.log(result);
            setUserData(result.data);
            sessionStorage.setItem("user", JSON.stringify(result.data));
            setUserLoggedIn(true);
          } else if (result.status === 401) {
            localStorage.removeItem("auth-token");
            sessionStorage.clear();
            router.push("/login");
            setUserLoggedIn(false);
          } else {
            setUserLoggedIn(false);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setUserLoggedIn(true);
    }
    return () => {
      controller.abort();
    };
  }, [token]);
  return {
    loading: loading,
    userLoggedIn: userLoggedIn,
    token: token,
    userData: userData,
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
