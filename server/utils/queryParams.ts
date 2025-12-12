import qs from 'qs'
import deepmerge from 'deepmerge'

type AnyObject = Record<string, unknown>

export const stringifyQueryParams: typeof qs.stringify = (object, options) => {
  return qs.stringify(object, {
    encode: true,
    arrayFormat: 'brackets',
    addQueryPrefix: true,
    ...options,
  })
}

export const mergeQueryParams = (queryParams: AnyObject, newQueryParams: AnyObject) => {
  return deepmerge(queryParams, newQueryParams, {
    arrayMerge: (_, sourceArray) => sourceArray,
  })
}
