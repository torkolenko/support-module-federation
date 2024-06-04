import { IRequestStatus } from "./IRequestStatus";
import { IRequestType } from "./IRequestType";

export interface IRequest {
  id: number;
  userName: string;
  description: string;
  typeId: number;
  statusId: number;
  createdAt: string;
  updatedAt: string;
  image: string | null;
  status: IRequestStatus;
  type: IRequestType;
}

export interface IRequestToPost {
  userName: string;
  description: string;
  typeId: number;
  image?: string;
}

export interface IRequestToGetAll {
  count: number;
  rows: IRequest[];
}

export interface fetchRequestsQueryParams {
  limit?: number;
  page?: number;
  userName?: string;
  typeId?: number;
  statusId?: number;
  createdAt?: string;
}
