export const onBoarding = () => ({
  type: "ONBOARDING_SEEN",
});
export const SetUser = (userCredentials) => ({
  type: "SET_USER",
  payload: userCredentials,
});

export const LoginStart = () => ({
  type: "LOGIN_START",
});

export const LoginSucceed = (userId) => ({
  type: "LOGIN_SUCCEED",
  payload: userId,
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});
