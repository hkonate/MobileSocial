import { setItemAsync } from "expo-secure-store";
import {
  LoginFailure,
  LoginStart,
  LoginSucceed,
} from "../../Context/AuthContext/AuthActions";

export const handleSubmit = async (email, password, dispatch) => {
  try {
    dispatch(LoginStart());
    if (
      !email ||
      !password ||
      email.trim().length === 0 ||
      password.trim().length === 0
    ) {
      dispatch(LoginFailure());
      return "error_1";
    }
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if (
      email.match(regexEmail) === null ||
      password.match(regexPassword) === null
    ) {
      dispatch(LoginFailure());
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
    if (response.ok) {
      const userCredentials = await response.json();
      dispatch(LoginSucceed(userCredentials));
      await setItemAsync("userCredentials", JSON.stringify(userCredentials));
      return null;
    } else {
      await response.json();
      dispatch(LoginFailure());
      return "error_3";
    }
  } catch (error) {
    dispatch(LoginFailure());
    return "error_3";
  }
};
