import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchTypesThunk } from "./ActionCreators";
import { IRequestType } from "@/models/IRequestType";

interface TypeState {
  types: IRequestType[];
  isLoading: boolean;
  error: string;
}

const initialState: TypeState = {
  types: [],
  isLoading: false,
  error: "",
};

export const TypeSlice = createSlice({
  name: "type",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchTypesThunk.fulfilled.type,
      (state, action: PayloadAction<IRequestType[]>) => {
        state.isLoading = false;
        state.error = "";
        state.types = action.payload;
      }
    ),
      builder.addCase(fetchTypesThunk.pending.type, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(
        fetchTypesThunk.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default TypeSlice.reducer;
