import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Input, Form, Button, Typography, Alert } from 'antd';
import AuthService from '../services/AuthService';
import '../css/style.css';
import Topbar from '../components/topbar';
import { Link } from 'react-router-dom';
import LayoutWrap from '../components/layout';

const { Text } = Typography;

const Register = (props) => {
  let [user, setUser] = useState({email: '', password: '', password2: '', role: 'user'});
  let [message, setMessage] = useState(null);

  const { t } = useTranslation();

  const registerFunc = (e) => {
    e.preventDefault();
    if (user.email && user.password && user.password2) {
      AuthService.register(user)
      .then(data => {
        if (data.message) {
          setMessage(data.message[0])
        }
        if (!data.messageError) {
          props.history.push('/login');
        }
      });
    } else {
      setMessage({vi: 'Vui lòng điền đủ tên, email và password', en: 'Fill Name, Email and Password'})
    }
  };

  const registerForm = () => {
    return (
      <div>
        <Row justify='center'>
          <Col>
            <h1 className='text-highlight'>{t('register')}</h1>
          </Col>
        </Row>
        <Row justify='center' className='container mb-20'>
          <Col xs={24} md={7}>
            {message ? <Alert message={t('lang') === 'en' ? message.en : message.vi} type="error" showIcon={true} className='message' /> : null}
          </Col>
        </Row>
        <Row justify='center' className='container'>
          <Col xs={24} md={7}>
            <Form title={t('login')} layout='vertical'>
              <Form.Item>
                <Input size='large' placeholder='Email' value={user.email} type='email' className='form-input' onChange={e => setUser({
                  ...user,
                  email: e.target.value,
                })} />
              </Form.Item>
              <Form.Item>
                <Input.Password size='large' placeholder={t('password')} value={user.password} type='password' className='form-input' onChange={e => setUser({
                  ...user,
                  password: e.target.value,
                })} />
              </Form.Item>
              <Form.Item>
                <Input.Password size='large' placeholder={t('password2')} value={user.password2} type='password' className='form-input' onChange={e => setUser({
                  ...user,
                  password2: e.target.value,
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
    <LayoutWrap>
      <Row justify='center' align='middle' className='p-20 h-70vh'>
        <Col span={24}>
          {registerForm()}
        </Col>
      </Row>
    </LayoutWrap>
  )
}

export default Register;