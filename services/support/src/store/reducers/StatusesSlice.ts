import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchStatusesThunk } from "./ActionCreators";
import { IRequestStatus } from "@/models/IRequestStatus";

interface StatusState {
  statuses: IRequestStatus[];
  isLoading: boolean;
  error: string;
}

const initialState: StatusState = {
  statuses: [],
  isLoading: false,
  error: "",
};

export const StatusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchStatusesThunk.fulfilled.type,
      (state, action: PayloadAction<IRequestStatus[]>) => {
        state.isLoading = false;
        state.error = "";
        state.statuses = action.payload;
      }
    ),
      builder.addCase(fetchStatusesThunk.pending.type, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(
        fetchStatusesThunk.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default StatusSlice.reducer;
