/*
 * @Author: your name
 * @Date: 2020-05-13 11:42:35
 * @LastEditTime: 2020-06-17 13:52:19
 * @LastEditors: liangzhanpeng
 * @Description: In User Settings Edit
 * @FilePath: \hooks\src\api\request.js
 */
import { axiosInstance, UrlConfig } from "./config";

/**
 * 验证登录权限模块
 */
export const authenticatedCheck = () => {
  let url = UrlConfig.useOAuth2
    ? UrlConfig.gatewayUrl + "/backendservice/user/authenticatedCheck"
    : UrlConfig.useApiGateway
    ? UrlConfig.gatewayUrl + "/api/User/authenticatedCheck"
    : UrlConfig.webRoot + "/user/authenticatedCheck";
  return axiosInstance.get(url, { crossDomain: true }, { cache: false });
};

/**
 * 数据资源模块
 */

//获取数据资源目录树
export const getAllResourceDirectory = () => {
  return axiosInstance.get(
    UrlConfig.webRoot + "/resourcedirectory/getAllResourceDirectory"
  );
};

//检查excel入库表名是否重复
export const checkTableName = (value) => {
  return axiosInstance.get(
    UrlConfig.dataManageWebRoots + "/data/checkTableName?tableName=" + value
  );
};

//添加业务数据（excel入库）
export const addResourceBusiness = (data) => {
  return axiosInstance.post(
    UrlConfig.webRoot + "/xxljob/addResourceBusiness",
    JSON.stringify(data),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

//新增专题或专题集或要素集或图层
export const addResourceDirectorys = (data) => {
  return axiosInstance.post(UrlConfig.webRoot + "/resourcedirectory/addResourceDirectory",data)
}

//修改数据目录
export const updateResourceDirectory = (data) => {
  return axiosInstance.post(UrlConfig.webRoot + "/resourcedirectory/updateResourceDirectory",data)
}

//删除数据目录
export const deleteResourceDirectory = (data) => {
  return axiosInstance.post(UrlConfig.webRoot + "/resourcedirectory/deleteResourceDirectory",data)
}