import { url } from "../../Hooks/apiHooks";

export default async function submit(req, res) {
  try {
    const token = req.cookies.auth_token;
    const reqBody = JSON.parse(req.body);
    const { endpoint, body, type = "POST" } = reqBody;
    const u = url + endpoint;
    const header = new Headers();
    header.append("x-auth-token", token);
    header.append("Content-Type", "application/json");
    const requestOptions = {
      method: type,
      headers: header,
    };
    if (type !== "GET") {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await (await fetch(u, requestOptions)).json();

    return res.json(response);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
}
