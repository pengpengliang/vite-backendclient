/*
 * @Date: 2020-06-09 14:35:50
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
 */

import React, { useState, useMemo } from "react";
import { UrlConfig } from "../../../api/config";
import { checkTableName,addResourceBusiness,addResourceDirectorys,updateResourceDirectory } from "../../../api/request";
import {changeTreeStatus,getDataResourceTreeData} from '../store/action'
import { connect } from "react-redux";
import { Form, Upload, Button, message, Input, Select } from "antd";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

const AddExcelModal = ({ onCancel, selectedNode }) => {
  const [fileList, setFileList] = useState([]);
  const [fileName, setFileName] = useState("");
  const [filePath, setFilePath] = useState("");
  const [showDataKey, setShowKey] = useState(false);
  const [dataKeyList, setDataKeyList] = useState([]);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    let obj = {
      dataPath: filePath,
      pid: selectedNode.id,
      tableName: values.tableName,
      title: values.title,
      type: 4,
      pKey: values.dataKey,
    };
    addResourceBusiness(obj).then(res=>{
      if (res.ReturnCode == 0) {
        message.success("请到任务管理模块查看进度",3);
        onCancel()
      }
    })
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    if (e.file.status == "done" && e.file.response.ReturnCode == 0) {
      return [e.file];
    } else if (e.file.status == "uploading") {
      return [e.file];
    } else {
      return [];
    }
  };

  const uploadProps = {
    name: "file",
    action: UrlConfig.dataManageWebRoots + "/data/uploadExcel",
    data: new FormData().append("file", fileList[0]),
    withCredentials: true,
    onChange(info) {
      if (info.file.status == "done") {
        if (info.file.response.ReturnCode == 0) {
          let res = info.file.response.Data;
          setFileName(info.file.name);
          setFilePath(res.dataPath);
          setShowKey(true);
          setDataKeyList(res.filedList);
          form.setFieldsValue({
            title: info.file.name,
          });
        } else {
          setFileList([]);
          setFileName("");
          setFilePath("");
          setShowKey(false);
          setDataKeyList([]);
          form.setFieldsValue({
            title: "",
          });
          message.error(
            info.file.response.Message || `${info.file.name}上传失败`
          );
        }
      } else if (info.file.status == "error") {
        setFileList([]);
        setFileName("");
        setFilePath("");
        setShowKey(false);
        setDataKeyList([]);
        form.setFieldsValue({
          title: "",
        });
        message.error(`${info.file.name}上传失败`);
      }
    },
    fileList,
  };
  return (
    <div>
      <Form
        form={form}
        name="AddExcelModal"
        {...formItemLayout}
        onFinish={onFinish}
      >
        <Form.Item label="上传EXCEL文件：" required>
          <Form.Item
            style={{ display: "inline-block", width: "60%", margin: "0px" }}
          >
            <Input value={fileName} disabled />
          </Form.Item>
          <Form.Item
            name="upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: "请上传EXCEL文件",
              },
            ]}
            style={{ display: "inline-block", margin: "0 8px" }}
          >
            <Upload {...uploadProps} showUploadList={false}>
              <Button type="primary">上传</Button>
            </Upload>
          </Form.Item>
        </Form.Item>
        {showDataKey ? (
          <Form.Item
            name="dataKey"
            label="数据主键："
            rules={[
              {
                required: true,
                message: "请选择数据主键",
              },
            ]}
          >
            <Select placeholder="请选择数据主键">
              {dataKeyList.map((item) => {
                return (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        ) : null}

        <Form.Item
          label="表名："
          name="tableName"
          rules={[
            {
              required: true,
              message: "请填写表名",
            },
            ({ getFieldValue }) => ({
              validator(rule, value, callback) {
                checkTableName(value)
                  .then((res) => {
                    if (res.ReturnCode == 0) {
                      // return Promise.resolve();
                      callback();
                    } else {
                      // return Promise.reject(res.Message || "表名已被占用");
                      callback(res.Message || "表名已被占用");
                    }
                  })
                  .catch((error) => {
                    // return Promise.reject(error || "表名已被占用");

                    callback(error || "表名已被占用");
                  });
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="数据名："
          name="title"
          rules={[
            {
              required: true,
              message: "请填写数据名",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 24, offset: 6 }}
          style={{ textAlign: "right" }}
        >
          <Button style={{ marginRight: "8px" }} onClick={onCancel}>
            取消
          </Button>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const AddTreeDataModal = ({title,type,onCancel, selectedNode,getDataResourceTreeData,changeTreeStatus}) => {
  const onFinish = (values) => {
    let obj = {
      pid: selectedNode.id,
      title: values.title,
      type: type
    };
    addResourceDirectorys(obj).then(res=>{
      if (res.ReturnCode === 0) {
        getDataResourceTreeData();
        changeTreeStatus(res.Data);
        onCancel();
        message.success("添加成功")
      } else {
        message.error(res.Message || "添加失败");
        onCancel();
      }
    }).catch(error=>{
      message.error(error || "添加失败");
      onCancel();
      console.log(error);
    })
  };

  return (
    <div>
      <Form
        name="AddTreeDataModal"
        {...formItemLayout}
        onFinish={onFinish}
      >
        <Form.Item
          label={title}
          name="title"
          rules={[
            {
              required: true,
              message: `请填写${title}`,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 24, offset: 6 }}
          style={{ textAlign: "right" }}
        >
          <Button style={{ marginRight: "8px" }} onClick={onCancel}>
            取消
          </Button>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

const EditTreeDataModal = ({onCancel, selectedNode,getDataResourceTreeData}) => {
  const onFinish = (values) => {
    let obj = {
      id: selectedNode.id,
      title: values.title
    };
    updateResourceDirectory(obj).then(res=>{
      if (res.ReturnCode === 0) {
        getDataResourceTreeData();
        onCancel();
        message.success("修改成功")
      } else {
        message.error(res.Message || "修改失败");
        onCancel();
      }
    }).catch(error=>{
      message.error(error || "修改失败");
      onCancel();
      console.log(error);
    })
  };

  return (
    <div>
      <Form
        name="AddTreeDataModal"
        {...formItemLayout}
        initialValues={{
          title: selectedNode.title
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="名称"
          name="title"
          rules={[
            {
              required: true,
              message: "请输入修改后的名称!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 24, offset: 6 }}
          style={{ textAlign: "right" }}
        >
          <Button style={{ marginRight: "8px" }} onClick={onCancel}>
            取消
          </Button>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}


const SimpleModal = ({ modalType, onCancel, selectedNode,changeTreeStatus,getDataResourceTreeData }) => {
  switch (modalType) {
    case "excel":
      return <AddExcelModal onCancel={onCancel} selectedNode={selectedNode} />;
    case "menu":
      return <AddTreeDataModal onCancel={onCancel} selectedNode={selectedNode} getDataResourceTreeData={getDataResourceTreeData} changeTreeStatus={changeTreeStatus} type={"0"} title={"目录名称"}/>
    case "dataset":
      return <AddTreeDataModal onCancel={onCancel} selectedNode={selectedNode} getDataResourceTreeData={getDataResourceTreeData} changeTreeStatus={changeTreeStatus} type={"5"} title={"要素集名称"}/>
    case "layer":
      return <AddTreeDataModal onCancel={onCancel} selectedNode={selectedNode} getDataResourceTreeData={getDataResourceTreeData} changeTreeStatus={changeTreeStatus} type={"6"} title={"图层名称"}/>
    case "edit":
      return <EditTreeDataModal onCancel={onCancel} selectedNode={selectedNode} getDataResourceTreeData={getDataResourceTreeData}/>
    default:
      return null;
  }
};

const mapStateToProps = (state) => {
  return {
    selectedNode: state.dataResource.selectedNode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeTreeStatus(node){
      dispatch(changeTreeStatus(node))
    },
    getDataResourceTreeData(){
      dispatch(getDataResourceTreeData())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(SimpleModal));
