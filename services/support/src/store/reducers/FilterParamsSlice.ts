import { IPage } from "@/models/IPage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FilterParamState {
  params: IFilterParams;
  isLoading: boolean;
  error: string;
}

const initialState: FilterParamState = {
  params: {},
  isLoading: false,
  error: "",
};

export const FilterParamsSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setFilterParam(state, action: PayloadAction<IFilterParams>) {
      state.params = { ...state.params, ...action.payload };
    },
  },
});

export default FilterParamsSlice.reducer;

export const { setFilterParam } = FilterParamsSlice.actions;
