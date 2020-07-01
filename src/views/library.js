import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';
import TemplateService from '../services/TemplateService';
import { Typography, Row, Col } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Topbar from '../components/topbar';
import CardContent from '../components/card';
import premiumIcon from '../assets/premium-icon.png';

const { Text } = Typography;

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
        <Row justify='center' gutter={[20, 20]} className='px-60 py-20'>
          {templateList.map((item, index) => {
            let thumbnail = require(item.templateFile.replace('../src/views', '.') + '/thumbnail.jpg');
            return (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <Link to={'/template/' + `${item._id}`}>
                  <CardContent
                    hoverable={true}
                    cover={
                      <>
                        {item.status === 'premium' ?
                          <Row justify='end' className='position-absolute'>
                            <Col>
                              <img src={premiumIcon} alt='' className='w-45 m-5 p-5 bg-grey-transparent' />
                            </Col>
                          </Row>
                        :
                          null
                        }
                        <img src={thumbnail} alt='' />
                      </>
                    }
                    bordered={true}
                    description={
                      <Row justify='space-between'>
                        <Col>
                          <EditOutlined key="name" className='pr-10'/>
                          <Text>{t('lang') === 'en' ? item.name_en : item.name}</Text>
                        </Col>
                        <Col>
                          <Text strong='true'>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ</Text>
                        </Col>
                      </Row>
                    }
                  />
                </Link>
              </Col>
            )
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