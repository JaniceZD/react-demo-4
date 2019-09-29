import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";

import "./styles.css";

let reducers = (state, action) => {
  state = state || {
    money: {
      amount: 100000
    }
  };
  switch (action.type) {
    case "pay":
      return {
        money: {
          amount: state.money.amount - action.payload
        }
      };
    default:
      return state;
  }
};

let store = createStore(reducers);

class App extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className="app">
        <Big store={this.props.store} />
        <Small store={this.props.store} />
      </div>
    );
  }
}

function Big(props) {
  return (
    <div className="papa">
      <span>大爸：</span>
      <span className="amount">{props.store.money.amount}</span>
      <button>消费</button>
      <Son2 money={props.store.money} />
    </div>
  );
}

function Small(props) {
  return (
    <div className="papa">
      <span>小爸：</span>
      <span className="amount">{props.store.money.amount}</span>
      <button>消费</button>
      <Son3 money={props.store.money} />
    </div>
  );
}

class Son2 extends React.Component {
  constructor(props) {
    super();
  }
  x() {
    //发布
    store.dispatch({
      type: "pay",
      payload: 100
    });
  }
  render() {
    return (
      <div className="son">
        <span>儿子2：</span>
        <span>{this.props.money.amount}</span>
        <button onClick={this.x.bind(this)}>消费</button>
      </div>
    );
  }
}
function Son3(props) {
  return (
    <div className="son">
      <span>儿子3：</span>
      <span>{props.money.amount}</span>
      <button>消费</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
function render() {
  ReactDOM.render(<App store={store.getState()} />, rootElement);
}

render();
store.subscribe(render); //订阅
