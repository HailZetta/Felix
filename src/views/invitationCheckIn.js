import React, { useState, useEffect } from 'react';
import LayoutWrap from '../components/layout';
import { useTranslation } from 'react-i18next';
import { Table, Select, message } from 'antd';
import InvitationService from '../services/InvitationService';
import GuestService from '../services/GuestService';
import CreateButton from '../components/create-button';

const { Option } = Select;

const InvitationCheckIn = ({match, location}) => {
  let [invitation, setInvitation] = useState()
  let [guestDataList, setGuestDataList] = useState([]);
  const { t } = useTranslation();
  const {params: { id }} = match;

  useEffect(() => {
    InvitationService.invitationListId(id).then(data => {
      setInvitation(data);
      const { guestlist } = data;
      for (let i in guestlist) {
        GuestService.guestListId(data.guestlist[i].guestId).then(data => setGuestDataList(guestDataList => [
          ...guestDataList,
          {
            ...data,
            status: guestlist[i].status,
            message: guestlist[i].message
          }
        ]))
      }
    })
  }, []);

  const CheckInTable = () => {
    const statusList = [
      {value: 'noresponse', display: t('lang') === 'en' ? 'Not Response' : 'Chưa phản hồi'},
      {value: 'accept', display: t('lang') === 'en' ? 'Accept' : 'Xác nhận'},
      {value: 'decline', display: t('lang') === 'en' ? 'Decline' : 'Không tham dự'},
      {value: 'checked', display: t('lang') === 'en' ? 'Checked In' : 'Đã tham dự'},
    ]

    const columns = [
      {title: t('lang') === 'en' ? 'No' : 'STT', dataIndex: 'no', align: 'center'},
      {title: t('lang') === 'en' ? 'Guest' : 'Khách mời', dataIndex: 'fullname'},
      {title: t('lang') === 'en' ? 'Display Name' : 'Tên hiển thị', dataIndex: 'displayname'},
      {title: t('lang') === 'en' ? 'Status' : 'Trạng thái', align: 'center', render: (record) => {
        return (
          <Select defaultValue={record.status} onChange={value => {
            for (let i in guestDataList) {
              if (guestDataList[i]._id === record._id) {
                guestDataList[i].status = value;
              }
            }
            for (let i in invitation.guestlist) {
              if (invitation.guestlist[i].guestId === record._id) {
                invitation.guestlist[i].status = value;
              }
            }
            InvitationService.invitationUpdate(invitation, id);
          }}>
            {statusList.map((item, index) => (
              <Option value={item.value} key={index}>{item.display}</Option>
            ))}
          </Select>
        )
      }},
      {title: t('lang') === 'en' ? 'Message' : 'Lời nhắn', align: 'center', dataIndex: 'message'}
    ]

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
        <h1 className='pt-30 text-highlight text-center text-weight-300'>{t('lang') === 'en' ? 'Invitation Check In' : 'Danh sách khách mời'}</h1>
        <Table
          rowKey='no'
          columns={columns}
          dataSource={processData(guestDataList)}
          bordered
        />
      </div>
    )
  }

  return (
    <LayoutWrap>
      <CreateButton />
      {CheckInTable()}
    </LayoutWrap>
  )
}

export default InvitationCheckIn;