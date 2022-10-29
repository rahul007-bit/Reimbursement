import { url } from "../../Hooks/apiHooks";
import { Cookies } from "react-cookie";

export default async function details(req, res) {
  const cookies = new Cookies(req, res);
  if (req.method === "GET") {
    const token = req.cookies.auth_token;
    const type = req.cookies.loginType;
    // return res.status(200).json({ token: token, type: type });
    const header = new Headers();
    header.append("x-auth-token", token);
    header.append("Content-Type", "application/json");
    const requestOptions = {
      method: "GET",
      headers: header,
    };
    try {
      const response = await (
        await fetch(url + `details`, requestOptions)
      ).json();
      if (response.stat === 200 || response.success) {
        return res.status(200).json({
          data: response.data,
        });
      }
      if (response.status === 401) {
        res.writeHead(302, { Location: "/logout" });
        return res.end();
      }
    } catch (e) {
      return res.status(500).json({
        error: "Server is not live",
      });
    }
  }
}
