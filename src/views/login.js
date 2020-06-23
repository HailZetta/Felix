import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Input, Form, Button, Typography, Checkbox, Alert } from 'antd';
import {AuthContext} from '../context/AuthContext';
import AuthService from '../services/AuthService';
import '../css/style.css';
import Topbar from '../components/topbar';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const Login = (props) => {
  let [user, setUser] = useState({email: '', password: ''});
  let [message, setMessage] = useState(null);
  let [checked, setChecked] = useState(true);
  const authContext = useContext(AuthContext);

  const { t } = useTranslation();

  const loginFunc = (e) => {
    e.preventDefault();
    AuthService.login(user).then(data => {
      const {isAuthenticated, user, message} = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push('/dashboard');
      } else {
        setMessage(message);
      }
    });
  }

  const handleCheckbox = () => {
    setChecked(!checked);
  }

  const loginForm = () => {
    return (
      <div>
        <Row justify='center'>
          <Col>
            <h1 className='text-highlight'>{t('login')}</h1>
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

              {/* Remember me checkbox - use passport-remember-me strategy */}
              {/* <Form.Item>
                <Checkbox checked={checked} onChange={handleCheckbox}>{t('remember')}</Checkbox>
              </Form.Item> */}

              <Form.Item>
                <Button size='large' type='primary' onClick={loginFunc} block={true} className='text-button button'>{t('login')}</Button>
              </Form.Item>
            </Form>
            <h3>
              <Text type='secondary'>{t('lang') === 'en' ? 'Not have account yet? ' : 'Bạn chưa có tài khoản? '}</Text>
              <Link to='/register'>
                <Text type='secondary' underline={true}>{t('register')}</Text>
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
          {loginForm()}
        </Col>
      </Row>
    </div>
  )
}

export default Login;