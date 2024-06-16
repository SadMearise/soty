export const getQueryParameterStringFromObject = (parameterObject: Record<string, string | number>) => {
  const queryString = Object.keys(parameterObject)
    .map((key) => `${key}=${parameterObject[key]}`)
    .join("&");

  return queryString;
};
