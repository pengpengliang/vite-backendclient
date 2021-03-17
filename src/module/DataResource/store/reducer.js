/*
 * @Date: 2020-06-01 10:55:33
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
 */
const initialState = {
  treeData: [],
  treeSearch: "",
  autoExpandParent: false,
  expandedKeys: [],
  selectedKeys: [],
  selectedNode: {type: -1},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "DataResourceTreeData":
      return {
        ...state,
        treeData: action.data,
      };
    case "DataResourceTreeSearch":
      return {
        ...state,
        treeSearch: action.treeSearch,
      };
    case "DataResourceExpandedKeys":
      return {
        ...state,
        expandedKeys: action.expandedKeys,
      };
    case "DataResourceSelectedKeys":
      return {
        ...state,
        selectedKeys: action.selectedKeys,
      };
    case "DataResourceSelectedNode":
      return {
        ...state,
        selectedNode: action.selectedNode,
      };
    default:
      return state;
  }
};

export default reducer;
