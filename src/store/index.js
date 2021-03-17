/*
 * @Date: 2020-06-01 10:28:33
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
 */ 
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;