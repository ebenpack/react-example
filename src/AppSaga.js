import { call, race, take, takeEvery, put, select, all } from 'redux-saga/effects';
import { ASYNC_INCREMENT, ASYNC_DECREMENT, INCREMENT, DECREMENT, increment, decrement } from './AppModule';

function fakeHTTPRequest(delay) {
    return new Promise(
        resolve =>
            setTimeout(() => resolve(true), delay)
    );
}

function* decrementSaga() {
    const delay = yield select(state => state.get('delay'));
    // 'Cancel' the async decrement if someone
    // makes a sync decrement in the meantime
    const { sync, async } = yield race({
        async: call(fakeHTTPRequest, delay),
        sync: take(DECREMENT)
    });
    if (async) {
        yield put(decrement());
    }
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