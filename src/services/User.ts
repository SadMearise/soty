import { User } from "../models";
import { HTTPMethod, LOCAL_STORAGE_KEYS, ENDPOINTS, HTTPStatusCode } from "../utils/constants";
import { getLocalStorage } from "../utils/helpers/localStorage";
import updateToken from "../utils/helpers/updateToken";

const fetchUser = async (): Promise<User | undefined> => {
  try {
    const response = await fetch(ENDPOINTS.user, {
      method: HTTPMethod.Get,
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.accessToken)}`,
      },
    });

    if (response.status === HTTPStatusCode.Unauthorized) {
      await updateToken();
      return await fetchUser();
    }
    if (!response.ok) {
      throw new Error(`code ${response.status}`);
    }

    const user: User = await response.json();

    return user;
  } catch (error) {
    console.error("An error occured during user data retrieval.", (error as Error).message);

    return undefined;
  }
};

export default fetchUser;
