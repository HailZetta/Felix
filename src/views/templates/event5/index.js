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
        <h3>{this.props.bride_name}</h3>
        <h3>{this.props.groom_name}</h3>
        <img src={thumbnail} style={{width: '100%'}} />
      </div>
    );
  }
}
 
export default TemplateContent;