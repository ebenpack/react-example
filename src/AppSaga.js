import { call, takeEvery, put, select, all } from 'redux-saga/effects';
import { ASYNC_INCREMENT, ASYNC_DECREMENT, increment, decrement } from './AppModule';

function fakeHTTPRequest(delay) {
    return new Promise(
        resolve =>
            setTimeout(resolve, delay)
    );
}

function* decrementSaga() {
    const delay = yield select(state => state.get('delay'));
    const result = yield call(fakeHTTPRequest, delay);
    yield put(decrement());
}

function* incrementSaga() {
    const delay = yield select(state => state.get('delay'));
    const result = yield call(fakeHTTPRequest, delay);
    yield put(increment());
}


function* watchDecrementSaga() {
    yield takeEvery(ASYNC_DECREMENT, decrementSaga);
}

function* watchIncrementSaga() {
    yield takeEvery(ASYNC_INCREMENT, incrementSaga);
}

export default function* appSaga() {
    yield all([
        watchIncrementSaga(),
        watchDecrementSaga()
    ]);
};