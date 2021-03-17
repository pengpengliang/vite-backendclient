/*
 * @Date: 2020-06-17 15:12:20
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
 */ 
import React from 'react';
import style from "./index.less";
import { connect } from "react-redux";

const RightComponent = ({selectedNode}) => {
    switch (selectedNode.type) {
      case -1:
        return null
      default:
        return (
          <div>
            123
          </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    selectedNode: state.dataResource.selectedNode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(RightComponent));