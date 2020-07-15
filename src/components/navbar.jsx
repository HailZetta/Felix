import React, { useState, useContext } from 'react';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';
import { Menu, Typography, Drawer, Row, Col } from 'antd';
import { BarsOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import Texty from 'rc-texty';

const { Text } = Typography;


const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
}

const MenuContent = () => {
  let [current, setCurrent] = useState();
  let [visible, setVisible] = useState(false);
  let [show, setShow] = useState(false);
  const {isAuthenticated, user} = useContext(AuthContext);
  const { t } = useTranslation();

  const adminMenuItemList = [
    {label_en: 'Dashboard', label: 'Trang quản lý', key: 'dashboard'},
    {label_en: 'Admin Panel', label: 'Admin Panel', key: 'admin-panel'},
    {label_en: 'Library', label: 'Thư viện', key: 'libraries'}
  ];

  const userMenuItemList = [
    {label_en: 'Dashboard', label: 'Trang quản lý', key: 'dashboard'},
    {label_en: 'Library', label: 'Thư viện', key: 'libraries'},
    {label_en: 'Contact', label: 'Liên hệ', key: 'contact'}
  ];

  const publicMenuItemList = [
    {label_en: 'Library', label: 'Thư viện', key: 'libraries'},
    {label_en: 'Contact', label: 'Liên hệ', key: 'contact'}
  ];

  let menuItemList = [];
  if (!isAuthenticated) {
    menuItemList = publicMenuItemList;
  } else if (user.role === 'admin') {
    menuItemList = adminMenuItemList;
  } else {
    menuItemList = userMenuItemList;
  };

  const handleClick = (e) => {
    setCurrent(e.key)
  }

  const onClose = () => {
    setVisible(false)
  }

  const mouseDown = () => {
    setShow(true);
  }

  const mouseLeave = () => {
    setShow(false);
  }

  const horizontalMenu = () => {
    return (
      <Menu onClick={handleClick} selectedKeys={current} mode='horizontal' className='bg-transparent'>
        {menuItemList.map(item => (
          <Menu.Item key={item.key}>
            <Link to={'/' + `${item.key}`}>
              <Text strong='true'>{t('lang') === 'en' ? item.label_en : item.label}</Text>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    )
  }

  const verticalMenu = () => {
    return (
      <Row align='bottom' id='vertical-navbar'>
        <Col span={24}>
          <Row>
            <Col>
              <Menu onClick={handleClick} selectedKeys={current} mode='vertical-left' className='bg-transparent' id='vertical-navbar'>
                <Menu.Item key='home'>
                  <Link to='/'>
                    <Row>
                      <Col onMouseOver={mouseDown} onMouseLeave={mouseLeave}>
                        <img src={logo} id='vertical-navbar-logo' />
                      </Col>
                      <Col>
                        <Texty type='right' mode='sync' duration={400} className='pl-10 text-white uppercase'>
                          {show && 'Felix'}
                        </Texty>
                      </Col>
                    </Row>
                  </Link>
                </Menu.Item>
                {menuItemList.map(item => (
                  <Menu.Item key={item.key}>
                    <Link to={'/' + `${item.key}`}>
                      <Text className='text-white uppercase'>{t('lang') === 'en' ? item.label_en : item.label}</Text>
                    </Link>
                  </Menu.Item>
                ))}
              </Menu>
            </Col>
          </Row>
          <Row justify='space-between' className='pb-50'>
            <Col className='px-20'>
              <Text type='secondary' onClick={() => changeLanguage('vi')} className='text-white pointer button-text'>VI</Text>
              <Text type='secondary' className='text-white'> / </Text>
              <Text type='secondary' onClick={() => changeLanguage('en')} className='text-white pointer button-text'>EN</Text>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
  
  return (
    <div>
      <div className='horizontal-menu'>{horizontalMenu()}</div>
      <div className='vertical-menu changeText'>
        <BarsOutlined className='navbar-toggle' onClick={() => setVisible(true)} />
      </div>
      <Drawer visible={visible} placement='left' closable={true} onClose={onClose} id='menu-drawer'>
        {verticalMenu()}
      </Drawer>
    </div>
  )
}

const Navbar = () => {
  return (
    <div>
      {MenuContent()}
    </div>
  )
}

export default Navbar;