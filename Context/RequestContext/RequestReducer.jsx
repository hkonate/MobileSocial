export const RequestReducer = (state, action) => {
  switch (action.type) {
    case "ONBOARDING_SEEN":
      return {
        ...state,
        userFirstAppearance: false,
      };

    case "SET_EVENTS":
      return {
        ...state,
        events: action.payload,
      };

    case "SET_EVENT":
      return {
        ...state,
        events: [
          ...state.events.filter((event) => event.id !== action.payload.id),
          action.payload,
        ],
      };

    case "CREATED_PROFILE":
      return {
        ...state,
        userCreatedProfile: "done",
      };
    case "REQUEST_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };

    case "REQUEST_SUCCEED":
      return {
        ...state,
        user: action.payload,
        isFetching: false,
      };
    case "REQUEST_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    default:
      return state;
  }
};
