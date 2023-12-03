export const OnBoarding = () => ({
  type: "ONBOARDING_SEEN",
});

export const SetEvents = (events) => ({
  type: "SET_EVENTS",
  payload: events,
});

export const CreatedProfile = () => ({
  type: "CREATED_PROFILE",
});

export const RequestStart = () => ({
  type: "REQUEST_START",
});

export const RequestSucceed = (userId) => ({
  type: "REQUEST_SUCCEED",
  payload: userId,
});

export const RequestFailure = () => ({
  type: "REQUEST_FAILURE",
});
