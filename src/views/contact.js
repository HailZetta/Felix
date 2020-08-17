import React, { useState } from 'react';
import LayoutWrap from '../components/layout';
import { useTranslation } from 'react-i18next';
import { Row, Col, Input, Form, Button } from 'antd';
import RequireService from '../services/RequireService';
import CreateButton from '../components/create-button';

const { TextArea } = Input;

const Tel = () => {
  const { t } = useTranslation();
  return (
    <a href='tel:0981232180' className='text-black pointer'>
      <h1 className='text-contact'>
        {t('lang') === 'en' ? 'Call us' : 'Điện thoại'}
        <span className='tel'>:&nbsp;098 123 2180</span>
      </h1>
    </a>
  )
}

const Email = () => {
  const { t } = useTranslation();
  return (
    <a href='mailto:support@zetta.com.vn' className='text-black pointer'>
      <h1 className='text-contact'>
        {t('lang') === 'en' ? 'Send us' : 'Email'}
        <span className='email'>:&nbsp;support@zetta.com.vn</span>
      </h1>
    </a>
  )
}

const RequestForm = () => {
  let [request, setRequest] = useState({name: '', tel: '', email: '', request: ''});
  const { t } = useTranslation();

  const requestFormData = [
    {label_en: 'Your name', label: 'Tên của bạn', value: 'name'},
    {label_en: 'Tel', label: 'Điện thoại', value: 'tel'},
    {label_en: 'Email', label: 'Email', value: 'email'},
    {label_en: 'Request', label: 'Yêu cầu', value: 'request', type: 'textarea'},
  ]

  const handleClick = () => {
    RequireService.requireCreate(request);
  };

  return (
    <div>
      <h1 className='text-contact'>or</h1>
      <h1 className='text-contact'>{t('lang') === 'en' ? 'Leave us a message' : 'Gửi yêu cầu'}</h1>
      <Form>
        {requestFormData.map((item, index) => (
          <Form.Item key={index}>
            {item.type === 'textarea' ? 
              <TextArea autoSize={{minRows: 3}} className='form-input' placeholder={t('lang') === 'en' ? item.label_en : item.label} onChange={e => setRequest({
                ...request,
                [item.value]: e.target.value
              })}/>
            :
              <Input className='form-input' placeholder={t('lang') === 'en' ? item.label_en : item.label} onChange={e => setRequest({
                ...request,
                [item.value]: e.target.value
              })}/>
            }
          </Form.Item>
        ))}
        <Form.Item>
          <Button type='primary' block={true} className='button' onClick={handleClick}>{t('lang') === 'en' ? 'Send' : 'Gửi'}</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

const Contact = () => {
  return (
    <LayoutWrap>
      <CreateButton />
      <Row justify='center' align='middle' className='h-95vh'>
        <Col xs={24} md={12}>
          <Row justify='center'>
            <Col xs={22} md={12}>
              <Row justify='center' align='middle'>
                <Col xs={12} lg={24}>
                  {Tel()}
                </Col>
                <Col xs={12} lg={24}>
                  {Email()}
                </Col>
              </Row>
              {RequestForm()}
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={12}>
        </Col>
      </Row>
    </LayoutWrap>
  )
}

export default Contact;