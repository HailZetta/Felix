import React, { Component } from 'react';
import { Carousel } from 'antd';

class CarouselTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <Carousel autoplay className='dashboard-carousel'>
        {this.props.content.map((item, index) => (
          <div key={index}>
            <img src={item.image} />
          </div>
        ))}
      </Carousel>
    );
  }
}
 
export default CarouselTemp;