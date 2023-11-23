import { CLIENT_DATA, AUTH_ENDPOINT, URI, RESPONSE_TYPE } from "../constants";

const getLoginHref = () => {
  const { clientId } = CLIENT_DATA;

  const href = `${AUTH_ENDPOINT}?client_id=${clientId}&redirect_uri=${URI}&response_type=${RESPONSE_TYPE}`;

  return href;
};

export default getLoginHref;
