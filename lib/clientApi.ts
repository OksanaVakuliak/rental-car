import api from "./api";
import {
  Car,
  CarQueryParams,
  GetCarsResponse,
  GetBrandsResponse,
} from "@/types/car";

export const clientApi = {
  getCars: async (params: CarQueryParams): Promise<GetCarsResponse> => {
    const { data } = await api.get<GetCarsResponse>("/cars", { params });
    return data;
  },
  getCarById: async (id: string): Promise<Car> => {
    const { data } = await api.get<Car>(`/cars/${id}`);
    return data;
  },
  getBrands: async (): Promise<GetBrandsResponse> => {
    const { data } = await api.get<GetBrandsResponse>("/brands");
    return data;
  },
};
