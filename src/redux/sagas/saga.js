import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { api } from '../../service/api';

function* getData() {
	// const token = localStorage.getItem('token');
	try {
		const res = yield axios.get(`${api.getProducts()}`, {
			headers: { 'Content-Type': 'application/json' },
		});
		const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
		yield call(delay, 2000);
		yield put({ type: 'GET_DATA_SUCCESS', payload: res.data });
	} catch (e) {
		console.log(e);
		console.log('errerr', e.res.data.message);
	}
}
function* addData(actions) {
	const { payload } = actions;
	try {
		const res = yield axios.post(`${api.addProducts()}`, payload, {
			headers: { 'Content-Type': 'application/json' },
		});
		yield put({ type: 'ADD_DATA_SUCCESS', payload: res.data.data });
		yield* getData();
	} catch (e) {
		e.res.data;
	}
}
function* delData(actions) {
	const { payload } = actions;
	try {
		const res = yield axios.delete(`${api.delProducts}/${payload}`);
		yield put({ type: 'DELETE_DATA_SUCCESS', id: payload });
		yield* getData();
	} catch (e) {
		console.log(e);
	}
}
//blom dicoba
function* changeIsActive(action) {
	let param = JSON.stringify(action.payload);
	try {
		const res = yield axios.put(
			`${api.accVerifikasi(action.id)}`,
			param,

			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		yield put({ type: 'CHANGE_ISACTIVE_SUCCESS', payload: res.data });
	} catch (e) {
		console.log(e);
	}
}
//blomdicoba

export function* watchGet() {
	yield takeEvery('GET_DATA_REQUEST', getData);
}
export function* watchAdd() {
	yield takeEvery('ADD_DATA_REQUEST', addData);
}
export function* watchDel() {
	yield takeEvery('DELETE_DATA_REQUEST', delData);
}
export function* watchIsActive() {
	yield takeEvery('REQUEST_CHANGE_ISACTIVE', changeIsActive);
}
