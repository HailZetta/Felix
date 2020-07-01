import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TypeService from '../services/TypeService';
import { Row, Col, Button, Space } from 'antd';
import { Link } from 'react-router-dom';

const ChooseCategory = () => {
  let [position, setPosition] = useState({x: null, y: null});
  let [typeData, setTypeData] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    TypeService.typeList().then(data => setTypeData(data));
  }, []);

  const moveMouse = (e) => {
    setPosition({
      x: e.clientX,
      y: e.clientY
    })
  };

  const checkMouseMove = () => {
    return (
      <div style={{backgroundColor: '#555', width: '500px', height: '500px', color: '#fff', margin: '100px'}} onMouseMove={moveMouse}>
        <p>PositionX: {position.x}</p>
        <p>PositionY: {position.y}</p>
      </div>
    )
  }

  const typeList = () => {
    if (typeData) {
      return (
        <Row justify='center'>
          <Col>
            <Space size='large'>
              {typeData.map((item, index) => (
                <Link to={'/choose-template/' + `${item._id}`} key={index}>
                  <Button type='primary'>{t('lang') === 'en' ? item.type_en : item.type}</Button>
                </Link>
              ))}
            </Space>
          </Col>
        </Row>
      )
    }
  }

  return (
    <div>
      <h1 className='text-center'>{t('lang') === 'en' ? 'Choose Category' : 'Chọn loại thiệp'}</h1>
      {typeList()}
    </div>
  )
}

export default ChooseCategory;