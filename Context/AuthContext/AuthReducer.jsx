export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "ONBORDING_SEEN":
      return {
        ...state,
        userFirstAppearance: false,
      };
    case "SET_USER":
      return {
        ...state,
        userId: action.payload,
      };

    case "LOGIN_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };

    case "LOGIN_SUCCEED":
      return {
        ...state,
        userId: action.payload.userId,
        userToken: action.payload.token,
        isFetching: false,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    default:
      return state;
  }
};
