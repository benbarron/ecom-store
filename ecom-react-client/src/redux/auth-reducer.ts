import { Action } from "redux";
import { ActionTypes } from "./action-types";
import { AuthState } from "./auth-state";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isVerified: false,
  isLoading: true,
};

export const authReducer = function (
  state = initialState,
  action: Action | any
): AuthState {
  switch (action.type) {
    case ActionTypes.AUTH_ALTER_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    case ActionTypes.AUTH_SET_LOADIING:
      return {
        ...state,
        isLoading: action.payload.value,
      };
    case ActionTypes.AUTH_LOGIN_USER:
      if (action.payload.token) {
        localStorage.setItem("x-auth-token", action.payload.token);
      }
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        isVerified: action.payload.token !== null,
        user: action.payload.user,
      };
    case ActionTypes.AUTH_LOGOUT_USER:
    case ActionTypes.AUTH_LOGIN_ERROR:
      localStorage.removeItem("x-auth-token");
      return {
        ...state,
        isLoading: false,
        isVerified: false,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};
