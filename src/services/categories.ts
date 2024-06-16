import { Categories } from "../models";
import { ENDPOINTS, LOCAL_STORAGE_KEYS } from "../utils/constants";
import { getLocalStorage, getQueryParameterStringFromObject } from "../utils/helpers";
import { fetchData } from ".";
import { HTTPMethod } from "../types/enums";

export type CategoriesParams = {
  country?: string;
  locale?: string;
  limit?: number;
  offset?: number;
};

// API https://developer.spotify.com/documentation/web-api/reference/get-categories
export const fetchCategories = async (searchParams?: CategoriesParams): Promise<Categories> => {
  const queryString = searchParams ? `?${getQueryParameterStringFromObject(searchParams)}` : "";

  const categories: Categories = (await fetchData({
    url: `${ENDPOINTS.categories}${queryString}`,
    method: HTTPMethod.Get,
    headers: new Headers({ Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}` }),
  }))!;

  return categories;
};
