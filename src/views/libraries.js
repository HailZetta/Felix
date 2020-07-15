import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Carousel, Divider, Card, Grid } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import LayoutWrap from '../components/layout';
import TemplateService from '../services/TemplateService';
import TypeService from '../services/TypeService';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-color.png';
import premiumIcon from '../assets/premium-icon.png';

const { useBreakpoint } = Grid;
const { Meta } = Card;

const Banner = () => {
  const { t } = useTranslation();

  return (
    <div className='container'>
      <Row justify='center' align='middle' className='pt-50'>
        <Col xs={22} md={10} className='p-20'>
          <h1 className='text-banner'>{t('lang') === 'en' ? 'Designable Invitation' : 'Designable Invitation'}</h1>
          <h3 >{t('lang') === 'en' ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}</h3>
          <Link to='/create-invitation'>
            <Button type='primary' className='button mt-20'><PlusOutlined />{t('lang') === 'en' ? 'Create New Invitation' : 'Tạo thiệp'}</Button>
          </Link>
        </Col>
        <Col xs={22} md={10}>
          <Carousel autoplay>
            <div className='bg-pink text-white text-center line-h-300'>1</div>
            <div className='bg-pink text-white text-center line-h-300'>2</div>
            <div className='bg-pink text-white text-center line-h-300'>3</div>
          </Carousel>
        </Col>
      </Row>
    </div>
  )
}

const TemplateList = () => {
  let [templateList, setTemplateList] = useState();
  let [typeList, setTypeList] = useState();
  
  const { t } = useTranslation();
  useEffect(() => {
    TypeService.typeList().then(data => setTypeList(data));
    TemplateService.templateList().then(data => setTemplateList(data));
  }, []);

  const breakpoint = useBreakpoint();

  if (typeList) {
    return (
      <div className='pt-50'>
        {typeList.map((item, index) => (
          <div>
            <Divider orientation='left' dashed key={index}>
              <Link to={`/library/` + item.type_en.replace(' ', '-')}>
                <h2>{t('lang') === 'en' ? item.type_en : item.type}</h2>
              </Link>
            </Divider>
            <Carousel draggable autoplay dots={false} slidesToShow={
              breakpoint.lg ? 4 :
              breakpoint.md ? 3 :
              breakpoint.sm ? 2 : 1
            }>
              {item.template ? item.template.map((item, index) => {
                for (let i in templateList) {
                  if (templateList[i]._id === item) {
                    const thumbnail = require(templateList[i].templateFile.replace('../src/views', '.') + '/thumbnail.jpg');
                    return (
                      <div className='p-20'>
                        <Card hoverable cover={
                          <>
                            {templateList[i].status === 'premium' ?
                              <Row justify='end' className='position-absolute'>
                                <Col>
                                  <img src={premiumIcon} alt='' className='w-45 m-5 p-5 bg-grey-transparent' />
                                </Col>
                              </Row>
                            :
                              null
                            }
                            <img src={thumbnail} />
                          </>
                        }>
                          <Meta
                            title={
                              <Row justify='space-between' align='middle'>
                                <Col>
                                  <Link to={`/template/` + item}>
                                    <Row gutter={10} align='middle'>
                                      <Col>
                                        <img src={logo} className='w-20' />
                                      </Col>
                                      <Col>
                                        <span className='text-black'>{t('lang') === 'en' ? templateList[i].name_en : templateList[i].name}</span>
                                      </Col>
                                    </Row>
                                  </Link>
                                </Col>
                                <Col>
                                  {templateList[i].status === 'premium' ?
                                    <span className='uppercase text-golden bold'>Premium</span>
                                  : null}
                                </Col>
                              </Row>
                            }
                          />
                        </Card>
                      </div>
                    )
                  }
                }
              }) : null}
            </Carousel>
          </div>
        ))}
      </div>
    )
  }
}

const FooterSection = () => {
  return (
    <div className='bg-black' id='footer'>
      <div className='container'>
        <Row justify='center' align='middle' className='h-100vh'>
          <Col>
            <a href='/create-invitation'>
              <h1 className='text-white pointer highlight'>Get Started!</h1>
            </a>
          </Col>
        </Row>
        <h4 className='text-white text-center m-0 pb-20'>&copy; Felix Studio</h4>
      </div>
    </div>
  )
}

const Libraries = () => {
  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (document.getElementById('footer')) {
        const footer = document.getElementById('footer').offsetTop;
        const scrollCheck = window.scrollY > footer;
        if (scrollCheck) {
          for (let i = 0; i < document.getElementsByClassName('changeText').length; i++) {
            document.getElementsByClassName('changeText')[i].style.color = '#fff';
          }
        } else {
          for (let i = 0; i < document.getElementsByClassName('changeText').length; i++) {
            document.getElementsByClassName('changeText')[i].style.color = '#000';
          }
        }
      }
    })
  });

  return (
    <LayoutWrap>
      {Banner()}
      {TemplateList()}
      {FooterSection()}
    </LayoutWrap>
  )
}

export default Libraries;