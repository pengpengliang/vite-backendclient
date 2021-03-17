/*
 * @Date: 2020-06-08 14:33:43
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
 */

/**
 *
 * @param {Object} props
 * props接收的参数：
 * iconName(String): icon名称
 */
import React from "react";
const MadeIcon = (props) => {
  return <span className={`icon-${props.iconName}`}></span>;
};

export default MadeIcon;
