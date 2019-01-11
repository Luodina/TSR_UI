import {
  BUNDLE_LIST_DATA_LOAD_PENDING,
  BUNDLE_LIST_DATA_LOAD_SUCCESS,
  BUNDLE_LIST_DATA_LOAD_ERROR
} from '../_actions/bundle.action';

export default function bundleReducer(state = {}, action) {
  console.log("bundleReducer action", action)
  switch (action.type) {
    //----data fetching
    case BUNDLE_LIST_DATA_LOAD_PENDING:
      return state;
    case BUNDLE_LIST_DATA_LOAD_SUCCESS:
      let list_data = JSON.parse(JSON.stringify(action.data));
      let data = "asd"
      if (list_data.status) {
        data = list_data.bundles
      }
      return { ...state, data: data }
    case BUNDLE_LIST_DATA_LOAD_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
}