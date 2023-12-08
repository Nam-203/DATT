import qs from 'qs';

export const getQueryString = (path) => {
  if (!path.search) return;
  return qs.parse(path.search, { ignoreQueryPrefix: true });
};
