import React, { useState, useEffect, useContext } from 'react';
import LayoutWrap from '../components/layout';
import { Row, Col, Form, Input, Button, Table, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import ProcessStep from '../components/step';
import InvitationService from '../services/InvitationService';
import GuestService from '../services/GuestService';
import ModalTemp from '../components/modal';
import ProfileService from '../services/ProfileService';
import { AuthContext } from '../context/AuthContext';

const InvitationGuest = ({match, location}) => {
  let [invitation, setInvitation] = useState();
  let [guestData, setGuestData] = useState([]);
  let [guestDataList, setGuestDataList] = useState([]);
  let [guestItem, setGuestItem] = useState({fullname: '', displayname: '', tel: '', email: ''});
  let [edit, setEdit] = useState(null);
  let [visible, setVisible] = useState(false);
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();
  const {params: { id }} = match;

  useEffect(() => {
    InvitationService.invitationListId(id).then(data => {
      setInvitation(data)
      for (let i in data.guestlist) {
        GuestService.guestListId(data.guestlist[i]).then(data => setGuestDataList(guestDataList => [...guestDataList, data]))
      }
    })
    ProfileService.profileListId(user.profile).then(data => {
      for (let i = 0; i < data.guestlist.length; i ++) {
        GuestService.guestListId(data.guestlist[i]).then(data => setGuestData(guestData => [...guestData, data]))
      }
    });
  }, []);

  const GuestListForm = () => {
    const formData = [
      {placeholder: t('lang') === 'en' ? 'Guest name' : 'Tên khách mời', prop: 'fullname', value: guestItem.fullname},
      {placeholder: t('lang') === 'en' ? 'Display name' : 'Tên hiển thị', prop: 'displayname', value: guestItem.displayname},
      {placeholder: t('lang') === 'en' ? 'Tel' : 'Điện thoại', prop: 'tel', value: guestItem.tel},
      {placeholder: 'Email', prop: 'email', value: guestItem.email},
    ];

    const handleAdd = () => {
      GuestService.guestCreate(guestItem).then(data => {
        InvitationService.invitationUpdate({
          ...invitation,
          guestlist: [
            ...invitation.guestlist,
            data._id,
          ]
        }, id).then(data => setInvitation(data));
        setGuestDataList(guestDataList => [...guestDataList, data])
      })
      setGuestItem({fullname: '', displayname: '', tel: '', email: ''});
    }

    const handleUpdate = () => {
      GuestService.guestUpdate(guestItem, guestItem._id).then(data => {
        let newGuest = guestDataList.slice(0);
        newGuest.splice(edit, 1, data);
        setGuestDataList(newGuest);
      });
      setEdit(null);
      setGuestItem({fullname: '', displayname: '', tel: '', email: ''});
    }

    return (
      <div className='container p-20'>
        <Row justify='center' className='pt-20'>
          <Col>
            <Form layout='inline'>
              <Form.Item>
                <Button type='primary' className='button' onClick={() => setVisible(true)}>{t('lang') === 'en' ? 'Add saved guest' : 'Thêm khách đã lưu'}</Button>
              </Form.Item>
              {formData.map((item, index) => (
                <Form.Item key={index}>
                  <Input className='border-radius-10' value={item.value} placeholder={item.placeholder} onChange={e => setGuestItem({
                    ...guestItem,
                    [item.prop]: e.target.value
                  })} />
                </Form.Item>
              ))}
              <Form.Item>
                {edit !== null ?
                  <Button type='primary' className='button' onClick={handleUpdate}>{t('lang') === 'en' ? 'Update guest' : 'Lưu chỉnh sửa'}</Button>
                :
                  <Button type='primary' className='button' onClick={handleAdd}>{t('lang') === 'en' ? 'Add guest' : 'Thêm khách'}</Button>
                }
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }

  const GuestListTable = () => {
    const handleDelete = (id) => {
      const newData = guestDataList.filter(item => item._id !== id);
      setGuestDataList(newData);
      InvitationService.invitationUpdate({
        ...invitation,
        guestlist: newData,
      }, invitation._id)
    }

    const handleEdit = (id) => {
      const guestItemEdit = guestDataList.find(item => {
        return item._id === id
      });
      setGuestItem(guestItemEdit);
      setEdit(guestDataList.indexOf(guestItemEdit));
      console.log(guestDataList.indexOf(guestItemEdit))
    }

    const columns = [
      {title: t('lang') === 'en' ? 'No' : 'STT', dataIndex: 'no', align: 'center'},
      {title: t('lang') === 'en' ? 'Guest' : 'Khách mời', dataIndex: 'fullname'},
      {title: t('lang') === 'en' ? 'Display Name (Optional)' : 'Tên hiển thị (tùy chọn)', dataIndex: 'displayname'},
      {title: t('lang') === 'en' ? 'Tel' : 'Điện thoại', dataIndex: 'tel'},
      {title: 'Email', dataIndex: 'email'},
      {title: t('lang') === 'en' ? 'Option' : 'Tùy chỉnh', align: 'center', render: (record) => (
        <Space size='middle'>
          <Button type='dashed' onClick={() => handleDelete(record._id)}>{t('lang') === 'en' ? 'Delete' : 'Xóa'}</Button>
          <Button type='dashed' onClick={() => handleEdit(record._id)}>{t('lang') === 'en' ? 'Edit' : 'Chỉnh sửa'}</Button>
        </Space>
      )}
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
        <Table
          rowKey='no'
          columns={columns}
          dataSource={processData(guestDataList)}
          bordered
        />
      </div>
    )
  }

  const SavedGuest = () => {
    const columns = [
      {title: t('lang') === 'en' ? 'Guest' : 'Khách mời', dataIndex: 'fullname'},
      {title: t('lang') === 'en' ? 'Display Name (Optional)' : 'Tên hiển thị (tùy chọn)', dataIndex: 'displayname'},
      {title: t('lang') === 'en' ? 'Tel' : 'Điện thoại', dataIndex: 'tel'},
      {title: 'Email', dataIndex: 'email'},
    ];

    const style = { maxWidth: '1440px' };

    const filterData = (data) => {
      let newGuestData = data.slice(0);
      for (let i = 0; i < guestDataList.length; i++) {
        newGuestData = newGuestData.filter(item => item._id != guestDataList[i]._id)
      }
      return newGuestData;
    }

    const handleCancel = () => {
      setVisible(false);
    }

    const handleOk = () => {
      const newGuestList = invitation.guestlist.concat(guestItem);
      InvitationService.invitationUpdate({
        ...invitation,
        guestlist: newGuestList,
      }, id).then(data => setInvitation(data))
      setGuestDataList(guestDataList.concat(guestItem));
      setGuestItem({fullname: '', displayname: '', tel: '', email: ''});
      setVisible(false);
    }

    return (
      <ModalTemp
        visible={visible}
        handleCancel={handleCancel}
        handleOk={handleOk}
        title={t('lang') === 'en' ? 'Saved Guest' : 'Khách đã lưu'}
        style={style}
      >
        <Table
          rowKey='_id'
          rowSelection={{
            type: 'checkbox',
            onChange: (selectedRowKeys, selectedRows) => {
              setGuestItem(selectedRows)
            }
          }}
          columns={columns}
          dataSource={filterData(guestData)}
          bordered
        />
      </ModalTemp>
    )
  }

  const handleContinue = () => {
    InvitationService.invitationUpdate({...invitation, status: 3}, id);
    window.location = `/invitation-payment/${id}`;
  }

  return (
    <LayoutWrap>
      <ProcessStep status={invitation ? invitation.status : null} />
      {GuestListForm()}
      {GuestListTable()}
      {SavedGuest()}
      <Row justify='center'>
        <Col>
          <Button type='primary' className='button' onClick={handleContinue}>{t('continue')}</Button>
        </Col>
      </Row>
    </LayoutWrap>
  )
}

export default InvitationGuest;