import React, { Component } from 'react';
import { Card } from 'antd';

const { Meta } = Card;

class CardContent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <Card
                hoverable={this.props.hoverable}
                cover={this.props.cover}
                bordered={this.props.bordered}
            >
                <Meta description={this.props.description} />
            </Card>
        );
    }
}
 
export default CardContent;