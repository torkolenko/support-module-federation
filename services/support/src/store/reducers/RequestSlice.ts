import { IRequest } from "@/models/IRequest";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchRequestsThunk } from "./ActionCreators";

interface RequestState {
  requests: IRequest[];
  isLoading: boolean;
  error: string;
}

const initialState: RequestState = {
  requests: [],
  isLoading: false,
  error: "",
};

export const RequestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchRequestsThunk.fulfilled.type,
      (state, action: PayloadAction<IRequest[]>) => {
        state.isLoading = false;
        state.error = "";
        state.requests = action.payload;
      }
    ),
      builder.addCase(fetchRequestsThunk.pending.type, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(
        fetchRequestsThunk.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default RequestSlice.reducer;
