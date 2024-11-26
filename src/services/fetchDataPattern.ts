import { HTTPMethod, HTTPStatusCode } from "../types/enums";
import { LOCAL_STORAGE_KEYS } from "../utils/constants";
import { getLocalStorage, checkExpiryToken } from "../utils/helpers";

type DataArgs = {
  url: string;
  method: HTTPMethod;
  headers?: Headers;
  // eslint-disable-next-line no-undef
  body?: BodyInit;
};

let tokenIsUpdating = false;

export const fetchData = async <T>({ url, method, headers, body }: DataArgs): Promise<T | null> => {
  try {
    const response = await fetch(url, {
      method,
      headers,
      body,
    });
    if (response.status === HTTPStatusCode.Unauthorized) {
      if (!tokenIsUpdating) {
        tokenIsUpdating = true;
        await checkExpiryToken();
        tokenIsUpdating = false;
      }

      const headersWithNewToken = new Headers(headers);
      headersWithNewToken.set("Authorization", `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}`);

      return await fetchData({ url, method, headers: headersWithNewToken, body });
    }

    if (!response.ok) {
      throw new Error(`code ${response.status}`);
    }

    const contentType = response.headers.get("content-type");

    if (contentType?.startsWith("application/json")) {
      const data: T = await response.json();

      return data;
    }

    return null;
  } catch (error) {
    console.error("An error occured during data retrieval.", (error as Error).message);

    throw error;
  }
};
