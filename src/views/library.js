import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LayoutWrap from '../components/layout';
import TypeService from '../services/TypeService';
import TemplateService from '../services/TemplateService';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo-color.png';
import premiumIcon from '../assets/premium-icon.png';
import { Card, Row, Col, Button, Carousel } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Meta } = Card;

const Library = ({match, location}) => {
  let [typeData, setTypeData] = useState();
  let [templateData, setTemplateData] = useState();
  const { t } = useTranslation();
  const {params: { type_en }} = match;
  const typeEn = type_en.replace('-', '%20');
  if (typeEn) {
    TypeService.typeListName(typeEn).then(data => setTypeData(data));
  }

  useEffect(() => {
    TemplateService.templateList().then(data => setTemplateData(data));
  }, []);

  const Banner = () => {
    const { t } = useTranslation();
    if (typeData) {
      return (
        <div className='container'>
          <Row justify='center' align='middle' className='pt-50'>
            <Col xs={22} md={10}>
              <Carousel autoplay>
                <div className='bg-pink text-white text-center line-h-300'>1</div>
                <div className='bg-pink text-white text-center line-h-300'>2</div>
                <div className='bg-pink text-white text-center line-h-300'>3</div>
              </Carousel>
            </Col>
            <Col xs={22} md={10} className='p-20'>
              <h1 className='text-banner'>{t('lang') === 'en' ? typeData.type_en : typeData.type}</h1>
              <h3 >{t('lang') === 'en' ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}</h3>
              <Link to='/invitation-create'>
                <Button type='primary' className='button mt-20'><PlusOutlined />{t('lang') === 'en' ? 'Create New Invitation' : 'Tạo thiệp'}</Button>
              </Link>
            </Col>
          </Row>
        </div>
      )
    }
  }

  const GetType = () => {
    if (typeData && typeData.template) {
      return (
        <Row justify='center' className='pt-50'>
          {typeData.template.map((item, index) => {
            for (let i in templateData) {
              if (templateData[i]._id === item) {
                const thumbnail = require(templateData[i].templateFile.replace('../src/views', '.') + '/thumbnail.jpg');
                return (
                  <Col xs={24} sm={12} md={8} lg={6} className='p-20' key={index}>
                    <Card hoverable cover={
                      <>
                        {templateData[i].status === 'premium' ?
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
                    }>
                      <Meta
                        title={
                          <Row justify='space-between' align='middle'>
                            <Col>
                              <Link to={`/template/` + item}>
                                <Row gutter={10} align='middle'>
                                  <Col>
                                    <img src={logo} className='w-20' alt='' />
                                  </Col>
                                  <Col>
                                    <span className='text-black'>{t('lang') === 'en' ? templateData[i].name_en : templateData[i].name}</span>
                                  </Col>
                                </Row>
                              </Link>
                            </Col>
                            <Col>
                              {templateData[i].status === 'premium' ?
                                <span className='uppercase text-golden bold'>Premium</span>
                              : null}
                            </Col>
                          </Row>
                        }
                      />
                    </Card>
                  </Col>
                )
              }
            }
          })}
        </Row>
      )
    }
  }

  const FooterSection = () => {
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
      <div className='bg-black' id='footer'>
        <div className='container'>
          <Row justify='center' align='middle' className='h-100vh'>
            <Col>
              <a href='/invitation-create'>
                <h1 className='text-white pointer highlight'>Get Started!</h1>
              </a>
            </Col>
          </Row>
          <h4 className='text-white text-center m-0 pb-20'>&copy; Felix Studio</h4>
        </div>
      </div>
    )
  }
  
  return(
    <LayoutWrap>
      {Banner()}
      {GetType()}
      {FooterSection()}
    </LayoutWrap>
  )
}

export default Library;