import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LayoutWrap from '../components/layout';
import { Layout, Menu, Row, Col } from 'antd';
import { SketchOutlined, UsergroupAddOutlined, SettingOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout;

const Profile = () => {
  const { t } = useTranslation();
  const SiderArea = () => {
    return (
      <Menu className='pt-20'>
        <Menu.Item key='invitation'>
          <Link to='/invitation'>
            <h3 strong><SketchOutlined className='text-15' />{t('lang') === 'en' ? 'Invitation' : 'Thiệp mời'}</h3>
          </Link>
        </Menu.Item>
        <Menu.Item key='guestlist'>
          <Link to='/guestlist'>
            <h3 strong><UsergroupAddOutlined className='text-15' />{t('lang') === 'en' ? 'Guest List' : 'Khách mời'}</h3>
          </Link>
        </Menu.Item>
        <Menu.Item key='profile'>
          <Link to='/profile'>
            <h3 strong><SettingOutlined className='text-15' />{t('lang') === 'en' ? 'Account' : 'Tài khoản'}</h3>
          </Link>
        </Menu.Item>
      </Menu>
    )
  }

  const ContentArea = () => {
    return (
      <Row justify='center' className='p-20'>
        <Col>Content</Col>
      </Row>
    )
  }

  const DashboardContent = () => {
    return (
      <Layout className='p-20'>
        <Sider>{SiderArea()}</Sider>
        <Content className='pt-50'>{ContentArea()}</Content>
      </Layout>
    )
  }

  return (
    <LayoutWrap>
      {DashboardContent()}
    </LayoutWrap>
  )
}

export default Profile;