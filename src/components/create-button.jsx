import React from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const CreateButton = () => {
  const { t } = useTranslation();
  return (
    <div className='create-button-wrap'>
      <Link to='/invitation-create'>
        <Button type='primary' className='create-button text-12'>{t('lang') === 'en' ? 'Create Invitation' : 'Tạo thiệp'}</Button>
      </Link>
    </div>
    
  )
}

export default CreateButton;