/*
 * @Author: liangzhanpeng
 * @Date: 2020-05-12 08:57:56
 * @LastEditTime: 2020-05-19 08:45:15
 * @LastEditors: liangzhanpeng
 * @Description: 系统导航栏加头部 页面中间部分加上路由
 * @FilePath: \new-backendclient\src\module\Home\index.js
 */
import React, { useState, useEffect } from "react";
import { HashRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config"; //renderRoutes 读取路由配置转化为 Route 标签
import routes from "../../routes/index";
import style from "./home.module.less";
import SystemLogo from "../../assets/image/systemLogo.png";
import SystemLogoThumbail from "../../assets/image/logo.png";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Header, Sider, Content } = Layout;

const Home = (props) => {
  const [collapsed, setCollapsed] = useState(false); //导航栏开关

  const toggle = () => {
    let bool = collapsed ? false : true;
    setCollapsed(bool);
  }; //导航栏开关函数

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    let timer = setInterval(() => {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let now = new Date();
      let days = now.getDay();
      let weeks = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      let week = weeks[days];
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      hour = hour < 10 ? "0" + hour : hour;
      minute = minute < 10 ? "0" + minute : minute;
      let time =
        year + "年" + month + "月" + day + "日" + week + hour + ":" + minute;
      setCurrentTime(time);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={style.rootContainer}>
      <Layout className={style.h100}>
        <Sider trigger={null} collapsible collapsed={collapsed} width={270}>
          {collapsed ? (
            <div className={style.logo}>
              <img src={SystemLogoThumbail} alt="图片" />
            </div>
          ) : (
            <div className={style.logo}>
              <img src={SystemLogo} alt="图片" />
            </div>
          )}
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className={style.header}>
            {collapsed ? (
              <div className={style.trigger}>
                <MenuUnfoldOutlined
                  onClick={toggle}
                  className={style.triggerIcon}
                />
              </div>
            ) : (
              <div className={style.trigger}>
                <MenuFoldOutlined
                  onClick={toggle}
                  className={style.triggerIcon}
                />
              </div>
            )}
            <div className={style.showInfo}>
              <em>{currentTime}</em>
              <span>
                <UserOutlined className={style.userIcon} />
              </span>
              <span>管理员</span>
              <span>退出</span>
            </div>
          </Header>
          <Content className={style.siteLayoutBackground}>
            <HashRouter>{renderRoutes(routes)}</HashRouter>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default React.memo(Home);
