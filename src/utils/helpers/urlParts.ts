export const getUrlPathAndSearch = (href: string, removalPart?: string) => {
  const url: URL = new URL(href);

  let { pathname } = url;

  if (removalPart) {
    pathname = pathname.replace(removalPart, "");
  }
  const urlPathAndSearch = pathname + url.search;

  return urlPathAndSearch;
};
