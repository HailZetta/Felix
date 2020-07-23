import { Component } from 'react';

class AnimateText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: '',
      index: 0,
    }
  }

  render() {
    const { item, index } = this.state;
    const { contentList } = this.props;
    setTimeout(() => {
      if (index >= contentList.length) {
        this.setState({index: 0})
      } else {
        this.setState({
          item: contentList[index],
          index: index + 1,
        })
      }
    }, 2000);

    return item ? item : '...';
  }
}
 
export default AnimateText;