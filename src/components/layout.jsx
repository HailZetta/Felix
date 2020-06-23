import React from 'react';
import { Row, Col, Layout } from 'antd';
import Topbar from './topbar';
import Navbar from './header';

const { Header, Content } = Layout;

const LayoutWrap = ({children}) => {
  return (
    <div>
      <Layout style={{backgroundColor: '#f3f2f0'}}>
        <Topbar />
        <Header style={{backgroundColor: 'transparent'}}>
          <Navbar />
        </Header>
        <Content>
          <Row>
            <Col>
              {children}
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  )
}

export default LayoutWrap;