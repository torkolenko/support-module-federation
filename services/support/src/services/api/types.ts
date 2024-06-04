import { endpoints } from "@/constants/url";
import { axiosConfig } from "./axiosConfig";
import { IRequestType } from "@/models/IRequestType";

export function getAllTypes() {
  const reqParams = {
    method: "get",
    url: endpoints.TYPES,
  };

  return axiosConfig<IRequestType>(reqParams);
}
