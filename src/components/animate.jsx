import React, { Component } from 'react';

class Animation extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { placement, trigger } = this.props;
    if (trigger === 'timeout') {
      setTimeout(() => {
        if (document.getElementsByClassName('animateIn').length > 0) {
          if (placement === 'fadeIn') {
            for (let i = 0; i < document.getElementsByClassName('animateIn').length; i++) {
              document.getElementsByClassName('animateIn')[i].style.opacity = 1;
            }
          }
          if (placement === 'fadeLeft') {
            for (let i = 0; i < document.getElementsByClassName('animateLeft').length; i++) {
              document.getElementsByClassName('animateLeft')[i].style.opacity = 1;
              document.getElementsByClassName('animateLeft')[i].style.paddingLeft = 0;
            }
          }
          if (placement === 'fadeRight') {
            for (let i = 0; i < document.getElementsByClassName('animateRight').length; i++) {
              document.getElementsByClassName('animateRight')[i].style.opacity = 1;
              document.getElementsByClassName('animateRight')[i].style.paddingRight = 0;
            }
          }
          if (placement === 'fadeBottom') {
            for (let i = 0; i < document.getElementsByClassName('animateBottom').length; i++) {
              document.getElementsByClassName('animateBottom')[i].style.opacity = 1;
              document.getElementsByClassName('animateBottom')[i].style.paddingTop = 0;
            }
          }
        }
      }, this.props.delay);
    }

    return (
      <div className={
        placement === 'fadeIn' ? 'animateIn' :
        placement === 'fadeLeft' ? 'animateLeft' :
        placement === 'fadeRight' ? 'animateRight' :
        placement === 'fadeBottom' ? 'animateBottom' :
        null
      }>
        {this.props.children}
      </div>
    )
  }
}
 
export default Animation;