// @flow
export const encoded = (url: string, data?: Object) => {
  if (!data) {
    return url
  }

  const query = Object.entries(data)
    .map(([k, v]) => `${k}=${String(v)}`)
    .join('&')

  if (!query) {
    return url
  }

  return `${url}?${query}`
}