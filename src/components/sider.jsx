import React from 'react';
import { Menu } from 'antd';
import { SketchOutlined, UsergroupAddOutlined, SettingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const SiderWrap = () => {
  const { t } = useTranslation();
  return (
    <Menu className='pt-20'>
      <Menu.Item key='invitation'>
        <Link to='/invitation'>
          <h3><SketchOutlined className='text-15' />{t('lang') === 'en' ? 'Invitation' : 'Thiệp mời'}</h3>
        </Link>
      </Menu.Item>
      <Menu.Item key='guestlist'>
        <Link to='/guestlist'>
          <h3><UsergroupAddOutlined className='text-15' />{t('lang') === 'en' ? 'Guest List' : 'Khách mời'}</h3>
        </Link>
      </Menu.Item>
      <Menu.Item key='profile'>
        <Link to='/profile'>
          <h3><SettingOutlined className='text-15' />{t('lang') === 'en' ? 'Account' : 'Tài khoản'}</h3>
        </Link>
      </Menu.Item>
    </Menu>
  )
}

export default SiderWrap;