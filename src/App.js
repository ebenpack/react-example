import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { increment, decrement, asyncIncrement, asyncDecrement, setDelay, setStep } from './AppModule';

const OddCount = ({ count }) =>
    <p style={{ backgroundColor: 'red' }}>{count}</p>;

const EvenCount = ({ count }) =>
    <p style={{ backgroundColor: 'green' }}>{count}</p>;

const Counter = ({ count, component: Component, children }) =>
    <div>
        <Component count={count} />
        {children}
    </div>;

const App = ({ n, step, delay, increment, decrement, asyncIncrement, asyncDecrement, setDelay, setStep }) => (
    <div className="App">
        <header className="App-header">
            <h1 className="App-title">Blah</h1>
        </header>
        <Counter count={n} component={(n % 2 == 0 ? EvenCount : OddCount)}>
            <div>FOO GARBAGE</div>
        </Counter>
        <p>
            <button onClick={increment}>
                Increment
            </button>
        </p>
        <p>
            <button onClick={decrement}>
                Decrement
            </button>
        </p>
        <p>
            <button onClick={asyncIncrement}>
                Async Increment
            </button>
        </p>
        <p>
            <button onClick={asyncDecrement}>
                Async Decrement
            </button>
        </p>
        <p>
            <label>
                Step
                <input onChange={e => setStep(e.target.value)} value={step} />
            </label>
        </p>
        <p>
            <label>
                Delay
                <input onChange={e => setDelay(e.target.value)} value={delay} />
            </label>
        </p>
    </div>
);

const mapStateToProps = (state) => ({
    n: state.get('n'),
    step: state.get('step'),
    delay: state.get('delay')
});

const mapDispatchToProps = {
    increment,
    decrement,
    asyncIncrement,
    asyncDecrement,
    setDelay,
    setStep
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
