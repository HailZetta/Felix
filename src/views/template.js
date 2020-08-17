import React, { Suspense, useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';
import TemplateService from '../services/TemplateService';
import { Typography, Row, Col, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import LayoutWrap from '../components/layout';
import sampleImage from '../assets/logo.png';

const { Text } = Typography;

const Template = ({match, location}) => {
  const {isAuthenticated} = useContext(AuthContext);
  let [templateInfo, setTemplateInfo] = useState();
  const {params: { templateId }} = match;
  
  const { t } = useTranslation();

  useEffect(() => {
    TemplateService.templateListId(templateId).then(data => setTemplateInfo(data));
  }, []);

  const Content = React.lazy(() => import(templateInfo.templateFile.replace('../src/views', '.') + '/index.js'));

  const getTemplate = () => {
    if (templateInfo) {
      let props = []
      for (let i in templateInfo.content) {
        if (templateInfo.content[i].type === 'Date') {
          props[templateInfo.content[i].variable] = moment(12/12/2012);
        } else if (templateInfo.content[i].type === 'Time') {
          props[templateInfo.content[i].variable] = moment(12);
        } else if (templateInfo.content[i].type === 'Image') {
          props[templateInfo.content[i].variable] = sampleImage;
        } else {
          props[templateInfo.content[i].variable] = '.......................';
        }
      }

      const thumbnail = require(templateInfo.templateFile.replace('../src/views', '.') + '/thumbnail.jpg');

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
                    <Row gutter={20} align='middle'>
                      <Col>
                        <span className='uppercase text-golden bold px-20'>{templateInfo.status === 'premium' ? 'Premium' : null}</span>
                      </Col>
                      <Col>
                        <Link to={`/template-preview/${templateInfo._id}`} target='_blank'>
                          <Button type='primary' className='button'>{t('lang') === 'en' ? 'Preview' : 'Xem thiệp'}</Button>
                        </Link>
                      </Col>
                      <Col>
                        <Link to='/invitation-create'>
                          <Button type='primary' className='button'><PlusOutlined />{t('lang') === 'en' ? 'Create New Invitation' : 'Tạo thiệp'}</Button>
                        </Link>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className='pt-10'>
                  <Col span={24}>
                    <img src={thumbnail} alt='' className='w-100p' />
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