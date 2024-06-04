import { IPage } from "@/models/IPage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PageState {
  page: IPage;
  isLoading: boolean;
  error: string;
}

const initialState: PageState = {
  page: {
    requestsLimit: 20,
    currentPage: 1,
    pagesCount: 1,
  },
  isLoading: false,
  error: "",
};

export const PagesSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    changeCurrentPage(state, action: PayloadAction<number>) {
      state.page.currentPage = action.payload;
    },
    setPagesCount(state, action: PayloadAction<number>) {
      state.page.pagesCount = Math.ceil(
        action.payload / state.page.requestsLimit
      );
    },
  },
});

export default PagesSlice.reducer;

export const { changeCurrentPage, setPagesCount } = PagesSlice.actions;
