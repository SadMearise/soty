export const getSearchParamFromCurrentUrl = (searchParam: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get(searchParam);

  return param;
};
