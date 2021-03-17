/*
 * @Date: 2020-06-01 10:55:17
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
 */

import { getAllResourceDirectory } from "../../../api/request";
//获取数据目录树
export const getDataResourceTreeData = () => {
  return (dispatch) => {
    getAllResourceDirectory()
      .then((res) => {
        if (res.ReturnCode === 0) {
          dispatch({
            type: "DataResourceTreeData",
            data: res.Data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// 改变搜索值
export const changeDataResourceTreeSearch = (value) => {
  return (dispatch) => {
    dispatch({
      type: "DataResourceTreeSearch",
      treeSearch: value,
    });
  };
};

//树展开
export const onExpand = (expandedKeys) => {
  return (dispatch) => {
    dispatch({
      type: 'DataResourceExpandedKeys',
      expandedKeys
    })
  }
}

//树选择
export const onSelect = (selectedKeys,e) => {
  return (dispatch) => {
    if (e.selected) {
      dispatch({
        type: 'DataResourceSelectedKeys',
        selectedKeys
      })
      dispatch({
        type: 'DataResourceSelectedNode',
        selectedNode: e.node.dataRef
      })
    } else {
      dispatch({
        type: 'DataResourceSelectedKeys',
        selectedKeys: []
      })
      dispatch({
        type: 'DataResourceSelectedNode',
        selectedNode: {type:-1}
      })
    }
    
  }
}

//改变树的状态
export const changeTreeStatus = (node) => {
  return (dispatch,getState) => {
    let expandedKeys = getState().dataResource.expandedKeys;
    if (!expandedKeys.includes(node.pid)) {
      expandedKeys.push(node.pid)
    } 
    dispatch({
      type: 'DataResourceSelectedKeys',
      selectedKeys: [node.id]
    });
    dispatch({
      type: 'DataResourceSelectedNode',
      selectedNode: node
    })
    dispatch({
      type: 'DataResourceExpandedKeys',
      expandedKeys
    })
  }
}
