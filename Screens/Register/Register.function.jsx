import {
  RequestFailure,
  RequestStart,
  RequestSucceed,
} from "../../Context/RequestContext/RequestActions";
import { setItemAsync } from "expo-secure-store";

export const handleRegister = async (userCredential, dispatch) => {
  dispatch(RequestStart());
  const { firstname, lastname, pseudo, email, pwd, confirmPwd } =
    userCredential;
  //Empty input
  if(JSON.stringify(userCredential) === "{}") {
    dispatch(RequestFailure());
      return "error_1";
  }
  for (const key in userCredential) {
    if (!userCredential[key] || userCredential[key].trim().length === 0) {
      dispatch(RequestFailure());
      return "error_1";
    }
  }
  //Wrong format
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
  if (
    !email.match(regexEmail) ||
    !confirmPwd.match(regexPassword) ||
    !pwd.match(regexPassword)
  ) {
    dispatch(RequestFailure());
    return "error_2";
  }
  //Password not the same
  if (pwd.trim().length !== confirmPwd.trim().length) {
    dispatch(RequestFailure());
    return "error_3";
  }
  for (let i = 0; i < pwd.length; i++) {
    if (pwd[i] !== confirmPwd[i]) {
      dispatch(RequestFailure());
      return "error_3";
    }
  }
  try {
    //resquest register
    const response = await fetch(
      "https://social-gather-production.up.railway.app/auth/signup",
      {
        method: "POST",
        body: JSON.stringify({
          firstname,
          lastname,
          pseudo,
          email,
          password: pwd,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    //register succeed
    if (response.ok) {
      const userCredentials = await response.json();
      dispatch(RequestSucceed(userCredentials));
      await setItemAsync("userCredentials", JSON.stringify(userCredentials));
      return userCredentials;
    } else {
      //register failed
      const err = await response.json();
      dispatch(RequestFailure());
      return "error_4";
    }
    //return error

    //catch
  } catch (error) {
    dispatch(RequestFailure());
    return "error_4";
  }
  //return error
};
