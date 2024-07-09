export const getQueryParameterStringFromObject = (parameterObject: Record<string, string | number | string[]>) => {
  const keys = Object.keys(parameterObject);
  const queryString = keys
    .map((key) => {
      return Array.isArray(parameterObject[key])
        ? `${key}=${(parameterObject[key] as string[]).join(",")}`
        : `${key}=${parameterObject[key]}`;
    })
    .join("&");

  return queryString;
};
