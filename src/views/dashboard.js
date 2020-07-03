import React, { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LayoutWrap from '../components/layout';
import dashboardBanner from '../assets/dashboard-banner.jpg';
import { AuthContext } from '../context/AuthContext';
import CarouselTemp from '../components/carousel';
import { Row, Col, Button, Typography, Divider, Carousel } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import TypeService from '../services/TypeService';
import TemplateService from '../services/TemplateService';
import CardContent from '../components/card';
import premiumIcon from '../assets/premium-icon.png';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const Dashboard = () => {
  let {isAuthenticated, user} = useContext(AuthContext);
  let [typeList, setTypeList] = useState();
  let [templateList, setTemplateList] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    TypeService.typeList().then(data => setTypeList(data));
    TemplateService.templateList().then(data => setTemplateList(data));
  }, []);

  const banner = () => {
    return (
      <CarouselTemp content={[
        {image: dashboardBanner}
      ]} />
    )
  }

  const funcButton = () => {
    return (
      <Row gutter={20} justify={window.innerWidth < 700 ? 'center' : 'end'} className='pt-10'>
        <Col>
          <Link to='/create-invitation'>
            <Button size='large' type='primary' className='text-button button'>
              <PlusOutlined />
              {t('create')}
            </Button>
          </Link>
        </Col>
        <Col className='create-button'>
          <Button size='large' type='dashed' className='text-button'>
            {t('history')}
          </Button>
        </Col>
      </Row>
    )
  }

  const tempList = () => {
    if (typeList && templateList) {
      return (
        <div>
          {typeList.map((item, index) => (
            <div key={index}>
              <Divider orientation='left' className='mt-0'>
                <h3>{t('lang') === 'en' ? item.type_en : item.type}</h3>
              </Divider>
              <Carousel slidesToShow={window.innerWidth < 700 ? 1 : window.innerWidth < 970 ? 2 : 4} autoplay autoplaySpeed={10000} className='pb-30'>
                {templateList.map((template, index) => {
                  for (let i in item.template) {
                    if (item.template[i] === template._id) {
                      let thumbnail = require(template.templateFile.replace('../src/views', '.') + '/thumbnail.jpg');
                      return (
                        <div key={index} className='carousel-slider'>
                          <Link to={'/template/' + `${template._id}`}>
                            <CardContent
                              hoverable={true}
                              cover={
                                <>
                                  {template.status === 'premium' ?
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
                                    <Text>{t('lang') === 'en' ? template.name_en : template.name}</Text>
                                  </Col>
                                  <Col>
                                    <Text strong='true'>{template.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ</Text>
                                  </Col>
                                </Row>
                              }
                            />
                          </Link>
                        </div>
                      )
                    }
                  }
                })}
              </Carousel>
            </div>
          ))}
        </div>
      )
    }
  }

  return (
    <LayoutWrap>
      <div className='container'>
        {user.role === 'user' ? 
          <div>
            {banner()}
            {funcButton()}
            {tempList()}
          </div>
        :
          null
        }
      </div>
    </LayoutWrap>
  )
}

export default Dashboard;