import { User } from "../models";
import { HTTPMethods, LOCAL_STORAGE_KEYS, USER_ENDPOINT } from "../utils/constants";
import { getLocalStorage } from "../utils/helpers/localStorage";

const fetchUser = async (): Promise<User | undefined> => {
  try {
    const response = await fetch(USER_ENDPOINT, {
      method: HTTPMethods.Get,

      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEYS.token)}`,
      },
    });

    if (!response.ok) {
      throw new Error(`code ${response.status}`);
    }

    const user: User = await response.json();

    return user;
  } catch (error) {
    console.error("An error occured during user data retrieval", (error as Error).message);

    return undefined;
  }
};

export default fetchUser;
