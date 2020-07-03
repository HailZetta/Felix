import React, { Suspense, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TypeService from '../services/TypeService';
import { Row, Col, Button, Typography, Divider, Form, Input, TimePicker, DatePicker, Anchor, Space, Table } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import TemplateService from '../services/TemplateService';
import CardContent from '../components/card';
import premiumIcon from '../assets/premium-icon.png';
import LayoutWrap from '../components/layout';
import ModalTemp from '../components/modal';
import InvitationService from '../services/InvitationService';
import EditableTable from '../components/test';
import GuestService from '../services/GuestService';

const { Text } = Typography;
const { Link } = Anchor;

const EditableContext = React.createContext();

const CreateInvitation = () => {
  let [typeData, setTypeData] = useState();
  let [idData, setIdData] = useState();
  let [templateData, setTemplateData] = useState();
  let [template, setTemplate] = useState();
  let [guestData, setGuestData] = useState();
  let [invitation, setInvitation] = useState({type: '', template: '', content: '', guestlist: [], status: ''});
  let [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  const PreviewContent = React.lazy(() => import(template.templateFile.replace('../src/views', '.') + '/index'));

  useEffect(() => {
    TypeService.typeList().then(data => setTypeData(data));
    TemplateService.templateList().then(data => setTemplateData(data));
    GuestService.guestList().then(data => setGuestData(data));
  }, []);

  const chooseType = (item) => {
    setIdData(item.template)
    setInvitation({
      ...invitation,
      type: item._id
    })
  }

  const chooseTemplate = (template) => {
    setInvitation({
      ...invitation,
      template: template._id,
      content: ''
    });
    setTemplate(null);
    TemplateService.templateListId(template._id).then(data => setTemplate(data));
  }

  const createInvitation = () => {
    console.log(invitation);
    InvitationService.invitationCreate(invitation);
  }

  const previewInvitation = () => {
    setVisible(true);
  }

  const handleCancel = () => {
    setVisible(false);
  }

  const typeList = () => {
    if (typeData) {
      return (
        <div>
          <h1 className='text-center'>{t('lang') === 'en' ? 'Choose Category' : 'Chọn loại thiệp'}</h1>
          <Row justify='center' gutter={[20, 20]}>
            {typeData.map((item, index) => (
              <Col key={index}>
                <Anchor affix={false}>
                  <Link href="#templateList" title={
                    <Button type='primary' key={index} onClick={() => chooseType(item)}>{t('lang') === 'en' ? item.type_en : item.type}</Button>
                  } />
                </Anchor>
              </Col>
            ))}
          </Row>
        </div>
      )
    }
  }

  const templateList = () => {
    if (idData) {
      return (
        <div className='container' id='templateList'>
          <Divider />
          <h1 className='text-center'>{t('lang') === 'en' ? 'Choose Template' : 'Chọn mẫu thiệp'}</h1>
          <Row justify='center' gutter={[20, 20]} className='px-20'>
            {idData.map((item, index) => {
              for (let i in templateData) {
                let template = templateData[i]
                if (template._id === item) {
                  let thumbnail = require(template.templateFile.replace('../src/views', '.') + '/thumbnail.jpg');
                  return (
                    <Col xs={24} sm={12} md={8} lg={6} key={index} onClick={() => chooseTemplate(template)}>
                      <Anchor affix={false}>
                        <Link href="#contentList" title={
                          <CardContent
                            hoverable={true}
                            bordered={true}
                            cover={
                              <>
                                {template.status === 'premium' ?
                                  <Row justify='end' className='position-absolute'>
                                    <Col>
                                      <img src={premiumIcon} alt='' className='w-45 m-5 p-5 bg-grey-transparent' />
                                    </Col>
                                  </Row>
                                : null }
                                <img src={thumbnail} alt='' />
                              </>
                            }
                            description={
                              <Row justify='space-between'>
                                <Col>
                                  <EditOutlined key="name" className='pr-10'/>
                                  <Text>{t('lang') === 'en' ? template.name_en : template.name}</Text>
                                </Col>
                                <Col>
                                  <Text strong='true'>{template.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ</Text>
                                </Col>
                              </Row>
                            }
                          />
                        } />
                      </Anchor>
                    </Col>
                  )
                }
              }
            })}
          </Row>
        </div>
      )
    }
  }

  const contentList = () => {
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };

    const tailLayout = {
      wrapperCol: { offset: 4, span: 20 },
    };

    if (invitation.template && template) {
      return (
        <div className='container'>
          <Divider />
          <h1 className='text-center' id='contentList'>{t('lang') === 'en' ? 'Invitation Content' : 'Nội dung thiệp'}</h1>
          <Row justify='center' className='px-20'>
            <Col xs={24} md={12}>
              <Form {...layout}>
                {template.content.map((item, index) => (
                  <Form.Item label={item.name} key={index}>
                    {item.type === 'Date' ? 
                      <DatePicker format='DD/MM/YYYY' onChange={value => setInvitation({
                        ...invitation,
                        content: {
                          ...invitation.content,
                          [item.variable]: value
                        }
                      })} />
                    : item.type === 'Time' ?
                      <TimePicker onChange={value => setInvitation({
                        ...invitation,
                        content: {
                          ...invitation.content,
                          [item.variable]: value
                        }
                      })} />
                    :
                      <Input onChange={e => setInvitation({
                        ...invitation,
                        content: {
                          ...invitation.content,
                          [item.variable]: e.target.value
                        }
                      })} />
                    }
                  </Form.Item>
                ))}
                <Form.Item {...tailLayout}>
                  <Space size='middle'>
                    {invitation.content ? 
                      <Button type='primary' onClick={() => previewInvitation()}>{t('preview')}</Button>
                    : null}
                  </Space>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      )
    }
  }

  const previewModal = () => {
    const style = { top: 20 };

    if (template) {
      return (
        <ModalTemp
          title={t('lang') === 'en' ? template.name_en : template.name}
          visible={visible}
          handleCancel={handleCancel}
          footer={null}
          style={style}
        >
          <div className='container'>
            <Suspense fallback={<div>Loading...</div>}>
              <PreviewContent {...invitation.content} />
            </Suspense>
          </div>
        </ModalTemp>
      )
    }
  }

  const guestList = () => {
    const EditableRow = ({ index, ...props }) => {
      const [form] = Form.useForm();
      return (
        <Form form={form} component={false}>
          <EditableContext.Provider value={form}>
            <tr {...props} />
          </EditableContext.Provider>
        </Form>
      );
    };

    const components = {
      body: {
        row: EditableRow,
        // cell: EditableCell,
      },
    };

    const columns = t('lang') === 'en' ? [
      {title: 'No', dataIndex: 'no'},
      {title: 'Guest', dataIndex: 'fullname'},
      {title: 'Display Name (Option)', dataIndex: 'displayname'},
      {title: 'Tel', dataIndex: 'tel'},
      {title: 'Email', dataIndex: 'email'}
    ] : [
      {title: 'STT', dataIndex: 'no'},
      {title: 'Khách mời', dataIndex: 'fullname'},
      {title: 'Tên hiển thị (tùy chọn)', dataIndex: 'displayname'},
      {title: 'Điện thoại', dataIndex: 'tel'},
      {title: 'Email', dataIndex: 'email'}
    ]

    // if (invitation.content) {
      return (
        <div className='container'>
          <Divider />
          <h1 className='text-center' id='contentList'>
            {t('lang') === 'en' ? 'Add List' : 'Danh sách khách mời'}
          </h1>
          <Button type='primary'> {/* onClick={handleAdd} */}
            {t('lang') === 'en' ? 'Add a row' : 'Thêm khách mời'}
          </Button>
          <Table
            components={components}
            dataSource={guestData}
            columns={columns}
            className='pt-20'
            bordered
          />
          <Row justify='center' className='pt-20'>
            <Col>
              <Button type='primary' onClick={() => createInvitation()}>
                {t('save')}
              </Button>
            </Col>
          </Row>
        </div>
      )
    // }
  }
  
  return (
    <LayoutWrap>
      <div className='container'>
        <EditableTable />
      </div>
      {typeList()}
      {templateList()}
      {contentList()}
      {previewModal()}
      {guestList()}
    </LayoutWrap>
  )
}

export default CreateInvitation;