/*
 * @Author: liangzhanpeng
 * @Date: 2020-04-22 10:48:55
 * @LastEditTime: 2021-03-16 17:54:25
 * @LastEditors: liangzhanpeng
 * @Description: 用于运维常见的头部横条 下面有内容的块组件
 * @FilePath: \backendclient\src\layouts\headerLayout.js
 */
import React from 'react'
import style from "./headerLayout.module.less";
/**
 *
 * @param {Object} props
 * props接收的参数：
 * title(String): 头部名称
 * btnGroup(Components): 按钮组件
 * content(Components)：内容组件
 */
function HeaderLayout(props){
    return(
        <div className={style.headerContainer}>
            <div className={style.header}>
                <div className={style.headerTitle}>
                    {props.title}
                </div>
                <div className={style.headerBtn}>
                    {props.btnGroup}
                </div>
            </div>
            <div className={style.content}>
                {props.content}
            </div>
        </div>
    )
}
export default HeaderLayout