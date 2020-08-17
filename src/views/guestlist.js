import React, { useEffect, useContext, useState } from 'react';
import { Layout, Table, Space, Button, Row, Col, Input, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import LayoutWrap from '../components/layout';
import { AuthContext } from '../context/AuthContext';
import ProfileService from '../services/ProfileService';
import GuestService from '../services/GuestService';
import SiderWrap from '../components/sider';
import InvitationService from '../services/InvitationService';
import CreateButton from '../components/create-button';

const { Sider, Content } = Layout;

const GuestList = () => {
  let [invitationList, setInvitationList] = useState([]);
  let [guestlist, setGuestlist] = useState([]);
  let [guestItem, setGuestItem] = useState([]);
  let [edit, setEdit] = useState(null);
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();

  useEffect(() => {
    ProfileService.profileListId(user.profile).then(data => {
      for (let i = 0; i < data.guestlist.length; i++) {
        GuestService.guestListId(data.guestlist[i]).then(data => setGuestlist(guestlist => [...guestlist, data]))
      }
      for (let j = 0; j < data.invitation.length; j++) {
        InvitationService.invitationListId(data.invitation[j]).then(data => setInvitationList(invitationList => [...invitationList, data]))
      }
    });
  }, []);

  const SiderArea = () => {
    return (
      <SiderWrap />
    )
  }

  const ContentArea = () => {
    const handleDelete = (id) => {
      GuestService.guestDelete(id);
      const data = guestlist.filter(item => item._id !== id);
      setGuestlist(data);
      for (let i = 0; i < invitationList.length; i++) {
        const newGuestList = invitationList[i].guestlist.filter(item => item !== id);
        console.log(invitationList[i], id, newGuestList)
        InvitationService.invitationUpdate({
          ...invitationList[i],
          guestlist: newGuestList,
        }, invitationList[i]._id)
      }
    };

    const handleEdit = (id) => {
      const guestItemEdit = guestlist.find(item => {
        return item._id === id
      });
      setGuestItem(guestItemEdit);
      setEdit(guestlist.indexOf(guestItemEdit));
    };

    const handleAdd = () => {
      GuestService.guestCreate(guestItem).then(data => {
        setGuestlist(guestlist => [...guestlist, data])
        setGuestItem([]);
      });
    }

    const handleUpdate = () => {
      GuestService.guestUpdate(guestItem, guestItem._id).then(data => {
        let newGuest = guestlist.slice(0);
        newGuest.splice(edit, 1, data);
        setGuestlist(newGuest);
      });
      setEdit(null);
      setGuestItem([]);
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

    const formData = [
      {placeholder: t('lang') === 'en' ? 'Guest name' : 'Tên khách mời', prop: 'fullname', value: guestItem.fullname},
      {placeholder: t('lang') === 'en' ? 'Display name' : 'Tên hiển thị', prop: 'displayname', value: guestItem.displayname},
      {placeholder: t('lang') === 'en' ? 'Tel' : 'Điện thoại', prop: 'tel', value: guestItem.tel},
      {placeholder: 'Email', prop: 'email', value: guestItem.email},
    ];

    const processData = (data) => {
      const newData = data.map((item, index) => {
        return {
          ...item,
          no: index + 1
        }
      })
      return newData
    }
    return (
      <div>
        <div className='container'>
          <h1 className='bold text-22 px-20'>{`We saved ${guestlist.length} guests`}</h1>
        </div>
        <Row justify='center' className='pt-20'>
          <Col>
            <Form layout='inline'>
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
        <Table
          rowKey='no'
          columns={columns}
          dataSource={processData(guestlist)}
          bordered
          pagination={{ pageSize: 50 }}
          className='p-20 container'
        />
      </div>
    )
  }
  
  const DashboardContent = () => {
    return (
      <Layout className='p-20'>
        <Sider className='bg-white'>{SiderArea()}</Sider>
        <Content>{ContentArea()}</Content>
      </Layout>
    )
  }

  return (
    <LayoutWrap>
      <CreateButton />
      {DashboardContent()}
    </LayoutWrap>
  )
}

export default GuestList;