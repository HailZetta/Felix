import React from 'react';
import { Row, Col, Layout } from 'antd';
import Topbar from './topbar';

const { Content } = Layout;

const LayoutWrap = ({children}) => {
  return (
    <div>
      <Layout style={{backgroundColor: '#fff'}}>
        <Topbar />
        <Content>
          <Row>
            <Col span={24}>
              {children}
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  )
}

export default LayoutWrap;