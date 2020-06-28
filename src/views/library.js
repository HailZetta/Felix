import React, { Suspense, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';
import TemplateService from '../services/TemplateService';
import { Typography, Row, Col, Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import thumbnail from './templates/event2/thumbnail.jpg';
import Topbar from '../components/topbar';

const { Text, Link } = Typography;
const { Meta } = Card;

const Library = () => {
  const {isAuthenticated} = useContext(AuthContext);
  let [templateList, setTemplateList] = useState();

  const { t } = useTranslation();

  useEffect(() => {
    TemplateService.templateList().then(data => setTemplateList(data));
  }, []);

  // const thumbnail = React.lazy(() => import(templateList[1].templateFile.replace('../src/views', '.') + '/thumbnail.jpg'));

  const listTemplate = () => {
    if (templateList && !isAuthenticated) {
      return (
        <Row justify='center' gutter={20} className='px-60'>
          {templateList.map((item, index) => {
            if (item.status === 'public') {
              console.log(item.name)
              return (
                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                  <Card
                    hoverable={true}
                    cover={ <img src={thumbnail} alt="" /> }
                  >
                    <Meta description={[
                      <Row justify='start' gutter={10}>
                        <Col>
                          <EditOutlined key="name"/>
                        </Col>
                        <Col>
                          <Text strong='true'>{t('lang') === 'en' ? item.name_en : item.name}</Text>
                        </Col>
                      </Row>
                    ]} />
                  </Card>
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