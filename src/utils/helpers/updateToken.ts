import { fetchRefreshToken } from "../../services/token";
import { LOCAL_STORAGE_KEYS } from "../constants";
import { setLocalStorage } from "./localStorage";

const updateToken = async () => {
  const response = await fetchRefreshToken();

  if (response) {
    setLocalStorage(LOCAL_STORAGE_KEYS.accessToken, response.access_token);
    setLocalStorage(LOCAL_STORAGE_KEYS.refreshToken, response.refresh_token);
  }
};

export default updateToken;
