import React, { useEffect, useState } from 'react';
import LayoutWrap from '../components/layout';
import { Row, Space, Button, Input, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import InvitationService from '../services/InvitationService';
import Invitation from './invitation';

const { TextArea } = Input;

const GuestConfirm = ({match, location}) => {
  let [invitation, setInvitation] = useState();
  let [message, setMessage] = useState();
  let [type1, setType1] = useState('default');
  let [type2, setType2] = useState('default');
  const {params: {invi_id, guest_id}} = match;
  const {t} = useTranslation();

  useEffect(() => {
    InvitationService.invitationListId(invi_id).then(data => setInvitation(data));
  }, []);

  const handleConfirm = (value) => {
    if (value === 'accept') {
      setType1('primary');
      setType2('default');
    } else {
      setType2('primary');
      setType1('default');
    }

    const { guestlist } = invitation;
    for (let i in guestlist) {
      if (guestlist[i].guestId === guest_id) {
        guestlist[i].status = value;
      }
    }
    InvitationService.invitationUpdate(invitation, invi_id);
  };

  const handleSend = () => {
    const { guestlist } = invitation;
    for (let i in guestlist) {
      if (guestlist[i].guestId === guest_id) {
        guestlist[i].message = message;
      }
    }
    InvitationService.invitationUpdate(invitation, invi_id);
  }

  return (
    <LayoutWrap>
      <Row justify='center' align='middle' className='p-20 h-70vh'>
        <Col>
          <Row justify='center'>
            <Col>
              <h4 className='italic text-center'>{t('lang') === 'en' ? 'Thank for your confirmation. It is help for better organization' : 'Cảm ơn bạn đã xác nhận và giúp công tác tổ chức được chu đáo hơn'}</h4>
            </Col>
          </Row>
          <Row justify='center' className='pt-30'>
            <Col>
              <Space size='large'>
                <Button onClick={() => handleConfirm('accept')} className='border-radius-10' type={type1} size='middle'>{t('lang') === 'en' ? 'Accept' : 'Sẽ tham dự'}</Button>
                <Button onClick={() => handleConfirm('decline')} className='border-radius-10' type={type2} size='middle'>{t('lang') === 'en' ? 'Decline' : 'Không tham dự'}</Button>
              </Space>
            </Col>
          </Row>
          <Row justify='center' className='pt-50'>
            <Col>
              <h3 className='text-center'>{t('lang') === 'en' ? 'Send Message' : 'Gửi lời nhắn'}</h3>
              <TextArea autoSize style={{minHeight: 100, minWidth: 200}} onChange={e => setMessage(e.target.value)} />
              <Button onClick={handleSend} className='text-button button border-radius-0 mt-10' type='primary' size='middle' block={true}>{t('lang') === 'en' ? 'Send' : 'Gửi'}</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </LayoutWrap>
  )
}

export default GuestConfirm;