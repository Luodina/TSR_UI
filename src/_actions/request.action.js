// ui
export const PACKAGE_UI_LOAD_PENDING = 'PACKAGE_UI_LOAD_PENDING'
export const PACKAGE_UI_LOAD_SUCCESS = 'PACKAGE_UI_LOAD_SUCCESS'
export const PACKAGE_UI_LOAD_ERROR = 'PACKAGE_UI_LOAD_ERROR'

// data
export const BUNDLE_DATA_LOAD_PENDING = 'BUNDLE_DATA_LOAD_PENDING'
export const BUNDLE_DATA_LOAD_SUCCESS = 'BUNDLE_DATA_LOAD_SUCCESS'
export const BUNDLE_DATA_LOAD_ERROR = 'BUNDLE_DATA_LOAD_ERROR'

export const SUBMIT_BUNDLE = "SUBMIT_BUNDLE";

export const submitBundle = (payload) => ({
  type: SUBMIT_BUNDLE,
  payload
})
//---ui
export const setPackageUILoading = (formType) => ({
  type: PACKAGE_UI_LOAD_PENDING,
  formType
})

export const setPackageUILoaded = (formType, ui) => ({
  type: PACKAGE_UI_LOAD_SUCCESS,
  ui,
  formType
})

export const setPackageUIError = (error) => ({
  type: PACKAGE_UI_LOAD_ERROR,
  error
})

//---data
export const setBundleDataLoading = (bundleID) => ({
  type: BUNDLE_DATA_LOAD_PENDING,
  bundleID
})

export const setBundleDataLoaded = (bundleID, data) => ({
  type: BUNDLE_DATA_LOAD_SUCCESS,
  data,
  bundleID
})

export const setBundleDataError = (error) => ({
  type: BUNDLE_DATA_LOAD_ERROR,
  error
})



