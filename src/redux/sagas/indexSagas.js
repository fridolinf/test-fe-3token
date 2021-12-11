import { all } from 'redux-saga/effects';
// import loginSaga from './login/saga';
// import supplierSaga from '../redux/supplier/saga/sagaSupplier';
// import adminSaga from './admin/saga/sagaAdmin';
import { watchAdd, watchDel, watchGet, watchUpdateData } from '../sagas/saga';
export default function* rootSaga() {
	yield all([watchGet(), watchAdd(), watchDel(), watchUpdateData()]);
}
