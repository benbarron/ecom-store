import { Dispatch } from 'react';
import { ActionTypes } from './action-types';
import { RootState } from './store';

export const toggleSidebar = () => {
  return async (dispatch: Dispatch<any>, getState: () => RootState) => {
    dispatch({ type: ActionTypes.LAYOUT_TOGGLE_SIDEBAR });
  };
};

export const setSidebar = (value: string) => {
  return async (dispatch: Dispatch<any>, getState: () => RootState) => {
    dispatch({
      type: ActionTypes.LAYOUT_SET_SIDEBAR,
      payload: { sidebar: value },
    });
  };
};

export const toggleStoreLocator = () => {
  return async (dispatch: Dispatch<any>, getState: () => RootState) => {
    dispatch({ type: ActionTypes.LAYOUT_TOGGLE_STORE_LOCATOR });
  };
};

export const toggleSideNav = () => {
  return async (dispatch: Dispatch<any>, getState: () => RootState) => {
    dispatch({ type: ActionTypes.LAYOUT_TOGGLE_SIDENAV });
  };
};
