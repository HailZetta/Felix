import React, { useState, useContext } from 'react';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';
import { Menu, Typography, Drawer, Row, Col } from 'antd';
import { BarsOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
}

const MenuContent = () => {
  let [current, setCurrent] = useState();
  let [visible, setVisible] = useState(false);
  const {isAuthenticated, user} = useContext(AuthContext);
  const { t } = useTranslation();

  const adminMenuItemList = [
    {label_en: 'Dashboard', label: 'Trang quản lý', key: 'dashboard'},
    {label_en: 'Admin Panel', label: 'Admin Panel', key: 'admin-panel'},
    {label_en: 'Library', label: 'Thư viện', key: 'library'}
  ];

  const userMenuItemList = [
    {label_en: 'Dashboard', label: 'Trang quản lý', key: 'dashboard'},
    {label_en: 'Library', label: 'Thư viện', key: 'library'},
    {label_en: 'Contact', label: 'Liên hệ', key: 'contact'}
  ];

  const publicMenuItemList = [
    {label_en: 'Library', label: 'Thư viện', key: 'library'},
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
      <div>
        <Menu onClick={handleClick} selectedKeys={current} mode='vertical-right' className='bg-transparent'>
          {menuItemList.map(item => (
            <Menu.Item key={item.key}>
              <Link to={'/' + `${item.key}`}>
                <Text strong='true'>{t('lang') === 'en' ? item.label_en : item.label}</Text>
              </Link>
            </Menu.Item>
          ))}
        </Menu>
        <Row className='vertical-language-button pt-20'>
          <Col className='px-20'>
            <Text type='secondary' onClick={() => changeLanguage('vi')} className='pointer' strong='true'>VI</Text>
            <Text type='secondary' strong='true'> / </Text>
            <Text type='secondary' onClick={() => changeLanguage('en')} className='pointer' strong='true'>EN</Text>
          </Col>
        </Row>
      </div>
    )
  }
  
  return (
    <div>
      <div className='horizontal-menu'>{horizontalMenu()}</div>
      <div className='vertical-menu'>
        <BarsOutlined className='navbar-toggle' onClick={() => setVisible(true)} />
      </div>
      <Drawer visible={visible} placement='right' closable={true} onClose={onClose}>
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