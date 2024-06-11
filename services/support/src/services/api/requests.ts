import { endpoints } from "@/constants/url";
import { axiosConfig } from "./axiosConfig";
import {
  IRequest,
  IRequestToGetAll,
  fetchRequestsQueryParams,
} from "@/models/IRequest";

export function getAllRequests(queryParams: fetchRequestsQueryParams) {
  const reqParams = {
    params: queryParams,
    method: "get",
    url: endpoints.REQUESTS,
  };

  return axiosConfig<IRequestToGetAll>(reqParams);
}

export function getRequestById(id: number) {
  const reqParams = {
    method: "get",
    url: `${endpoints.REQUESTS}/${id}`,
  };

  return axiosConfig<IRequest>(reqParams);
}

export function postRequest(requestData: FormData) {
  const reqParams = {
    method: "post",
    url: endpoints.REQUESTS,
    data: requestData,
  };

  return axiosConfig<IRequest>(reqParams);
}
