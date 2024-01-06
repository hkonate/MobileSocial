import { setItemAsync } from "expo-secure-store";
import {
  RequestFailure,
  RequestStart,
  RequestSucceed,
} from "../../Context/RequestContext/RequestActions";

export const handleSubmit = async (email, password, dispatch) => {
  try {
    dispatch(RequestStart());
    if (
      !email ||
      !password ||
      email.trim().length === 0 ||
      password.trim().length === 0
    ) {
      dispatch(RequestFailure());
      return "error_1";
    }
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if (
      email.match(regexEmail) === null ||
      password.match(regexPassword) === null
    ) {
      dispatch(RequestFailure());
      return "error_2";
    }
    const response = await fetch(
      "https://social-gather-production.up.railway.app/auth/signin",
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const userCredentials = await response.json();
    if (response.ok) {
      dispatch(RequestSucceed(userCredentials));
      await setItemAsync("userCredentials", JSON.stringify(userCredentials));
      return userCredentials;
    } else {
      dispatch(RequestFailure());
      return "error_3";
    }
  } catch (error) {
    dispatch(RequestFailure());
    return "error_3";
  }
};
