import React, { useState, useEffect } from 'react';
import { Button, Input, Form, Row, Col, Select, Alert, Typography, Table, Space } from 'antd';
import TemplateService from '../services/TemplateService';
import ModalTemp from '../components/modal';
import { Link } from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;

const AdminPanel = (props) => {
  let [template, setTemplate] = useState({name: '', name_en: '', templateFile: null, status: 'public'});
  let [templateData, setTemplateData] = useState();
  let [message, setMessage] = useState(null);
  let [contentData, setContentData] = useState([]);
  let [contentItem, setContentItem] = useState({variable: '', name: '', type: ''});
  let [visible, setVisible] = useState(false);

  useEffect(() => {
    TemplateService.templateList().then(data => setTemplateData(data));
  }, []);

  let newTemplate = new FormData();
  newTemplate.append('name', template.name);
  newTemplate.append('name_en', template.name_en);
  newTemplate.append('templateFile', template.templateFile);
  newTemplate.append('content', JSON.stringify(contentData));
  newTemplate.append('status', template.status);

  const uploadHandle = () => {
    TemplateService.uploadTemplate(newTemplate)
    .then(data => {
      if (data.message) {
        setMessage(data.message)
      }
      if (!data.messageError) {
        window.location = '/admin-panel';
      }
    });
  };

  const ModalForm = () => {
    return (
      <Form>
        <Form.Item>
          <Input value={contentItem.variable} placeholder='Biến' onChange={e => setContentItem({
            ...contentItem,
            variable: e.target.value
          })} />
        </Form.Item>
        <Form.Item>
          <Input value={contentItem.name} placeholder='Tên' onChange={e => setContentItem({
            ...contentItem,
            name: e.target.value
          })} />
        </Form.Item>
        <Form.Item>
          <Select value={contentItem.type} defaultValue='String' placeholder='Loại dữ liệu' onChange={value => setContentItem({
            ...contentItem,
            type: value
          })}>
            <Option value='String'>String</Option>
            <Option value='Date'>Date</Option>
            <Option value='Time'>Time</Option>
          </Select>
        </Form.Item>
      </Form>
    )
  }

  const templateUpload = () => {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };

    const showModal = () => {
      setVisible(true);
    }

    const handleCancel = () => {
      setContentItem({variable: '', name: '', type: ''});
      setVisible(false);
    }

    const handleOk = () => {
      contentData.push(contentItem);
      setContentItem({variable: '', name: '', type: ''});
      setVisible(false);
    }

    return (
      <div>
        <Row justify='center' className='p-20'>
          <Col span={8}>
            {message ? <Alert message={message} type="error" showIcon={true} className='message' /> : null}
          </Col>
        </Row>
        <Row justify='center'>
          <Col span={8}>
            <Form {...layout}>
              <Form.Item label='Tên thiệp'>
                <Input size='large' placeholder='Tên thiệp' value={template.name} type='text' className='form-input' onChange={e => setTemplate({
                  ...template,
                  name: e.target.value,
                })} />
              </Form.Item>
              <Form.Item label='Tên thiệp tiếng Anh'>
                <Input size='large' placeholder='Tên thiệp tiếng Anh' value={template.name_en} type='text' className='form-input' onChange={e => setTemplate({
                  ...template,
                  name_en: e.target.value,
                })} />
              </Form.Item>
              <Form.Item label='File thiệp'>
                <Input
                  type='file'
                  onChange={e => setTemplate({
                    ...template,
                    templateFile: e.target.files[0]
                  })}
                />
              </Form.Item>
              <Form.Item label='Trạng thái'>
                <Select defaultValue='public' onChange={value => setTemplate({
                  ...template,
                  status: value
                })}>
                  <Option value='public'>Public</Option>
                  <Option value='private'>Private</Option>
                </Select>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row justify='center pb-20'>
          <Col span={8}>
            <Row justify='space-between' className='pb-10'>
              <Col>
                <Text>Nội dung:</Text>
              </Col>
              <Col>
                <Button onClick={showModal}>Thêm</Button>
              </Col>
            </Row>
            <Row justify='space-between'>
              <Col>
                <h4>Tên</h4>
              </Col>
              <Col>
                <Text strong='true'>Biến</Text>
              </Col>
              <Col>
                <Text strong='true'>Loại</Text>
              </Col>
            </Row>
            {contentData.map((item, index) => (
              <Row justify='space-between' key={index}>
                <Col>
                  <h4>{item.name}</h4>
                </Col>
                <Col>
                  <Text>{item.variable}</Text>
                </Col>
                <Col>
                  <Text>{item.type}</Text>
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
        <Row justify='center'>
          <Col>
            <Button type='primary' onClick={uploadHandle}>Submit</Button>
          </Col>
        </Row>
        <ModalTemp title='Thêm nội dung' visible={visible} handleOk={handleOk} handleCancel={handleCancel} children={ModalForm()} />
      </div>
    )
  };

  const templateDataList = () => {
    const columns=[
      {title: 'Tên thiệp', dataIndex: 'name'},
      {title: 'Tên tiếng Anh', dataIndex: 'name_en'},
      {title: 'Trạng thái', dataIndex: 'status'},
      {title: 'Path', dataIndex: 'templateFile'},
      {title: 'Tùy chọn', render: (row) => {
        return (
          <Space>
            <Button type='dashed' onClick={() => {
              TemplateService.templateDelete(row._id);
              window.location = '/admin-panel'
            }}>Xóa thiệp</Button>
            <Link to={'/template/' + `${row._id}`}>
              <Button type='dashed'>Xem thiệp</Button>
            </Link>
          </Space>
        )
      }}
    ]

    return (
      <div className='container pt-50'>
        <h2 className='text-center'>Danh sách thiệp</h2>
        <Table
          columns={columns}
          dataSource={templateData}
          bordered
        />
      </div>
    )
  }

  return (
    <div>
      <Row justify='center'>
        <Col>
          <h1 className='pt-20 text-rainbow'>Admin Panel</h1>
        </Col>
      </Row>
      {templateUpload()}
      {templateDataList()}
    </div>
  )
};

export default AdminPanel;