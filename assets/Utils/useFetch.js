import useSecureStore from "./useSecureStore";

const Fetch = async () => {
  const { getValue } = useSecureStore();
  const token = JSON.parse(await getValue("userCredentials"));
  const api = "https://social-gather-production.up.railway.app/"
  const headers = {
    Authorization: `Bearer ${token.authTokens[token.authTokens.length - 1]}`,
    "Content-Type": "application/json charset=utf-8",
  };
  const headersMultipart = {
    Authorization: `Bearer ${token.authTokens[token.authTokens.length - 1]}`,
    "Content-Type": "multipart/form-data",
  };
  const GET = async (route) => {
    try {
      const response = await fetch(
        `${api}${route}`,
        { method: "GET", headers }
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

  const POSTMEDIA = async (route, formdata) => {
    try {
      const response = await fetch(
        `${api}${route}`,
        { method: "POST", headers: headersMultipart, body: formdata }
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

  const POST = async (route, body) => {
    try {
      const response = await fetch(
        `${api}${route}`,
        { method: "POST", headers, body: JSON.stringify(body) }
      );
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const PUTMEDIA = async (route, formdata) => {
    try {
      const response = await fetch(
        `${api}${route}`,
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

  const PUT = async (route, body) => {
    try {
      const response = await fetch(
        `${api}${route}`,
        { method: "PUT", headers, body }
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

  const DELETE = async (route) => {
    try {
      const response = await fetch(
        `${api}${route}`,
        { method: "DELETE", headers }
      );
      const data = await response.json();
      if (response.ok) {
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
    POSTMEDIA,
    PUT,
    PUTMEDIA,
    DELETE,
  };
};

export default Fetch;
