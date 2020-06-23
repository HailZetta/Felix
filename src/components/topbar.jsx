import React, { useContext, useState, useEffect } from 'react';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Avatar, Typography, Dropdown, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AuthContext } from '../context/AuthContext';
import '../css/style.css';
import AuthService from '../services/AuthService';
import DropdownTemp from './dropdown';

const { Text } = Typography;

const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
}

const Topbar = () => {
  let [profile, setProfile] = useState();
  const {isAuthenticated, user, setIsAuthenticated, setUser} = useContext(AuthContext);
  const { t } = useTranslation();

  const logOut = () => {
    AuthService.logout().then(data => {
      if(data.success){
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  }

  const profileDropdown = () => {
    return (
      <DropdownTemp>
        <div className='p-30'>
          <Row justify='center'>
            <Col>
              <Avatar icon={<UserOutlined />} />
            </Col>
          </Row>
          {profile && profile.fullname ?
            <Row justify='center' className='pt-10'>
              <Col>
                <h3 strong={true}>Hi, {profile.fullname}!</h3>
              </Col>
            </Row>
          :
            null
          }
          <Row justify='center' className='pt-10'>
            <Col>
              {user.email}
            </Col>
          </Row>
          <Row justify='start' className='pt-20'>
            <Col>
              <Link to='/profile'>
                <Text className='pointer' strong={true}>{t('profile')}</Text>
              </Link>
            </Col>
          </Row>
          <Row justify='start' className='pt-10'>
            <Col>
              <Text type='text' onClick={logOut} strong={true} className='pointer'>{t('logout')}</Text>
            </Col>
          </Row>
        </div>
      </DropdownTemp>
    )
  }

  const topbarButton = () => {
    return (
      <Row justify='end' gutter={20} align='middle'>
        <Col>
          <Text type='secondary' onClick={() => changeLanguage('vi')} className='pointer' strong={true}>VI</Text>
          <Text type='secondary' strong={true}> / </Text>
          <Text type='secondary' onClick={() => changeLanguage('en')} className='pointer' strong={true}>EN</Text>
        </Col>
        <Col>
          {isAuthenticated ?
            <Dropdown overlay={profileDropdown()} placement='bottomRight'>
              <Avatar icon={<UserOutlined />} />
            </Dropdown>
          :
            <div>
              <Link to='/register'>
                <Button type='text'>{t('register')}</Button>
              </Link>
              <Link to='/login'>
                <Button type='text'>{t('login')}</Button>
              </Link>
            </div>
          }
        </Col>
      </Row>
    )
  }

  console.log(user);

  return (
    <Row justify='end' className='container pt-10'>
      <Col>
        {topbarButton()}
      </Col>
    </Row>
  )
}

export default Topbar;