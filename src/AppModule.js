import { Map as IMap } from 'immutable';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ASYNC_INCREMENT = 'ASYNC_INCREMENT';
export const ASYNC_DECREMENT = 'ASYNC_DECREMENT';
export const SET_DELAY = 'SET_DELAY';
export const SET_STEP = 'SET_STEP';

export const increment = () =>
    ({ type: INCREMENT });

export const decrement = () =>
    ({ type: DECREMENT });

export const asyncIncrement = () =>
    ({ type: ASYNC_INCREMENT });

export const asyncDecrement = () =>
    ({ type: ASYNC_DECREMENT });

export const setDelay = (delay = 0) =>
    ({ type: SET_DELAY, delay });

export const setStep = (step = 1) =>
    ({ type: SET_STEP, step });

const defaultState = new IMap({
    n: 0,
    step: 1,
    delay: 1000
});

const toNumber = (n, fallback) =>
    !isNaN(n) ? parseInt(n) : fallback;

export default (state = defaultState, action) => {
    switch (action.type) {
        case INCREMENT:
            return state.update('n', n => n + state.get('step'));
        case DECREMENT:
            return state.update('n', n => n - state.get('step'));
        case SET_DELAY:
            return state.set('delay', toNumber(action.delay, state.get('delay')));
        case SET_STEP:
            return state.set('step', toNumber(action.step, state.get('step')));
        default:
            return state;
    }
};