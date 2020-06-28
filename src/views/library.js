import React, { Suspense, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';
import TemplateService from '../services/TemplateService';
import { Typography, Row, Col, Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Topbar from '../components/topbar';
import CardContent from '../components/card';
// import thumbnail from './templates/template001/thumbnail.jpg';

const { Text, Link } = Typography;
const { Meta } = Card;

const Library = () => {
  const {isAuthenticated} = useContext(AuthContext);
  let [templateList, setTemplateList] = useState();

  const { t } = useTranslation();

  useEffect(() => {
    TemplateService.templateList().then(data => setTemplateList(data));
  }, []);

  const listTemplate = () => {
    if (templateList) {
      return (
        <Row justify='center' gutter={20} className='px-60'>
          {templateList.map((item, index) => {
            let thumbnail = require(item.templateFile.replace('../src/views', '.') + '/thumbnail.jpg');
            if (!isAuthenticated && item.status === 'public') {
              return (
                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                  <CardContent
                    hoverable={true}
                    cover={ <img src={thumbnail} alt="" /> }
                    bordered={true}
                    description={[
                      <Row justify='start' gutter={10}>
                        <Col>
                          <EditOutlined key="name"/>
                        </Col>
                        <Col>
                          <Text strong='true'>{t('lang') === 'en' ? item.name_en : item.name}</Text>
                        </Col>
                      </Row>
                    ]}
                  />
                </Col>
              )
            } else if (isAuthenticated) {
              return (
                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                  <CardContent
                    hoverable={true}
                    cover={ <img src={thumbnail} alt="" /> }
                    description={[
                      <Row justify='start' gutter={10}>
                        <Col>
                          <EditOutlined key="name"/>
                        </Col>
                        <Col>
                          <Text strong='true'>{t('lang') === 'en' ? item.name_en : item.name}</Text>
                        </Col>
                      </Row>
                    ]}
                  />
                </Col>
              )
            }
          })}
        </Row>
      )
    }
  }

  return (
    <div>
      <Topbar />
      {listTemplate()}
    </div>
  )
};

export default Library;