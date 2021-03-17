/*
 * @Author: your name
 * @Date: 2020-05-12 09:43:18
 * @LastEditTime: 2021-03-16 17:35:13
 * @LastEditors: liangzhanpeng
 * @Description: In User Settings Edit
 * @FilePath: \new-backendclient\src\module\DataResource\index.js
 */
import React from "react";
import style from "./index.module.less";
import TwoContentLayout from "../../../src/layouts/twoContentLayout";
import HeaderLayout from "../../../src/layouts/headerLayout";
import DataResourceTree from './LeftComponent/dataResourceTree'
import DataResourceBtnGroup from './LeftComponent/dataResourceBtnGroup'
import RightComponent from "./RightComponent/index"
const DataResource = () => {

  return (
    <div className={style.dataResource}>
      <TwoContentLayout
        left={<HeaderLayout title={"数据目录"}  content={<DataResourceTree />} btnGroup={<DataResourceBtnGroup/>}/>}
        right={<RightComponent />}
      ></TwoContentLayout>
    </div>
  );
};

export default React.memo(DataResource);
