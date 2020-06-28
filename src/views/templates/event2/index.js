import React, { Component } from 'react';
import thumbnail from './thumbnail.jpg';

class TemplateContent extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <div>
        <h3>Tên cô dâu: {this.props.bride_name}</h3>
        <h3>Tên chú rể: {this.props.groom_name}</h3>
        <img src={thumbnail} />
      </div>
    );
  }
}
 
export default TemplateContent;