import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authReducer } from './auth-reducer';
import { layoutReducer } from './layout-reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
