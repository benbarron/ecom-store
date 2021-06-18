import Axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { User } from '../models/user';
import { ActionTypes } from './action-types';
import { RootState } from './store';
import { buildAuthHeaders } from './action-utils';

export const alterUser = (user: any) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const current = { ...getState().auth.user };
    Object.assign(current, user);
    console.log(current);
    dispatch({
      type: ActionTypes.AUTH_ALTER_USER,
      payload: { user: current },
    });
  };
};

export const loadUser = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch({
      type: ActionTypes.AUTH_SET_LOADIING,
      payload: {
        value: true,
      },
    });
    try {
      const response: AxiosResponse = await Axios.get(
        'http://localhost:8080/api/auth/user',
        buildAuthHeaders()
      );
      console.log(response.data);
      dispatch({
        type: ActionTypes.AUTH_LOGIN_USER,
        payload: {
          user: response.data.user,
        },
      });
    } catch (e) {
      dispatch({
        type: ActionTypes.AUTH_LOGIN_ERROR,
      });
    }
  };
};

export const loginUser = (username: string, password: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const response: AxiosResponse = await Axios.post(
        'http://localhost:8080/api/auth/login',
        { username, password }
      );
      const user: User = response.data.user;
      const token: string = response.data.token;
      dispatch({
        type: ActionTypes.AUTH_LOGIN_USER,
        payload: { user, token },
      });
    } catch (e) {
      throw new Error(e.response.data.message);
    }
  };
};

export const verifyUser = (token: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const params = `uid=${getState().auth.user?._id}&token=${token}`;
      const url = `http://localhost:8080/api/auth/verify-2fa?${params}`;
      const response: AxiosResponse = await Axios.put(url);
      dispatch({
        type: ActionTypes.AUTH_LOGIN_USER,
        payload: {
          user: response.data.user,
          token: response.data.token,
        },
      });
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };
};

export const registerUser = (
  username: string,
  email: string,
  password: string
) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const response: AxiosResponse = await Axios.post(
        'http://localhost:8080/api/auth/register',
        { username, email, password }
      );
      const user: User = response.data.user;
      const token: string = response.data.token;
      dispatch({
        type: ActionTypes.AUTH_LOGIN_USER,
        payload: { user, token },
      });
    } catch (e) {
      throw new Error(e.response.data.message);
    }
  };
};

export const logoutUser = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch({
      type: ActionTypes.AUTH_LOGOUT_USER,
    });
  };
};
