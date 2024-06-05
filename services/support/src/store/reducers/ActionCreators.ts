import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllRequests } from "@/services/api/requests";
import { getAllStatuses } from "@/services/api/statuses";
import { getAllTypes } from "@/services/api/types";
import { fetchRequestsQueryParams } from "@/models/IRequest";
import { setPagesCount } from "./PagesSlice";

export const fetchTypesThunk = createAsyncThunk(
  "type/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllTypes();
      return response.data;
    } catch (e) {
      return rejectWithValue("Не удалось загрузить");
    }
  }
);

export const fetchStatusesThunk = createAsyncThunk(
  "status/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllStatuses();
      return response.data;
    } catch (e) {
      return rejectWithValue("Не удалось загрузить");
    }
  }
);

export const fetchRequestsThunk = createAsyncThunk(
  "request/fetchAll",
  async (
    queryParams: fetchRequestsQueryParams,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await getAllRequests(queryParams);
      dispatch(setPagesCount(response.data.count));
      response.data.rows.sort((a, b) => a.id - b.id);
      return response.data.rows;
    } catch (e) {
      return rejectWithValue("Не удалось загрузить");
    }
  }
);