// src/apis/locationApis.ts
import { AxiosRequestConfig } from "axios";
import MainApiRequest from "./MainApiRequest";

export const locationApis = {
  getList: function* (): any {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return yield MainApiRequest.get(`/location/list`, config);
  },

  create: function* (locationData: { name: string, address: string, description: string, featureImage: string }): any {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return yield MainApiRequest.post(`/location`, locationData, config);
  },

  edit: function* (id: string, locationData: { name: string, address: string, description: string, featureImage: string }): any {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return yield MainApiRequest.put(`/location/${id}`, locationData, config);
  },

  delete: function* (id: string): any {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return yield MainApiRequest.delete(`/location/${id}`, config);
  }
};
