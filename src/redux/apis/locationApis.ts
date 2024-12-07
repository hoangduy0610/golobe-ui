import { AxiosRequestConfig } from "axios";
import MainApiRequest from "./MainApiRequest";

export const locationApis = {
  getList: function (): Promise<any> {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return MainApiRequest.get(`/location/list`, config);
  },

  create: function (locationData: { name: string, address: string, description: string, featureImage: string }): Promise<any> {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return MainApiRequest.post(`/location`, locationData, config);
  },

  edit: function (id: number, locationData: { name: string, address: string, description: string, featureImage: string }): Promise<any> {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return MainApiRequest.put(`/location/${id}`, locationData, config);
  },

  delete: function (id: number): Promise<any> {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return MainApiRequest.delete(`/location/${id}`, config);
  }
};
