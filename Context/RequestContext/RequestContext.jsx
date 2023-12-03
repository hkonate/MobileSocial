import { createContext, useEffect, useReducer, useState } from "react";
import useSecureStore from "../../assets/Utils/useSecureStore";
import { RequestReducer } from "./RequestReducer";
import { CreatedProfile, OnBoarding, RequestSucceed } from "./RequestActions";

const { getValue } = useSecureStore();
let INITIAL_STATE = {
  userFirstAppearance: true,
  userCreatedProfile: false,
  events: null,
  user: null,
  isFetching: false,
  error: false,
};

export const RequestContext = createContext(INITIAL_STATE);

export const RequestContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RequestReducer, INITIAL_STATE);
  useEffect(() => {
    const fetch = () => {
      getValue("onBording").then((value) => {
        const parseValue = JSON.parse(value);
        if (parseValue) dispatch(OnBoarding());
      });

      getValue("userCredentials").then((value) => {
        const parseValue = JSON.parse(value);
        dispatch(RequestSucceed(parseValue));
      });

      getValue("createProfile").then((value) => {
        const parseValue = JSON.parse(value);
        if (parseValue) dispatch(CreatedProfile());
      });
    };
    fetch();
  }, []);
  return (
    <RequestContext.Provider
      value={{
        userFirstAppearance: state.userFirstAppearance,
        userCreatedProfile: state.userCreatedProfile,
        events: state.events,
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};
