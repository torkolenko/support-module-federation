import { IPage } from "@/models/IPage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FilterParamState {
  params: IFilterParams;
  isFiltering: boolean;
}

const initialState: FilterParamState = {
  params: {},
  isFiltering: false,
};

export const FilterParamsSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setFilterParam(state, action: PayloadAction<IFilterParams>) {
      state.params = { ...state.params, ...action.payload };
    },
    setFiltering(state, action: PayloadAction<boolean>) {
      state.isFiltering = action.payload;
    },
  },
});

export default FilterParamsSlice.reducer;

export const { setFilterParam, setFiltering } = FilterParamsSlice.actions;
