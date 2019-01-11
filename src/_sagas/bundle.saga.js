import { call, put, take } from 'redux-saga/effects';
import * as actions from '../_actions/bundle.action';
import axios from 'axios';
import { sysConfig } from "../_config";

function* getBundleListData(action) {
  let status = action.status;
  let payload = action.payload.user;
  try {
    const data = yield call(axios, ({
      method: 'get',
      url: sysConfig.API_TEST_PREFIX + `/request/list/${status}/${payload}`
    }));
    yield put(actions.setBundleListDataLoaded(status, data.data));
  } catch (error) {
    console.log(error);
    yield put(actions.setBundleListDataError(error));
  }
}

export function* watchBundleListDataLoad() {
  while (true) {
    const action = yield take(actions.BUNDLE_LIST_DATA_LOAD_PENDING);
    yield call(getBundleListData, action);
  }
}
