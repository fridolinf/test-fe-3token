import { all } from 'redux-saga/effects';
import { changeIsActive } from '../actions/action';
// import loginSaga from './login/saga';
// import supplierSaga from '../redux/supplier/saga/sagaSupplier';
// import adminSaga from './admin/saga/sagaAdmin';
import { watchAdd, watchDel, watchGet } from '../sagas/saga';
export default function* rootSaga() {
	yield all([watchGet(), watchAdd(), watchDel()], changeIsActive());
}
