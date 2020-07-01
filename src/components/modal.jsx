import React, { Component } from 'react';
import Modal from 'antd/lib/modal/Modal';

class ModalTemp extends Component {
  render() { 
    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
      >
        {this.props.children}
      </Modal>
    )
  }
}

export default ModalTemp;