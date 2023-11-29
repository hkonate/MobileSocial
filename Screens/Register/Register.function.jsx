import {
  LoginFailure,
  LoginStart,
  LoginSucceed,
} from "../../Context/AuthContext/AuthActions";

export const handleRegister = async (userCredential, dispatch) => {
  dispatch(LoginStart());
  const { firstname, lastname, pseudo, email, pwd, confirmPwd } =
    userCredential;
  //Empty input
  for (key in userCredential) {
    console.log(key);
    if (!userCredential[key] || userCredential[key].trim().length === 0) {
      dispatch(LoginFailure());
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
    dispatch(LoginFailure());
    return "error_2";
  }
  //Password not the same
  if (pwd.trim().length !== confirmPwd.trim().length) {
    dispatch(LoginFailure());
    return "error_3";
  }
  for (let i = 0; i < pwd.length; i++) {
    if (pwd[i] !== confirmPwd[i]) {
      dispatch(LoginFailure());
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
      dispatch(LoginSucceed());
      return null;
    } else {
      //register failed
      const err = await response.json();
      dispatch(LoginFailure());
      return "error_4";
    }
    //return error

    //catch
  } catch (error) {
    dispatch(LoginFailure());
    return "error_4";
  }
  //return error
};
