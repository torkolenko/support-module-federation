import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllRequests } from "@/services/api/requests";
import { getAllStatuses } from "@/services/api/statuses";
import { getAllTypes } from "@/services/api/types";
import { fetchRequestsQueryParams } from "@/models/IRequest";
import { setCurrentPage, setPagesCount } from "./PagesSlice";
import { setFiltering } from "./FilterParamsSlice";

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

      const pagesCount = Math.ceil(response.data.count / 13) || 1;
      dispatch(setPagesCount(pagesCount));

      const newPage = queryParams.page || 1;
      dispatch(setCurrentPage(newPage));

      dispatch(setFiltering(false));

      return response.data.rows;
    } catch (e) {
      return rejectWithValue("Не удалось загрузить");
    }
  }
);
