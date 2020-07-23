import React, { useState, useEffect } from 'react';
import LayoutWrap from '../components/layout';
import { Row, Col, Card } from 'antd';
import typeThumbnail from '../assets/cover.png';
import TypeService from '../services/TypeService';
import InvitationService from '../services/InvitationService';
import { useTranslation } from 'react-i18next';

const { Meta } = Card;

const TypeList = () => {
  let [typeList, setTypeList] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    TypeService.typeList().then(data => setTypeList(data));
  }, []);

  const handleClick = (item) => {
    InvitationService.invitationCreate({type: item._id, status: 0}).then(data => window.location = `/invitation-template/${data}`);
  }

  if (typeList) {
    return (
      <div className='container'>
        <Row justify='center' align='middle' className='h-80vh'>
          <Col>
            <h1 className='text-highlight text-center text-weight-300'>{t('lang') === 'en' ? 'Which type of invitation do you choose?' : 'Bạn đang cần loại thiệp nào?'}</h1>
            <Row justify='space-between' gutter={[20, 20]} className='pt-50 px-20'>
              {typeList.map((item, index) => (
                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                  <Card hoverable cover={<img src={typeThumbnail} alt='' />} onClick={() => handleClick(item)}>
                    <Meta title={t('lang') === 'en' ? item.type_en : item.type} />
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    )
  } else {
    return null;
  }
  
}

const Create = () => {
  return (
    <LayoutWrap>
      {TypeList()}
    </LayoutWrap>
  )
}

export default Create;