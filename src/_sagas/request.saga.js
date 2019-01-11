import { call, put, take } from 'redux-saga/effects'
import * as actions from '../_actions/request.action'
import axios from 'axios'
import { sysConfig } from "../_config";
console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", actions)
function* getUI(action) {
  let type = action.formType;
  console.log("action===>", action);
  try {
    const data = yield call(axios, ({
      method: 'get',
      url: sysConfig.API_TEST_PREFIX + `/ui/${type}`,
      //params: payload
    }));
    yield put(actions.setPackageUILoaded(type, data.data));

  } catch (error) {
    console.log(error)
    yield put(actions.setPackageUIError(error));
  }
}

export function* watchPackageUILoad() {
  while (true) {
    const action = yield take(actions.PACKAGE_UI_LOAD_PENDING)
    //console.log(action.payload)
    yield call(getUI, action)

  }
}

function* getData(action) {
  let bundleID = action.bundleID;
  console.log("getData action===>", action);
  try {
    const data = yield call(axios, ({
      method: 'get',
      url: sysConfig.API_TEST_PREFIX + `/request/bundle/services/${bundleID}`,
      //params: payload
    }));
    yield put(actions.setBundleDataLoaded(bundleID, data.data));

  } catch (error) {
    console.log(error)
    yield put(actions.setBundleDataError(error));
  }
}

export function* watchBundleDataLoad() {
  while (true) {
    const action = yield take(actions.BUNDLE_DATA_LOAD_PENDING)
    //console.log(action.payload)
    yield call(getData, action)

  }
}

function* submitBundle(action) {
  console.log("getData action===>", action);
  const payload = action.payload
  try {
    yield call(axios, ({
      method: 'post',
      url: sysConfig.API_TEST_PREFIX + '/request/new',
      data: payload,
      headers: { 'Content-Type': "application/json" }
    }))
    //alert(`${payload.status}!`)
  } catch (error) {
    //alert(error.message)
  }
}

export function* watchSubmitBundle() {
  while (true) {
    const action = yield take(actions.SUBMIT_BUNDLE)
    //console.log(action.payload)
    yield call(submitBundle, action)

  }
}


