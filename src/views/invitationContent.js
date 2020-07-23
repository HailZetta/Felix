import React, { useState, useEffect, lazy, Suspense } from 'react';
import LayoutWrap from '../components/layout';
import InvitationService from '../services/InvitationService';
import ProcessStep from '../components/step';
import TemplateService from '../services/TemplateService';
import { Row, Col, DatePicker, TimePicker, Input, Button, Form, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import ModalTemp from '../components/modal';
import { Link } from 'react-router-dom';

const InvitationContent = ({match, location}) => {
  let [invitation, setInvitation] = useState();
  let [template, setTemplate] = useState();
  let [visible, setVisible] = useState(false);
  const {params: { id }} = match;
  const { t } = useTranslation();
  const PreviewContent = lazy(() => import(template.templateFile.replace('../src/views', '.') + '/index'));

  useEffect(() => {
    InvitationService.invitationListId(id).then(data => {
      setInvitation(data);
      TemplateService.templateListId(data.template).then(data => setTemplate(data))
    })
  }, []);

  const handleSave = () => {
    InvitationService.invitationUpdate({...invitation, status: 2}, id);
  }

  const handlePreview = () => {
    setVisible(true);
  }
  
  const ContentForm = () => {
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };

    const tailLayout = {
      wrapperCol: { offset: 4, span: 20 },
    };

    if (template) {
      return (
        <div className='container'>
          <h1 className='pt-50 text-highlight text-center text-weight-300'>{t('lang') === 'en' ? 'Invitation Content' : 'Nội dung thiệp'}</h1>
          <Row justify='center' className='px-20'>
            <Col xs={24} md={12}>
              <Form {...layout}>
                {template.content.map((item, index) => (
                  <Form.Item label={item.name} key={index}>
                    {item.type === 'Date' ? 
                      <DatePicker value={invitation.content ? moment(invitation.content[item.variable]) : null} format='DD/MM/YYYY' onChange={value => setInvitation({
                        ...invitation,
                        content: {
                          ...invitation.content,
                          [item.variable]: moment(value)
                        }
                      })} />
                    : item.type === 'Time' ?
                      <TimePicker value={invitation.content ? moment(invitation.content[item.variable], 'DD/MM/YYYY') : null} onChange={value => setInvitation({
                        ...invitation,
                        content: {
                          ...invitation.content,
                          [item.variable]: moment(value, 'DD/MM/YYYY')
                        }
                      })} />
                    : item.type === 'Image' ?
                      <Input
                        type='file'
                        onChange={e => setInvitation({
                          ...invitation,
                          content: {
                            ...invitation.content,
                            // [item.variable]: moment(value, 'DD/MM/YYYY')
                          }
                        })}
                      />
                    :
                      <Input value={invitation.content ? invitation.content[item.variable] : null} onChange={e => setInvitation({
                        ...invitation,
                        content: {
                          ...invitation.content,
                          [item.variable]: e.target.value
                        }
                      })} />
                    }
                  </Form.Item>
                ))}
                <Form.Item {...tailLayout}>
                  {invitation.content ?
                    <Space size='middle'>
                      <Link to={`/invitation-guest/${id}`}>
                        <Button type='primary' className='button' onClick={handleSave}>{t('save')}</Button>
                      </Link>
                      <Button type='primary' className='button' onClick={handlePreview}>{t('preview')}</Button>
                    </Space>
                  : null}
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      )
    }
  }

  const previewModal = () => {
    const style = { top: 20 };
    const handleCancel = () => {
      setVisible(false);
    };

    if (template) {
      return (
        <ModalTemp
          title={t('lang') === 'en' ? template.name_en : template.name}
          visible={visible}
          handleCancel={handleCancel}
          footer={null}
          style={style}
        >
          <div className='container'>
            <Suspense fallback={<div>Loading...</div>}>
              <PreviewContent {...invitation.content} />
            </Suspense>
          </div>
        </ModalTemp>
      )
    }
  }

  return (
    <LayoutWrap>
      <ProcessStep status={invitation ? invitation.status : null} />
      {ContentForm()}
      {previewModal()}
    </LayoutWrap>
  )
}

export default InvitationContent;