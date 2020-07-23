import React from 'react';
import { Steps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Step } = Steps;

const ProcessStep = (props) => {
  const { t } = useTranslation();
  const processData = (data) => {
    const newData = data.map((item, index) => {
      if (index === props.status + 1 && props.status !== 4) {
        return {
          ...item,
          status: 'process',
          icon: <LoadingOutlined />
        }
      } else if (index <= props.status || props.status === 4) {
        return {
          ...item,
          status: 'finish'
        }
      } else {
        return {
          ...item,
          status: 'wait'
        }
      }
    })
    return newData;
  }


  const data = processData([
    {title_en: 'Type', title: 'Loại thiệp'},
    {title_en: 'Template', title: 'Mẫu thiệp'},
    {title_en: 'Content', title: 'Nội dung'},
    {title_en: 'Guest', title: 'Khách mời'},
    {title_en: 'Payment', title: 'Thanh toán'},
    {title_en: 'Finish', title: 'Hoàn thành'},
  ])

  return (
    <div className='container p-20'>
      <Steps>
        {data.map((item, index) => (
          <Step title={t('lang') === 'en' ? item.title_en : item.title} key={index} status={item.status} icon={item.icon} />
        ))}
      </Steps>
    </div>
  );
}
 
export default ProcessStep;