/*
 * @Date: 2020-06-03 14:52:10
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
 */

import React, { useEffect, useState } from "react";
import style from "./dataResourceTree.module.less";
import { connect } from "react-redux";
import {
  getDataResourceTreeData,
  changeDataResourceTreeSearch,
  onExpand,
  onSelect
} from "../store/action";
import { TreeUtil } from "../../../api/util";
import { Tree, Input } from "antd";
import MadeIcon from "../../../layouts/madeIcon";

const Search = Input.Search;
const { TreeNode } = Tree;

const DataResourceTree = (props) => {

  const [dataSourceTreeData, setDataSourceTreeData] = useState([]);

  const { treeData, treeSearch,autoExpandParent,selectedKeys,expandedKeys } = props;

  const { getDataResourceTreeData, changeDataResourceTreeSearch,onSelect,onExpand } = props;

  useEffect(() => {
    getDataResourceTreeData();
  }, []);

  useEffect(() => {
    if (treeData && treeData.length > 0) {
      let copyData = JSON.parse(JSON.stringify(treeData));
      copyData.map((item) => {
        if (item.type == "0" || item.type == "1" || item.type == "2") {
          item.icon = <MadeIcon iconName={"directory"} />;
        } else if (item.type == "3") {
          item.icon = <MadeIcon iconName={"inSpatialData"} />;
        } else if (item.type == "4") {
          item.icon = <MadeIcon iconName={"addsubject"} />;
        } else if (item.type == "5") {
          item.icon = <MadeIcon iconName={"addFeatureSet"} />;
        } else if (item.type == "6") {
          item.icon = <MadeIcon iconName={"addLayer"} />;
        }
      });
      let toTreeData = TreeUtil.toTree(copyData, "id", "pid");
      setDataSourceTreeData(toTreeData.tree);
    }
  }, [treeData]);

  const loop = (data) =>
    data.map((item) => {
      const index = item.title.indexOf(treeSearch);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + treeSearch.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className={style.activeColor}>{treeSearch}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
      if (item.children) {
        return {
          title,
          key: item.id,
          icon: item.icon,
          children: loop(item.children),
          dataRef:item
        };
      }

      return {
        title,
        key: item.id,
        icon: item.icon,
        dataRef:item
      };
    });

  const onChange = (e) => {
    changeDataResourceTreeSearch(e.target.value);
  };
  // const onExpand = (expandedKeys,e) => {
  //   console.log(expandedKeys,e)
  // }
  // const onSelect = (selectedKeys,e) => {
  //   console.log(selectedKeys,e)
  // }
  return (
    <div className={style.dataResourceTreeContent}>
      <Search
        placeholder="搜索"
        onChange={(e) => {
          onChange(e);
        }}
        allowClear
        value={treeSearch}
      />
      <Tree
        showIcon={true}
        treeData={loop(dataSourceTreeData)}
        autoExpandParent={autoExpandParent}
        expandedKeys={expandedKeys}
        selectedKeys={selectedKeys}
        onExpand={onExpand}
        onSelect={onSelect}
        className={style.dataResourceTree}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    treeData: state.dataResource.treeData,
    treeSearch: state.dataResource.treeSearch,
    autoExpandParent: state.dataResource.autoExpandParent,
    expandedKeys: state.dataResource.expandedKeys,
    selectedKeys: state.dataResource.selectedKeys,
    selectedNode: state.dataResource.selectedNode,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDataResourceTreeData() {
      dispatch(getDataResourceTreeData());
    },
    changeDataResourceTreeSearch(value) {
      dispatch(changeDataResourceTreeSearch(value));
    },
    onExpand(expandedKeys){
      dispatch(onExpand(expandedKeys))
    },
    onSelect(selectedKeys,e){
      dispatch(onSelect(selectedKeys,e))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(DataResourceTree));
