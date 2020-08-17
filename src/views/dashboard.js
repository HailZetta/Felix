import React, { useEffect, useState, useContext } from 'react';
import LayoutWrap from '../components/layout';
import { Layout, Menu, Typography, Row, Col, Statistic } from 'antd';
import { SketchOutlined, UsergroupAddOutlined, SettingOutlined } from '@ant-design/icons';
import CarouselTemp from '../components/carousel';
import dashboardBanner from '../assets/dashboard-banner.jpg';
import { useTranslation } from 'react-i18next';
import ProfileService from '../services/ProfileService';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import SiderWrap from '../components/sider';
import CreateButton from '../components/create-button';

const { Sider, Content } = Layout;
const { Text } = Typography;

const Dashboard = () => {
  let [profile, setProfile] = useState(null);
  const {isAuthenticated, user} = useContext(AuthContext);

  const { t } = useTranslation();

  useEffect(() => {
    ProfileService.profileListId(user ? user.profile : null).then(data => setProfile(data));
  }, []);

  const siderArea = () => {
    return (
      <SiderWrap />
    )
  }

  const contentArea = () => {
    return (
      <Row justify='center' className='p-20'>
        <Col span={12} className='text-center'>
          <Statistic title={t('lang') === 'en' ? 'Created Invitation' : 'Số lượng thiệp đã tạo'} value={profile && profile.invitation ? profile.invitation.length : 0} prefix={<SketchOutlined />} />
        </Col>
        <Col span={12} className='text-center'>
          <Statistic title={t('lang') === 'en' ? 'Saved Guest' : 'Khách mời đã lưu'} value={profile && profile.guestlist ? profile.guestlist.length : 0} prefix={<UsergroupAddOutlined /> } />
        </Col>
      </Row>
    )
  }

  const dashboardContent = () => {
    return (
      <Layout className='p-20'>
        <Sider>{siderArea()}</Sider>
        <Content className='pt-50'>{contentArea()}</Content>
      </Layout>
    )
  }

  return (
    <LayoutWrap>
      <CreateButton />
      {dashboardContent()}
    </LayoutWrap>
  )
}

export default Dashboard;