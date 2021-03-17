/*
 * @Date: 2020-06-03 16:20:14
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
 */

//树结构相关函数
export const TreeUtil = {
  //构建Tree
  toTree: function (data, keyName, pkeyName, name, rootName) {
    let tree = [];
    let expandedKeys = [];
    let treeHash = {};
    let selectedNode = null;
    if (name) {
      data.map((item) => {
        if (item[pkeyName] === null) {
          item[name] = rootName;
        }
      });
    }
    data.map((i) => {
      i.children = [];
      i.parentNode = null;
      treeHash[i[keyName]] = i;
    });
    data.map((i) => {
      if (!i[pkeyName] && i[pkeyName] !== 0) {
        tree.push(i);
      }
    });

    data.map((i) => {
      if (
        (i[pkeyName] || (i[pkeyName] === 0 && treeHash[i[pkeyName]])) &&
        treeHash[i[pkeyName]]
      ) {
        treeHash[i[pkeyName]].children.push(i);
        i.parentNode = treeHash[i[pkeyName]];
      }
    });

    if (tree.length > 0 && tree.length < 3) {
      //只有1个或2个根节点才展开
      tree.map((i) => {
        expandedKeys.push(i[keyName].toString());
      });
    }
    if (tree.length > 0) {
      selectedNode = tree[0];
    }
    return {
      tree: tree,
      expandedKeys: expandedKeys,
      selectedNode: selectedNode,
    };
  },
};

//防抖函数
const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
      clearTimeout(timer);
    }, delay);
  };
};

export { debounce };


