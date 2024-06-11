import { IPage } from "@/models/IPage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PageState {
  page: IPage;
  isLoading: boolean;
  error: string;
}

const initialState: PageState = {
  page: {
    onePageRequestsLimit: 20,
    pagesCount: 1,
    currentPage: 1,
  },
  isLoading: false,
  error: "",
};

export const PagesSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPagesCount(state, action: PayloadAction<number>) {
      state.page.pagesCount = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.page.currentPage = action.payload;
    },
  },
});

export default PagesSlice.reducer;

export const { setPagesCount, setCurrentPage } = PagesSlice.actions;
