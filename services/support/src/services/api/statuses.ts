import { endpoints } from "@/constants/url";
import { axiosConfig } from "./axiosConfig";
import { IRequestStatus } from "@/models/IRequestStatus";

export function getAllStatuses() {
  const reqParams = {
    method: "get",
    url: endpoints.STATUSES,
  };

  return axiosConfig<IRequestStatus>(reqParams);
}
