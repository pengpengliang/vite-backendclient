/*
 * @Date: 2020-06-01 10:34:03
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
 */ 
import { combineReducers } from "redux";
import { reducer as dataResourceReducer } from "../module/DataResource/store/index";

export default combineReducers({
  dataResource: dataResourceReducer
});