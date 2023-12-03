import useSecureStore from "./useSecureStore";

const Fetch = async () => {
  const { getValue } = useSecureStore();
  const token = JSON.parse(await getValue("userCredentials"));
  const headers = {
    Authorization: `Bearer ${token.authTokens.pop()}`,
    "Content-Type": "application/json charset=utf-8",
  };
  const headersMultipart = {
    Authorization: `Bearer ${token.authTokens.pop()}`,
    "Content-Type": "multipart/form-data",
  };
  const GET = async (route) => {
    try {
      const response = await fetch(
        `https://social-gather-production.up.railway.app/${route}`,
        { method: "GET", headers }
      );
      console.log(response.ok);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const data = await response.json();
        return null;
      }
    } catch (error) {
      console.log("error", error);
      return null;
    }
  };
  const POST = async (route, body) => {
    try {
      const response = await fetch(
        `https://social-gather-production.up.railway.app/${route}`,
        { method: "POST", headers, body: JSON.stringify(body) }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };
  const PUT = async (route, formdata) => {
    try {
      const response = await fetch(
        `https://social-gather-production.up.railway.app/${route}`,
        { method: "PUT", headers: headersMultipart, body: formdata }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const data = await response.json();
        return null;
      }
    } catch (error) {
      return null;
    }
  };
  const DELETE = async () => {
    try {
      const response = await fetch(
        `https://social-gather-production.up.railway.app/${route}`,
        { method: "DELETE", headers }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  return {
    GET,
    POST,
    PUT,
    DELETE,
  };
};

export default Fetch;
