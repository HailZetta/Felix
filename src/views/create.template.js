import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import TypeService from '../services/TypeService';
import { Link } from 'react-router-dom';
import CardContent from '../components/card';
import premiumIcon from '../assets/premium-icon.png';
import TemplateService from '../services/TemplateService';

const { Text } = Typography;

const ChooseTemplate = ({match, location}) => {
  let [type, setType] = useState();
  let [templateData, setTemplateData] = useState();
  const {params: { typeId }} = match;

  const { t } = useTranslation();

  useEffect(() => {
    TypeService.typeListId(typeId).then(data => setType(data));
    TemplateService.templateList().then(data => setTemplateData(data));
  }, []);

  if (type) {
    return (
      <Row justify='center'>
        {type.template.map((item, index) => (
          <Col className='pt-20' key={index}>
            {templateData.map((template, index) => {
              for (let i in item) {
                if (item[i] === template._id) {
                  let thumbnail = require(template.templateFile.replace('../src/views', '.') + '/thumbnail.jpg');
                  return (
                    <Link to={'/template/' + `${item._id}`} key={index}>
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
                  )
                }
              }
            })}
          </Col>
        ))}
      </Row>
    )
  }
}

export default ChooseTemplate;