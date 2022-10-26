import { url } from "../../Hooks/apiHooks";

export default async function submit(req, res) {
  const token = req.cookies.auth_token;
  const { endpoint, body, type = "POST" } = JSON.parse(req.body);
  const u = url + endpoint;
  const header = new Headers();
  header.append("x-auth-token", token);
  header.append("Content-Type", "application/json");

  const requestOptions = {
    method: type,
    headers: header,
    body: JSON.stringify(body),
  };
  const response = await (await fetch(u, requestOptions)).json();
  return res.json(response);
}
