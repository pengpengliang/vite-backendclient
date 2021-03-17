/*
 * @Date: 2020-06-09 11:25:48
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
 */

import React, { useState } from "react";
import style from "./dataResourceTree.module.less";
import { connect } from "react-redux";
import { deleteResourceDirectory } from "../../../api/request";
import { getDataResourceTreeData, changeTreeStatus } from "../store/action";
import { Tooltip, Modal, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleTwoTone,
} from "@ant-design/icons";
import SimpleModal from "./simpleModal";
const { confirm } = Modal;
const titleDirectory = {
  excel: "excel数据入库",
  space: "空间数据入库",
  menu: "新增目录",
  dataset: "新增要素集",
  layer: "新增图层",
  edit: "修改名称",
};
const BtnGroup = (props) => {
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState("");

  const { selectedNode } = props;

  const showModal = (type) => {
    setVisible(true);
    setModalType(type);
  };

  const handleOk = () => {
    setVisible(false);
    setModalType("");
  };

  const handleCancel = () => {
    setVisible(false);
    setModalType("");
  };

  const deleteTreeData = () => {
    if (!selectedNode.id) {
      message.info("至少选择一项删除");
      return;
    }
    let obj = {
      id: selectedNode.id,
    };
    confirm({
      icon: <QuestionCircleTwoTone />,
      content: `确定删除${selectedNode.title}吗？`,
      onOk() {
        deleteResourceDirectory(obj)
          .then((res) => {
            if (res.ReturnCode === 0) {
              message.success("删除成功！");
              props.getDataResourceTreeData();
              props.changeTreeStatus({ type: '-1' });
            } else {
              message.error("删除失败!");
            }
          })
          .catch((error) => {
            message.error(error || "删除失败");
          });
      },
    });
  };

  return (
    <div className={style.btnGroupContent}>
      <Tooltip title="excel数据入库">
        <div
          className={
            selectedNode.type === 0 ||
            selectedNode.type === 1 ||
            selectedNode.type === 2
              ? style.iconContainer
              : style.hideIcon
          }
          onClick={() => showModal("excel")}
        >
          <span className="icon-addsubject" />
        </div>
      </Tooltip>
      <Tooltip title="空间数据入库">
        <div
          className={
            selectedNode.type === 0 ||
            selectedNode.type === 1 ||
            selectedNode.type === 2
              ? style.iconContainer
              : style.hideIcon
          }
          onClick={() => showModal("space")}
        >
          <span className="icon-inSpatialData"></span>
        </div>
      </Tooltip>
      <Tooltip title="新增目录">
        <div
          className={
            selectedNode.type === -1 ||
            selectedNode.type === 0 ||
            selectedNode.type === 1 ||
            selectedNode.type === 2
              ? style.iconContainer
              : style.hideIcon
          }
          onClick={() => showModal("menu")}
        >
          <span className="icon-adddirectory"></span>
        </div>
      </Tooltip>
      <Tooltip title="新增要素集">
        <div
          className={
            selectedNode.type === 0 ||
            selectedNode.type === 1 ||
            selectedNode.type === 2 ||
            selectedNode.type === 5
              ? style.iconContainer
              : style.hideIcon
          }
          onClick={() => showModal("dataset")}
        >
          <span className="icon-addFeatureSet"></span>
        </div>
      </Tooltip>
      <Tooltip title="新增图层">
        <div
          className={
            selectedNode.type === 0 ||
            selectedNode.type === 1 ||
            selectedNode.type === 2 ||
            selectedNode.type === 5
              ? style.iconContainer
              : style.hideIcon
          }
          onClick={() => showModal("layer")}
        >
          <span className="icon-addLayer"></span>
        </div>
      </Tooltip>
      <Tooltip title="编辑">
        <div
          className={
            selectedNode.type !== -1 ? style.iconContainer : style.hideIcon
          }
          onClick={() => showModal("edit")}
        >
          <EditOutlined />
        </div>
      </Tooltip>
      <Tooltip title="删除" onClick={deleteTreeData}>
        <div className={style.iconContainer}>
          <DeleteOutlined />
        </div>
      </Tooltip>
      <Modal
        title={titleDirectory[modalType]}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        forceRender
        footer={null}
      >
        <SimpleModal modalType={modalType} onCancel={handleCancel} />
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedNode: state.dataResource.selectedNode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeTreeStatus(node) {
      dispatch(changeTreeStatus(node));
    },
    getDataResourceTreeData() {
      dispatch(getDataResourceTreeData());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(BtnGroup));
