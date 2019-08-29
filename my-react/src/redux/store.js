import { createStore } from 'redux';
import counter from 'reducers/counter';

// let store = createStore(counter);
import { combineReducers } from "redux";

let store = createStore(combineReducers({ counter }));

console.log(store.getState());

store.subscribe(()=>{
  console.log(store.getState())
});

export default store;
