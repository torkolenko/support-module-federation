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
    requestsCount: 1,
    currentPage: 1,
  },
  isLoading: false,
  error: "",
};

export const PagesSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setRequestsCount(state, action: PayloadAction<number>) {
      state.page.requestsCount = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.page.currentPage = action.payload;
    },
  },
});

export default PagesSlice.reducer;

export const { setRequestsCount, setCurrentPage } = PagesSlice.actions;
