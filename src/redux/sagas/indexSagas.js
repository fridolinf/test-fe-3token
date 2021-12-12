import { all } from 'redux-saga/effects';
import { watchAdd, watchDel, watchGet, watchUpdateData } from '../sagas/saga';
export default function* rootSaga() {
	yield all([watchGet(), watchAdd(), watchDel(), watchUpdateData()]);
}
