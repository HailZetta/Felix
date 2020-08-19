import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import LayoutWrap from '../components/layout';
import SiderWrap from '../components/sider';
import { Layout, Row, Col, Divider, Space, Button, Table, Card } from 'antd';
import InvitationService from '../services/InvitationService';
import ProfileService from '../services/ProfileService';
import TemplateService from '../services/TemplateService';
import TypeService from '../services/TypeService';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo-color.png';
import premiumIcon from '../assets/premium-icon.png';
import CreateButton from '../components/create-button';

const { Sider, Content } = Layout;
const { Meta } = Card;

const SiderArea = () => {
  return (
    <SiderWrap />
  )
}

const InvitationList = () => {
  let [invitationList, setInvitationList] = useState([]);
  let [templateData, setTemplateData] = useState([]);
  let [typeData, setTypeData] = useState([]);
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();

  useEffect(() => {
    ProfileService.profileListId(user.profile).then(data => {
      for (let i = 0; i < data.invitation.length; i++) {
        InvitationService.invitationListId(data.invitation[i]).then(data => setInvitationList(invitationList => [...invitationList, data]))
      }
    });
    TemplateService.templateList().then(data => setTemplateData(data));
    TypeService.typeList().then(data => setTypeData(data));
  }, []);

  const handleDelete = (id) => {
    console.log(id);
    InvitationService.invitationDelete(id);
    const data = invitationList.filter(item => item._id !== id);
    setInvitationList(data)
  }

  const handleEdit = (record) => {
    window.location = record.status === 0 ? `/invitation-template/${record._id}`
    : record.status === 1 ? `/invitation-content/${record._id}`
    : record.status === 2 ? `/invitation-guest/${record._id}`
    : record.status === 3 ? `/invitation-payment/${record._id}`
    : `/invitation-finish/${record._id}`
  }

  const handleCheckIn = (record) => {
    window.location = `/check-in/${record._id}`;
  }

  const columns = [
    {title: t('lang') === 'en' ? 'No' : 'STT', dataIndex: 'no', align: 'center'},
    {title: t('lang') === 'en' ? 'Type' : 'Loại thiệp', dataIndex: 'type', align: 'center'},
    {title: t('lang') === 'en' ? 'Template' : 'Mẫu thiệp', dataIndex: 'template', align: 'center'},
    {title: t('lang') === 'en' ? 'Number of Guest' : 'Số lượng khách mời', dataIndex: 'guestQty', align: 'center'},
    {title: t('lang') === 'en' ? 'Status' : 'Trạng thái', dataIndex: 'status', align: 'center', render: (record) => (
      <span>
        {record === 0 ? (t('lang') === 'en' ? 'Pick Template' : 'Chọn mẫu thiệp') :
        record === 1 ? (t('lang') === 'en' ? 'Fill Content' : 'Điền nội dung') :
        record === 2 ? (t('lang') === 'en' ? 'Add Guest' : 'Thêm khách mời') :
        record === 3 ? (t('lang') === 'en' ? 'Payment' : 'Thanh toán') :
        (t('lang') === 'en' ? 'Finish' : 'Hoàn tất')}
      </span>
    )},
    {title: t('lang') === 'en' ? 'Option' : 'Tùy chọn', align: 'center', render: (row, record) => (
      <Space size='middle'>
        <Button type='dashed' onClick={() => handleDelete(record._id)}>{t('lang') === 'en' ? 'Delete' : 'Xóa'}</Button>
        {row.status === 4 ?
          <Space size='middle'>
            <Button type='dashed' onClick={() => handleEdit(record)}>{t('lang') === 'en' ? 'View' : 'Xem thiệp'}</Button>
            <Button type='dashed' onClick={() => handleCheckIn(record)}>{t('lang') === 'en' ? 'Check In' : 'Check In'}</Button>
          </Space>
        :
          <Button type='dashed' onClick={() => handleEdit(record)}>{t('lang') === 'en' ? 'Edit' : 'Chỉnh sửa'}</Button>
        }
      </Space>
    )}
  ];

  const ProcessData = (data) => {
    const newData = data.map((item, index) => {
      let type = {en: null, vi: null};
      let template = {en: null, vi: null};
      for (let i in typeData) {
        if (typeData[i]._id === item.type) {
          type.en = typeData[i].type_en;
          type.vi = typeData[i].type;
        }
      }
      for (let i in templateData) {
        if (templateData[i]._id === item.template) {
          template.en = templateData[i].name_en;
          template.vi = templateData[i].name;
        }
      }
      return {
        ...item,
        no: index + 1,
        type: t('lang') === 'en' ? type.en : type.vi,
        template: t('lang') === 'en' ? template.en : template.vi,
        guestQty: item.guestlist.length,
      }
    })
    return newData;
  }

  const TemplateList = () => {
    return (
      <Row justify='left'>
        {invitationList.map((item, index) => {
          for (let i in templateData) {
            if (templateData[i]._id === item.template) {
              const thumbnail = require(templateData[i].templateFile.replace('src/views', '.') + '/thumbnail.jpg');
              return (
                <Col xs={24} sm={12} md={8} lg={6} className='p-20' key={index}>
                  <Card hoverable cover={
                    <>
                      {templateData[i].status === 'premium' ?
                        <Row justify='end' className='position-absolute'>
                          <Col>
                            <img src={premiumIcon} alt='' className='w-45 m-5 p-5 bg-grey-transparent' />
                          </Col>
                        </Row>
                      :
                        null
                      }
                      <img src={thumbnail} alt='' />
                    </>
                  }>
                    <Meta
                      title={
                        <Row justify='space-between' align='middle'>
                          <Col>
                            <Row gutter={10} align='middle'>
                              <Col>
                                <img src={logo} className='w-20' alt='' />
                              </Col>
                              <Col>
                                <span className='text-black'>{t('lang') === 'en' ? templateData[i].name_en : templateData[i].name}</span>
                              </Col>
                            </Row>
                          </Col>
                          <Col>
                            {templateData[i].status === 'premium' ?
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
        })}
      </Row>
    )
  }

  return (
    <div>
      <div className='container'>
        <h1 className='bold text-22'>{`You have created ${invitationList.length} ${invitationList.length < 2 ? 'invitation' : 'invitations'}`}</h1>
      </div>
      <Table
        rowKey='no'
        columns={columns}
        dataSource={ProcessData(invitationList)}
        bordered
        pagination={{ pageSize: 50 }}
      />
      <Divider />
      {TemplateList()}
    </div>
  )
}

const ContentArea = () => {
  return (
    <div>
      <Row justify='center' className='container p-20'>
        <Col span={24}>
          {InvitationList()}
        </Col>
      </Row>
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

const Invitation = () => {
  return (
    <LayoutWrap>
      <CreateButton />
      {DashboardContent()}
    </LayoutWrap>
  )
}

export default Invitation;