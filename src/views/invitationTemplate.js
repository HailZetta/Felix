import React, { useEffect, useState } from 'react';
import ProcessStep from '../components/step';
import InvitationService from '../services/InvitationService';
import TemplateService from '../services/TemplateService';
import TypeService from '../services/TypeService';
import LayoutWrap from '../components/layout';
import { Row, Col, Card } from 'antd';
import logo from '../assets/logo-color.png';
import premiumIcon from '../assets/premium-icon.png';
import { useTranslation } from 'react-i18next';

const { Meta } = Card;

const ChooseTemplate = ({match, location}) => {
  let [invitation, setInvitation] = useState();
  let [templateId, setTemplateId] = useState([]);
  let [templateList, setTemplateList] = useState([]);
  const {params: { id }} = match;

  const { t } = useTranslation();

  useEffect(() => {
    InvitationService.invitationListId(id).then(data => {
      setInvitation(data);
      TypeService.typeListId(data.type).then(data => setTemplateId(data.template));
    });
    TemplateService.templateList().then(data => setTemplateList(data));
  }, []);

  const handleClick = (templateId) => {
    const updateInvitation = {
      ...invitation,
      template: templateId,
      status: 1,
    };
    InvitationService.invitationUpdate(updateInvitation, id);
    window.location = `/invitation-content/${id}`;
  };

  const TemplateArea = () => {
    return (
      <div className='container'>
        <h1 className='pt-50 text-highlight text-center text-weight-300'>{t('lang') === 'en' ? 'Pick the template' : 'Chọn mẫu thiệp'}</h1>
        <Row justify='space-between' gutter={[20, 20]} className='px-20'>
          {templateId ? templateId.map((item, index) => {
            for (let i in templateList) {
              if (templateList[i]._id === item) {
                const thumbnail = require(templateList[i].templateFile.replace('../src/views', '.') + '/thumbnail.jpg');
                return (
                  <Col xs={24} sm={12} md={8} lg={6} key={index}>
                    <Card
                      hoverable
                      onClick={() => handleClick(item)}
                      cover={
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
                      }
                    >
                      <Meta
                        title={
                          <Row justify='space-between' align='middle'>
                            <Col>
                              <Row gutter={10} align='middle'>
                                <Col>
                                  <img src={logo} className='w-20' />
                                </Col>
                                <Col>
                                  <span className='text-black'>{t('lang') === 'en' ? templateList[i].name_en : templateList[i].name}</span>
                                </Col>
                              </Row>
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
                  </Col>
                )
              }
            }
          }) : null}
        </Row>
      </div>
    )
  }

  return (
    <LayoutWrap>
      <ProcessStep status={invitation ? invitation.status : null} />
      {TemplateArea()}
    </LayoutWrap>
  )
}

export default ChooseTemplate;