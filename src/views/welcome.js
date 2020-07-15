import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Input, Form, Button } from 'antd';
import ProfileService from '../services/ProfileService';
import '../css/style.css';
import LayoutWrap from '../components/layout';

const Welcome = () => {
  let [profile, setProfile] = useState({fullname: ''});

  const { t } = useTranslation();

  const profileFunc = (e) => {
    e.preventDefault();
    ProfileService.profileCreate(profile)
    window.location = '/dashboard/invitation';
  };

  const profileForm = () => {
    return (
      <div>
        <Row justify='center'>
          <Col>
            <h1 className='text-highlight'>{t('welcome')}</h1>
          </Col>
        </Row>
        <Row justify='center' className='container'>
          <Col xs={24} md={7}>
            <Form title={t('login')} layout='inline'>
              <Form.Item label={t('name-question')}>
                <Input size='large' placeholder={t('name')} value={profile.fullname} type='text' className='form-input' onChange={e => setProfile({
                  ...profile,
                  fullname: e.target.value,
                })} />
              </Form.Item>
              
              <Form.Item>
                <Button size='large' type='primary' onClick={profileFunc} block={true} className='text-button button'>{t('submit')}</Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
  
  return (
    <LayoutWrap>
      <Row justify='center' align='middle' className='p-20 section-part'>
        <Col span={24}>
          {profileForm()}
        </Col>
      </Row>
    </LayoutWrap>
  )
}

export default Welcome;