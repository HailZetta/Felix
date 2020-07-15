import React, { useContext, useState, useEffect } from 'react';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Avatar, Typography, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'rc-texty/assets/index.css';
import { AuthContext } from '../context/AuthContext';
import '../css/style.css';
import logo from '../assets/logo.png';
import AuthService from '../services/AuthService';
import ProfileService from '../services/ProfileService';
import DropdownTemp from './dropdown';
import Navbar from './navbar';

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

  useEffect(() => {
    ProfileService.profileListId(user ? user.profile : null).then(data => setProfile(data));
  }, []);

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
                <h3 strong='true'>Hi, {profile.fullname}!</h3>
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
                <Text className='pointer' strong='true'>{t('profile')}</Text>
              </Link>
            </Col>
          </Row>
          <Row justify='start' className='pt-10'>
            <Col>
              <Text type='text' onClick={logOut} strong='true' className='pointer'>{t('logout')}</Text>
            </Col>
          </Row>
        </div>
      </DropdownTemp>
    )
  }

  const topbarButton = () => {
    return (
      <Row justify='end' align='middle'>
        {/* <Col className='px-20 language-button'>
          <Text type='secondary' onClick={() => changeLanguage('vi')} className='pointer' strong='true'>VI</Text>
          <Text type='secondary' strong='true'> / </Text>
          <Text type='secondary' onClick={() => changeLanguage('en')} className='pointer' strong='true'>EN</Text>
        </Col> */}
        <Col className='px-20'>
          {isAuthenticated ?
            <Dropdown overlay={profileDropdown()} placement='bottomRight'>
              <Avatar icon={<UserOutlined />} />
            </Dropdown>
          :
            <div>
              <Link to='/register'>
                <Button type='text'>
                  <Text className='changeText' strong='true'>{t('register')}</Text>
                </Button>
              </Link>
              <Link to='/login'>
                <Button type='text'>
                  <Text className='changeText' strong='true'>{t('login')}</Text>
                </Button>
              </Link>
            </div>
          }
        </Col>
      </Row>
    )
  }

  const topbarLogo = () => {
    return (
      <Row align='middle'>
        <Col>
          <Link to='/' className='topbar-brand changeText'>
            {/* <img className='p-10 pt-20 w-60 z-index-1' src={logo} /> */}
            Felix
          </Link>
        </Col>
      </Row>
      
    )
  }

  return (
    <div id='topbar-wrap'>
      <Row justify='space-between' align='middle' id='topbar' className='mt-20'>
        <Col md={6}>
          <Navbar />
        </Col>
        <Col>
          {topbarLogo()}
        </Col>
        <Col md={6}>
          {topbarButton()}
        </Col>
      </Row>
    </div>
  )
}

export default Topbar;