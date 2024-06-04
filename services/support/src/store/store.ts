import { combineReducers, configureStore } from "@reduxjs/toolkit";
import requestReducer from "./reducers/RequestSlice";
import pageReducer from "./reducers/PagesSlice";
import statusReducer from "./reducers/StatusesSlice";
import typeReducer from "./reducers/TypesSlice";

const rootReducer = combineReducers({
  requestReducer,
  pageReducer,
  statusReducer,
  typeReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
