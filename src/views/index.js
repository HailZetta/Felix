import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LayoutWrap from '../components/layout';
import { useTranslation } from 'react-i18next';
import { Row, Col, Button, Carousel, Avatar } from 'antd';
import Section2Video from '../assets/Section2Video.mp4';
import Section4Video from '../assets/Section4Video.mp4';
import Section5Video from '../assets/Section5Video.mp4';
import Section6Video from '../assets/Section6Video.mp4';
import Section7Video from '../assets/Section7Video.mp4';
import backgroundImage from '../assets/dashboard-banner.jpg';
import imageSection1 from '../assets/cover.png';
import Animation from '../components/animate';
import AnimateText from '../components/animate-text';

const Section1 = () => {
  const items =['regards', 'charming', 'easily'];
  return (
    <Animation placement='fadeIn' delay={2000} trigger='timeout'>
      <Row justify='center' align='bottom' className='section-part'>
        <Col span={24} className='p-20'>
          <span className='text-section1 text-black'>Make invitation <AnimateText contentList={items} /></span>
        </Col>
      </Row>
    </Animation>
  )
}

const Section2 = () => {
  return (
    <div className='video-section-break' id='section2'>
      <Animation placement='fadeBottom' delay={1500} trigger='timeout'>
        <video autoPlay playsInline loop>
          <source src={Section2Video} type="video/mp4" />
          <source src={Section2Video} type="video/ogg" />
        </video>
      </Animation>
    </div>
  )
}

const Section3 = () => {
  const { t } = useTranslation();
  return (
    <Row justify='center' align='middle' className='py-50'>
      <Col xs={24} md={12} className='p-20'>
        <Row justify='center' className='px-30'>
          <Col xs={24} lg={20}>
            <h1 className='text-22'>{t('lang') === 'en' ? 'In a busy world...' : 'In a busy world... (VI)'}</h1>
            <h2>{t('lang') === 'en' ? 'Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet eget sit amet tellus cras.' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet eget sit amet tellus cras.(VI)'}</h2>
            <Link to='/guide'>
              <h3 className='pt-10'>{t('lang') === 'en' ? 'See how it work' : 'Xem hướng dẫn'}</h3>
            </Link>
          </Col>
        </Row>
      </Col>
      <Col xs={24} md={12} className='p-20 bg-shape'>
        {/* <Animation placement='fadeIn' delay={2500} trigger='scroll'> */}
          <img src={imageSection1} className='w-100p' />
        {/* </Animation> */}
      </Col>
    </Row>
  )
}

const Section4 = () => {
  const { t } = useTranslation();
  return (
    <Row justify='center' align='middle' className='py-50'>
      <Col xs={24} md={10}>
        <Row justify='end'>
          <Col xs={22} lg={24}>
            <video autoPlay playsInline loop className='w-100p'>
              <source src={Section4Video} type="video/mp4" />
              <source src={Section4Video} type="video/ogg" />
            </video>
          </Col>
        </Row>
      </Col>
      <Col xs={24} md={14} className='p-20'>
        <Row justify='center'>
          <Col xs={20} lg={18}>
            <h3 className='uppercase text-grey m-0'>{t('lang') === 'en' ? 'Product Category' : 'Sản phẩm | dịch vụ'}</h3>
            <h1 className='text-22'>{t('lang') === 'en' ? 'Wedding' : 'Wedding'}</h1>
            <h2>{t('lang') === 'en' ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. (VI)'}</h2>
            <h2>{t('lang') === 'en' ?
              <ul>
                <li>Wedding Invitation</li>
                <li>Wedding Website</li>
                <li>Online Wedding Album</li>
              </ul>
            :
              <ul>
                <li>Thiệp cưới</li>
                <li>Wedding Website</li>
                <li>Album ảnh cưới online</li>
              </ul>
            }</h2>
            <Link to='/library/wedding'>
              <h3 className='pt-10'>{t('lang') === 'en' ? 'See all wedding template' : 'Xem tất cả mẫu'}</h3>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

const Section5 = () => {
  const { t } = useTranslation();
  return (
    <Row justify='center' align='middle' className='py-50'>
      <Col xs={24} md={10} className='video-section-break-5-mobile'>
        <Row justify='start'>
          <Col xs={22} lg={24}>
            <video autoPlay playsInline loop className='w-100p'>
              <source src={Section5Video} type="video/mp4" />
              <source src={Section5Video} type="video/ogg" />
            </video>
          </Col>
        </Row>
      </Col>
      <Col xs={24} md={14} className='p-20'>
        <Row justify='center'>
          <Col xs={20} lg={18}>
            <h3 className='uppercase text-grey m-0'>{t('lang') === 'en' ? 'Product Category' : 'Sản phẩm | dịch vụ'}</h3>
            <h1 className='text-22'>{t('lang') === 'en' ? 'Event' : 'Sự kiện'}</h1>
            <h2>{t('lang') === 'en' ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. (VI)'}</h2>
            <h2>{t('lang') === 'en' ?
              <ul>
                <li>Event Invitation</li>
                <li>Event Website</li>
              </ul>
            :
              <ul>
                <li>Thiệp/vé mời</li>
                <li>Website sự kiện</li>
              </ul>
            }</h2>
            <Link to='/library/event'>
              <h3 className='pt-10'>{t('lang') === 'en' ? 'See all event template' : 'Xem tất cả mẫu'}</h3>
            </Link>
          </Col>
        </Row>
      </Col>
      <Col xs={24} md={10} className='video-section-break-5'>
        <Row justify='start'>
          <Col xs={22} lg={24}>
            <video autoPlay playsInline loop className='w-100p'>
              <source src={Section5Video} type="video/mp4" />
              <source src={Section5Video} type="video/ogg" />
            </video>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

const Section6 = () => {
  const { t } = useTranslation();
  return (
    <Row justify='center' align='middle' className='py-50'>
      <Col xs={24} md={10}>
        <Row justify='end'>
          <Col xs={22} lg={24}>
            <video autoPlay playsInline loop className='w-100p'>
              <source src={Section6Video} type="video/mp4" />
              <source src={Section6Video} type="video/ogg" />
            </video>
          </Col>
        </Row>
      </Col>
      <Col xs={24} md={14} className='p-20'>
        <Row justify='center'>
          <Col xs={20} lg={18}>
            <h3 className='uppercase text-grey m-0 changeText'>{t('lang') === 'en' ? 'Product Category' : 'Sản phẩm | dịch vụ'}</h3>
            <h1 className='text-22 changeText'>{t('lang') === 'en' ? 'Party' : 'Party'}</h1>
            <h2 className='changeText'>{t('lang') === 'en' ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. (VI)'}</h2>
            <Link to='/library/party'>
              <h3 className='pt-10 changeText'>{t('lang') === 'en' ? 'See all party template' : 'Xem tất cả mẫu'}</h3>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

const Section7 = () => {
  const { t } = useTranslation();

  return (
    <div id='section7'>
      <Row justify='center' align='middle' className='py-300'>
        <Col xs={24} md={10} className='video-section-break-7-mobile'>
          <Row justify='start'>
            <Col xs={22} lg={24}>
              <video autoPlay playsInline loop className='w-100p'>
                <source src={Section7Video} type="video/mp4" />
                <source src={Section7Video} type="video/ogg" />
              </video>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={14} className='p-20'>
          <Row justify='center'>
            <Col xs={20} lg={18}>
              <h3 className='uppercase m-0 changeText7'>{t('lang') === 'en' ? 'Product Category' : 'Sản phẩm | dịch vụ'}</h3>
              <h1 className='text-22 text-golden'>{t('lang') === 'en' ? 'Personal Design' : 'Thiết kế theo yêu cầu'}</h1>
              <h2 className='changeText7'>{t('lang') === 'en' ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. (VI)'}</h2>
              <div className='pt-10'>
                <Link to='/contact'>
                  <Button type='primary' className='button-golden'>
                    <h3 className='text-black'>{t('lang') === 'en' ? 'Sent request' : 'Gửi yêu cầu liên hệ'}</h3>
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={10} className='video-section-break-7'>
          <Row justify='start'>
            <Col xs={22} lg={24}>
              <video autoPlay playsInline loop className='w-100p'>
                <source src={Section7Video} type="video/mp4" />
                <source src={Section7Video} type="video/ogg" />
              </video>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

const Feedback = () => {
  const style = {
    background: `url(${backgroundImage}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

  return (
    <div style={style} id='feedbackSection'>
      <Carousel autoplay dots={false} style={{backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
        <div>
          <Row justify='center' align='middle' className='h-30vh'>
            <Col>
              <Row justify='center' className='py-20'>
                <Col>
                  <Avatar size='large' icon={<img src={backgroundImage} />} />
                </Col>
              </Row>
              <h2 className='text-white text-center'>Do Nam Trung</h2>
              <h3 className='text-white text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h3>
            </Col>
          </Row>
        </div>
        <div>
          <Row justify='center' align='middle' className='h-30vh'>
            <Col>
              <Row justify='center' className='py-20'>
                <Col>
                  <Avatar size='large' icon={<img src={backgroundImage} />} />
                </Col>
              </Row>
              <h2 className='text-white text-center'>Do Nam Trung</h2>
              <h3 className='text-white text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h3>
            </Col>
          </Row>
        </div>
        <div>
          <Row justify='center' align='middle' className='h-30vh'>
            <Col>
              <Row justify='center' className='py-20'>
                <Col>
                  <Avatar size='large' icon={<img src={backgroundImage} />} />
                </Col>
              </Row>
              <h2 className='text-white text-center'>Do Nam Trung</h2>
              <h3 className='text-white text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h3>
            </Col>
          </Row>
        </div>
      </Carousel>
    </div>
  )
}

const FooterSection = () => {
  return (
    <div className='bg-black'>
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

const Homepage = () => {
  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (document.getElementById('section7')) {
        const scrollSection7 = document.getElementById('section7').offsetTop;
        const scrollSectionFeedback = document.getElementById('feedbackSection').offsetTop;
        const scrollCheck = window.scrollY > scrollSection7 - 500 && window.scrollY < scrollSection7 + 500 || window.scrollY > scrollSectionFeedback;
        if (scrollCheck) {
          document.getElementById('changeBackground').style.backgroundColor = '#000';
          document.getElementById('changeBackground').style.transition = '0.6s';
          for (let i = 0; i < document.getElementsByClassName('changeText').length; i++) {
            document.getElementsByClassName('changeText')[i].style.color = '#fff';
          }
          for (let i = 0; i < document.getElementsByClassName('changeText7').length; i++) {
            document.getElementsByClassName('changeText7')[i].style.color = '#fff';
          }
        } else {
          document.getElementById('changeBackground').style.backgroundColor = '#fff';
          for (let i = 0; i < document.getElementsByClassName('changeText').length; i++) {
            document.getElementsByClassName('changeText')[i].style.color = '#000';
          }
          for (let i = 0; i < document.getElementsByClassName('changeText7').length; i++) {
            document.getElementsByClassName('changeText7')[i].style.color = '#000';
          }
        }
      }
    })
  });

  return (
    <LayoutWrap>
      <div id='changeBackground'>
        {Section1()}
        {Section2()}
        {Section3()}
        {Section4()}
        {Section5()}
        {Section6()}
        {Section7()}
        {Feedback()}
        {FooterSection()}
      </div>
    </LayoutWrap>
  )
}

export default Homepage;