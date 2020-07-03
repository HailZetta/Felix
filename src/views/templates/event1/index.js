import React, { Component } from 'react';
import './style.css';
import logo from './vinhomes-golden-river-logo.png';

class TemplateContent extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() { 
    return (
      <div>
        <img src={logo} alt="" />
        <p>Tổ chức: {this.props.inviter}</p>
        <p>Tên khách hàng: {this.props.guest}</p>
        <p>Thời gian: {this.props.time.format('DD/MM/YYYY')}</p>
        <p>Địa điểm: {this.props.address}</p>
      </div>
    );
  }
}
 
export default TemplateContent;