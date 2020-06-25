import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Input, Form, Button, Typography } from 'antd';
import ProfileService from '../services/ProfileService';
import '../css/style.css';
import Topbar from '../components/topbar';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const Profile = () => {
  let [profile, setProfile] = useState({fullname: '', tel: '', city: ''});

  const { t } = useTranslation();

  const registerFunc = (e) => {
    e.preventDefault();
    ProfileService.profileCreate(profile)
  };

  const registerForm = () => {
    return (
      <div>
        <Row justify='center' className='container'>
          <Col xs={24} md={7}>
            <Form title={t('login')} layout='vertical'>
              <Form.Item>
                <Input size='large' placeholder={t('name')} value={profile.fullname} type='text' className='form-input' onChange={e => setProfile({
                  ...profile,
                  fullname: e.target.value,
                })} />
              </Form.Item>
              <Form.Item>
                <Input size='large' placeholder={t('tel')} value={profile.tel} type='tel' className='form-input' onChange={e => setProfile({
                  ...profile,
                  tel: e.target.value,
                })} />
              </Form.Item>
              <Form.Item>
                <Input size='large' placeholder={t('city')} value={profile.city} type='text' className='form-input' onChange={e => setProfile({
                  ...profile,
                  city: e.target.value,
                })} />
              </Form.Item>
              
              <Form.Item>
                <Button size='large' type='primary' onClick={registerFunc} block={true} className='text-button button'>{t('login')}</Button>
              </Form.Item>
            </Form>
            <h3>
              <Text type='secondary'>{t('lang') === 'en' ? 'Already has an account? ' : 'Bạn đã có tài khoản? '}</Text>
              <Link to='/login'>
                <Text type='secondary' underline={true}>{t('login')}</Text>
              </Link>
            </h3>
          </Col>
        </Row>
      </div>
    )
  }
  
  return (
    <div>
      <Topbar />
      <Row justify='center' className='p-20'>
        <Col span={24}>
          {registerForm()}
        </Col>
      </Row>
    </div>
  )
}

export default Profile;