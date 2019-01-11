import defaultData from "../views/Request/dfConfig_";
import defaultStages from "../views/Request/wfConfig_";
import {
  PACKAGE_UI_LOAD_PENDING,
  PACKAGE_UI_LOAD_SUCCESS,
  PACKAGE_UI_LOAD_ERROR,
  BUNDLE_DATA_LOAD_PENDING,
  BUNDLE_DATA_LOAD_SUCCESS,
  BUNDLE_DATA_LOAD_ERROR
} from '../_actions/request.action';

export default function requestReducer(state = { stages: defaultStages["services"], services: defaultData["services"] }, action) {
  //console.log("requestReducer action", action)
  switch (action.type) {
    //----data fetching
    case PACKAGE_UI_LOAD_PENDING:
      return state;
    case PACKAGE_UI_LOAD_SUCCESS:
      let data = JSON.parse(JSON.stringify(action.ui));
      let uiServices = [{}];
      if (data.status) {
        uiServices = data.uiServices;
      }
      return { ...state, ui: uiServices };
    case PACKAGE_UI_LOAD_ERROR:
      return { ...state, error: action.error };
    //----data
    case BUNDLE_DATA_LOAD_PENDING:
      return state;
    case BUNDLE_DATA_LOAD_SUCCESS:
      let bundle_data = JSON.parse(JSON.stringify(action.data));
      return { ...state, services: bundle_data.services, stages: bundle_data.stages };
    case BUNDLE_DATA_LOAD_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
}