import React, { Suspense, useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';
import TemplateService from '../services/TemplateService';
import { Typography, Row, Col, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import LayoutWrap from '../components/layout';

const { Text } = Typography;

const Template = ({match, location}) => {
  const {isAuthenticated} = useContext(AuthContext);
  let [templateInfo, setTemplateInfo] = useState();
  const {params: { templateId }} = match;
  
  const { t } = useTranslation();

  useEffect(() => {
    TemplateService.templateListId(templateId).then(data => setTemplateInfo(data));
  }, []);

  const Content = React.lazy(() => import(templateInfo.templateFile.replace('../src/views', '.') + '/index'));

  const getTemplate = () => {
    if (templateInfo) {
      let props = [{position: 'absolute'}]
      
      for (let i in templateInfo.content) {
        if (templateInfo.content[i].type === 'Date') {
          props[templateInfo.content[i].variable] = moment(12/12/2012);
        } else if (templateInfo.content[i].type === 'Time') {
          props[templateInfo.content[i].variable] = moment(12);
        } else {
          props[templateInfo.content[i].variable] = '.......................';
        }
      }

      if (templateInfo.status === 'private' && !isAuthenticated) {
        return (
          <div className='container pt-50'>
            {t('lang') === 'en' ?
              <div>
                <h2>Private Template</h2>
                <Text>Please </Text>
                <Link strong href='/register'>Sign up </Link>
                <Text>or </Text>
                <Link strong href='/login'>Login </Link>
                <Text>to view this template</Text>
              </div>
            :
              <div>
                <h2>Mẫu thiệp giới hạn</h2>
                <Text>Vui lòng </Text>
                <Link strong href='/register'>Đăng ký </Link>
                <Text>hoặc </Text>
                <Link strong href='/login'>Đăng nhập </Link>
                <Text>để xem mẫu thiệp</Text>
              </div>
            }
          </div>
        )
      } else {
        return (
          <div className='container'>
                <Row justify='center'>
                  <Col className='bg-white p-20' style={{border: '1px rgba(0, 0, 0, 0.1) solid'}} span={24}>
                    <Row justify='space-between'>
                      <Col>
                        <h3>{t('lang') === 'en' ? `Template: ${templateInfo.name_en}` : `Mẫu thiệp: ${templateInfo.name}`}</h3>
                      </Col>
                      <Col>
                        <span className='uppercase text-golden bold px-20'>{templateInfo.status === 'premium' ? 'Premium' : null}</span>
                        <Link to='/invitation-create'>
                          <Button type='primary' className='button'><PlusOutlined />{t('lang') === 'en' ? 'Create New Invitation' : 'Tạo thiệp'}</Button>
                        </Link>
                      </Col>
                    </Row>
                    <Row className='pt-10'>
                      <Col span={24}>
                        <Suspense fallback={<div>Loading...</div>}>
                          <Content {...props} />
                        </Suspense>
                      </Col>
                    </Row>
                  </Col>
                </Row>
          </div>
        )
      }
    }
  }

  return (
    <LayoutWrap>
      <div className='pt-50'>
        {getTemplate()}
      </div>
    </LayoutWrap>
  )
};

export default Template;