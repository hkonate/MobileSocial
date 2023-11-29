import { createContext, useReducer } from "react";
import { AuthReducer } from "./AuthReducer";
import useSecureStore from "../../assets/Utils/useSecureStore";

const { getValue } = useSecureStore();

let INITIAL_STATE = {
  userFirstAppearance: true,
  userId: null,
  userToken: null,
  isFetching: false,
  error: false,
};

getValue("userCredentials").then((value) => {
  const parseValue = JSON.parse(value);
  INITIAL_STATE.userId = parseValue.userId;
  INITIAL_STATE.userToken = parseValue.token;
});

getValue("onBording").then((value) => {
  const parseValue = JSON.parse(value);
  if (parseValue) INITIAL_STATE.userFirstAppearance = false;
});

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        userFirstAppearance: state.userFirstAppearance,
        userId: state.userId,
        userToken: state.userToken,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
