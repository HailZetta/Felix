import React from 'react';
import { Steps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

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
    {title_en: 'Type', title: 'Loại thiệp', slug: 'none'},
    {title_en: 'Template', title: 'Mẫu thiệp', slug: 'template'},
    {title_en: 'Content', title: 'Nội dung', slug: 'content'},
    {title_en: 'Guest', title: 'Khách mời', slug: 'guest'},
    {title_en: 'Payment', title: 'Thanh toán', slug: 'payment'},
    {title_en: 'Finish', title: 'Hoàn thành', slug: 'finish'},
  ])

  return (
    <div className='container p-20'>
      <Steps>
        {data.map((item, index) => {
          if (item.slug === 'none') {
            return (
              <Step title={t('lang') === 'en' ? item.title_en : item.title} key={index} status={item.status} icon={item.icon} />
            )
          } else {
            return (
              <Step title={<Link to={`/invitation-${item.slug}/${props.invitationId}`}>{t('lang') === 'en' ? item.title_en : item.title}</Link>} key={index} status={item.status} icon={item.icon} />
            )
          }
        })}
      </Steps>
    </div>
  );
}
 
export default ProcessStep;