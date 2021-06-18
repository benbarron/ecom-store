import { Action } from 'redux';
import { ActionTypes } from './action-types';
import { LayoutState } from './layout-state';

const initialState: LayoutState = {
  sidebar: 'cart',
  showSideNav: false,
  showStoreLocator: false,
};

export const layoutReducer = function (
  state = initialState,
  action: Action | any
): LayoutState {
  switch (action.type) {
    case ActionTypes.LAYOUT_TOGGLE_STORE_LOCATOR:
      return { ...state, showStoreLocator: !state.showStoreLocator };
    case ActionTypes.LAYOUT_TOGGLE_SIDEBAR:
      return { ...state, sidebar: state.sidebar === 'cart' ? 'likes' : 'cart' };
    case ActionTypes.LAYOUT_SET_SIDEBAR:
      return { ...state, sidebar: action.payload.sidebar };
    case ActionTypes.LAYOUT_TOGGLE_SIDENAV:
      return { ...state, showSideNav: !state.showSideNav };
    default:
      return state;
  }
};
