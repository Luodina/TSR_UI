// data list
export const BUNDLE_LIST_DATA_LOAD_PENDING = 'BUNDLE_LIST_DATA_LOAD_PENDING'
export const BUNDLE_LIST_DATA_LOAD_SUCCESS = 'BUNDLE_LIST_DATA_LOAD_SUCCESS'
export const BUNDLE_LIST_DATA_LOAD_ERROR = 'BUNDLE_LIST_DATA_LOAD_ERROR'

export const setBundleListDataLoading = (status, payload) => ({
  type: BUNDLE_LIST_DATA_LOAD_PENDING,
  status,
  payload
})

export const setBundleListDataLoaded = (status, data) => ({
  type: BUNDLE_LIST_DATA_LOAD_SUCCESS,
  status,
  data
})

export const setBundleListDataError = (error) => ({
  type: BUNDLE_LIST_DATA_LOAD_ERROR,
  error
})