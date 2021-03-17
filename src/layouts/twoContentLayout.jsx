/*
 * @Author: liangzhanpeng
 * @Date: 2020-04-21 13:19:58
 * @LastEditTime: 2021-03-16 17:54:57
 * @LastEditors: liangzhanpeng
 * @Description: 用于运维常见的左右两栏的布局
 * @FilePath: \backendclient\src\layouts\twoContentLayout.js
 */
import React from "react";
import style from "./twoContentLayout.module.less";
/**
 *
 * @param {Object} props
 * props接收的参数：
 * left(Compoents): 左边组件
 * right(Compoents): 右边组件
 * leftTop(Compoents)： 左上角选择系统组件
 * hasSelectSystem(Boolean)： 是否在左上角有选择系统
 * width(Number): 左边组件宽度
 * positionTop(Number || >0): 用于控制右边组件的top值（仅用于不传左边组件 右边组件铺满全屏的情况）
 */
function TwoContentLayout(props) {
  return (
    <div className={style.container}>
      {props.hasSelectSystem ? (
        <div className={style.leftTop}>{props.leftTop}</div>
      ) : null}
      <div
        className={style.content}
        style={{ top: props.hasSelectSystem ? "70px" : props.positionTop ? props.positionTop + "px" : "0px" }}
      >
        {props.left ? (
          <div
            className={style.left}
            style={{ width: props.width ? props.width + "px" : "400px" }}
          >
            {props.left}
          </div>
        ) : null}

        <div
          className={style.right}
        >
          {props.right}
        </div>
      </div>
    </div>
  );
}
export default TwoContentLayout;
