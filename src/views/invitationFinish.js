import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import InvitationService from '../services/InvitationService';
import LayoutWrap from '../components/layout';
import ProcessStep from '../components/step';
import { Space, Table, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import GuestService from '../services/GuestService';
import CreateButton from '../components/create-button';

const InvitationFinish = ({match, location}) => {
  let [invitation, setInvitation] = useState();
  let [guestDataList, setGuestDataList] = useState([]);
  const {params: { id }} = match;
  const { t } = useTranslation();

  useEffect(() => {
    InvitationService.invitationListId(id).then(data => {
      setInvitation(data)
      for (let i in data.guestlist) {
        GuestService.guestListId(data.guestlist[i].guestId).then(data => setGuestDataList(guestDataList => [...guestDataList, data]))
      }
    })
  }, []);

  const LinkTable = () => {
    const columns = [
      {title: t('lang') === 'en' ? 'No' : 'STT', dataIndex: 'no', align: 'center'},
      {title: t('lang') === 'en' ? 'Guest' : 'Khách mời', dataIndex: 'fullname'},
      {title: t('lang') === 'en' ? 'Display Name (Optional)' : 'Tên hiển thị (tùy chọn)', dataIndex: 'displayname'},
      {title: t('lang') === 'en' ? 'Tel' : 'Điện thoại', dataIndex: 'tel'},
      {title: 'Email', dataIndex: 'email'},
      {title: t('lang') === 'en' ? 'Invitation' : 'Thiệp mời', align: 'center', render: (record) => {
        return (
          <Space size='middle'>
            <Link to={`/invi/${invitation._id}/${record._id}`} target='_blank'>
              <span id='theLink'>{`thiepcuoidientu.com.vn/invi/${invitation._id}/${record._id}`}</span>
            </Link>
            {/* <Button type='dashed' onClick={handleCopy(record)}><CopyOutlined /> Copy</Button> */}
          </Space>
        )
      }}
    ];

    const processData = (data) => {
      const newData = data.map((item, index) => {
        return {
          ...item,
          no: index + 1
        }
      })
      return newData;
    }

    return (
      <div className='container p-20'>
        <h1 className='pt-50 text-highlight text-center text-weight-300'>{t('lang') === 'en' ? 'Invitation List' : 'Danh sách thiệp mời'}</h1>
        <Table
          rowKey='no'
          columns={columns}
          dataSource={processData(guestDataList)}
          bordered
        />
      </div>
    )
  }

  const handleCopy = (record) => {
    const el = `thiepcuoidientu.com.vn/invi/${invitation._id}/${record._id}`;
  }
  
  return (
    <LayoutWrap>
      <CreateButton />
      <ProcessStep status={invitation ? invitation.status : null} invitationId={id} />
      {LinkTable()}
    </LayoutWrap>
  )
}

export default InvitationFinish;