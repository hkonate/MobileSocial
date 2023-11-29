import useSecureStore from "./useSecureStore";

export const Fetch = async () => {
  const { getValue } = useSecureStore();
  const token = JSON.parse(await getValue("userCredentials")).token;
  console.log("token parsed: ", token);
  const headers = {
    Authorization: token,
    "Content-type": "application/json; charset=UTF-8",
  };
  const GET = async (route) => {
    try {
      const response = await fetch(
        `https://social-gather-production.up.railway.app/${route}`,
        { method: "GET", headers }
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
  const PUT = async (route, body) => {
    try {
      const response = await fetch(
        `https://social-gather-production.up.railway.app/${route}`,
        { method: "PUT", headers, body: JSON.stringify(body) }
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
