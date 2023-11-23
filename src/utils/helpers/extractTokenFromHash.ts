import { TOKEN_NAME_FROM_PARAMS } from "../constants";

const extractTokenFromHash = (hash: string) => {
  const searchParams = new URLSearchParams(hash.replace("#", "?"));

  return searchParams.get(TOKEN_NAME_FROM_PARAMS);
};

export default extractTokenFromHash;
