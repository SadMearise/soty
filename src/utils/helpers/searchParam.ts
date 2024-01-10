const extractSearchParam = (searchParam: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get(searchParam);

  return param;
};

export default extractSearchParam;
