import React, { Suspense, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';
import TemplateService from '../services/TemplateService';
import { Typography } from 'antd';

const { Text, Link } = Typography;

const Template = ({match, location}) => {
  const {isAuthenticated} = useContext(AuthContext);
  let [templateInfo, setTemplateInfo] = useState();
  const {params: { templateId }} = match;
  
  const { t } = useTranslation();

  useEffect(() => {
    TemplateService.templateListId(templateId).then(data => setTemplateInfo(data));
  }, []);

  const Content = React.lazy(() => import(templateInfo.templateFile.replace('../src/views', '.') + '/index'));

  const getTemplate = () => {
    if (templateInfo) {
      let props = {}
      
      for (let i in templateInfo.content) {
        props[templateInfo.content[i].variable] = '.......................'
      }

      if (templateInfo.status === 'private' && !isAuthenticated) {
        return (
          <div>
            {t('lang') === 'en' ?
              <div>
                <h2>Private Template</h2>
                <Text>Please </Text>
                <Link strong href='/register'>Sign up </Link>
                <Text>or </Text>
                <Link strong href='/login'>Login </Link>
                <Text>to view this template</Text>
              </div>
            :
              <div>
                <h2>Mẫu thiệp giới hạn</h2>
                <Text>Vui lòng </Text>
                <Link strong href='/register'>Đăng ký </Link>
                <Text>hoặc </Text>
                <Link strong href='/login'>Đăng nhập </Link>
                <Text>để xem mẫu thiệp</Text>
              </div>
            }
          </div>
        )
      } else {
        return (
          <div>
            <Suspense fallback={<div>Loading...</div>}>
              <Content {...props} />
            </Suspense>
          </div>
        )
      }
    }
  }

  return (
    <div>
      {getTemplate()}
    </div>
  )
};

export default Template;