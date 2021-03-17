/*
 * @Author: your name
 * @Date: 2020-05-13 10:07:58
 * @LastEditTime: 2021-03-16 17:39:19
 * @LastEditors: liangzhanpeng
 * @Description: In User Settings Edit
 * @FilePath: \hooks\src\api\config.js
 */
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { Spin, Modal } from "antd";
import style from "./ajax.less";
let loadingDiv; //loading容器
//let authError = 0; //认证失败计数
// 请求添加遮罩
let ajaxCount = 0; //loading计数
const showFullScreenLoading = () => {
  if (ajaxCount === 0) {
    loadingDiv = document.createElement("div");
    document.body.appendChild(loadingDiv);
    ReactDOM.render(
      <div className={style.loadingDiv}>
        <Spin className={style.loading} size="large" delay={500}/>
      </div>,
      loadingDiv
    );
  }
  ajaxCount++;
};
const tryHideFullScreenLoading = () => {
  if (ajaxCount < 0) {
    return;
  }
  ajaxCount--;
  if (ajaxCount === 0) {
    ReactDOM.unmountComponentAtNode(loadingDiv);
    loadingDiv.parentNode.removeChild(loadingDiv);
    loadingDiv = null;
  }
};

// axios的实例及拦截器配置
const axiosInstance = axios.create({
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  showFullScreenLoading();
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => {
    tryHideFullScreenLoading();
    return res.data;
  },
  (error) => {
    tryHideFullScreenLoading();
    if (error.response.status === 401) {
      Modal.warning({
        title: "操作超时，请重新登录。",
        onOk() {
          /* eslint-disable */
          location.hash = "#/login";
          /* eslint-enable */
          // if (!config.useOAuth2) {
          //   if (location.hash != "#/login") {
          //     authError = 0;
          //     location.hash = "#/login";
          //   }
          // } else {
          //   location.href = config.gatewayUrl + "/logout";
          // }
        },
      });
      //authError = 1;
      return Promise.reject(error);
    }
    if (error.response.status === 403) {
      //授权失败
      Modal.warning({
        title: "您没有权限，请重新登录。",
        onOk() {
          // if (!config.useOAuth2) {
          //   if (location.hash != "#/login") {
          //     authError = 0;
          //     location.hash = "#/login";
          //   }
          // } else {
          //   $.ajax({
          //     url: config.oauthUrl,
          //     method: "get",
          //     crossDomain: true,
          //     xhrFields: {
          //       withCredentials: true
          //     },
          //     success: function(res) {
          //       location.href = config.gatewayUrl + "/logout";
          //     }
          //   });
          // }
        },
      });
     // authError = 1;
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export { axiosInstance };

const configBaseUrl = 'http://47.106.120.152:8080';
const UrlConfig = {
  originWebRoot: configBaseUrl,
  DevBaseUrl: configBaseUrl,
  gatewayUrl: configBaseUrl + '/apigateway',
  webRoot: configBaseUrl + '/apigateway' + '/backendservice',
  openapiclientUrl: configBaseUrl + '/apigateway' + '/openapiservice',
  clientRoot: configBaseUrl + '/apigateway' + '/dataportalservice',
  taskManagmentUrl: configBaseUrl + '/apigateway' + '/xxljob/',
  modelUrl: configBaseUrl + '/backendclient_map/#/',
  dataManageWebRoots: configBaseUrl + '/service3', //代表datamanage数据资源
}

export {UrlConfig}