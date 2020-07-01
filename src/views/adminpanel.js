import React, { useState, useEffect } from 'react';
import { Button, Input, Form, Row, Col, Select, Alert, Typography, Table, Space, Tabs, InputNumber } from 'antd';
import TemplateService from '../services/TemplateService';
import TypeService from '../services/TypeService';
import ModalTemp from '../components/modal';
import { Link } from 'react-router-dom';
import Topbar from '../components/topbar';

const { Option } = Select;
const { Text } = Typography;
const { TabPane } = Tabs;

const AdminPanel = () => {
  let [template, setTemplate] = useState({name: '', name_en: '', templateFile: null, status: 'standard', price: null});
  let [templateData, setTemplateData] = useState();
  let [type, setType] = useState({type: '', type_en: '', template: []});
  let [typeData, setTypeData] = useState();
  let [id, setId] = useState();
  let [message, setMessage] = useState(null);
  let [contentData, setContentData] = useState([]);
  let [contentItem, setContentItem] = useState({variable: '', name: '', type: ''});
  let [visible, setVisible] = useState(false);

  useEffect(() => {
    TemplateService.templateList().then(data => setTemplateData(data));
    TypeService.typeList().then(data => setTypeData(data));
  }, []);

  let newTemplate = new FormData();
  newTemplate.append('name', template.name);
  newTemplate.append('name_en', template.name_en);
  newTemplate.append('templateFile', template.templateFile);
  newTemplate.append('content', JSON.stringify(contentData));
  newTemplate.append('status', template.status);
  newTemplate.append('price', template.price);

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

  const typeCreate = () => {
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    
    const tailLayout = {
      wrapperCol: { offset: 4, span: 20 },
    };

    const typeFormData = [
      {label: 'Loại thiệp', value: 'type'},
      {label: 'Loại thiệp tiếng Anh', value: 'type_en'},
      {label: 'Mẫu', value: 'template', type: 'select'}
    ];

    const uploadHandle = () => {
      TypeService.typeCreate(type)
      .then(data => {
        if (data.message) {
          setMessage(data.message)
        }
        if (!data.messageError) {
          window.location = '/admin-panel';
        }
      });
    };

    const updateHandle = () => {
      TypeService.typeUpdate(type, id)
      .then(data => {
        if (data.message) {
          setMessage(data.message)
        }
        if (!data.messageError) {
          window.location = '/admin-panel';
        }
      });
    };

    return (
      <div>
        <Row justify='center'>
          <Col>
            <h2 className='pt-20'>Thêm loại thiệp</h2>
          </Col>
        </Row>
        <Row justify='center'>
          <Col span={16}>
            <Form layout='horizontal' {...layout}>
              {typeFormData.map((item, index) => (
                <Form.Item label={item.label} key={index}>
                  {item.type === 'select' ?
                    <Select value={Object.values(type)[index]} mode="multiple" onChange={value => setType({
                      ...type,
                      [item.value]: value
                    })}>
                      {templateData ? templateData.map(item => (
                        <Option value={item._id} key={item._id}>{item.name}</Option>
                      )) : null}
                    </Select>
                  :
                    <Input value={Object.values(type)[index]} placeholder={item.label} onChange={e => setType({
                      ...type,
                      [item.value]: e.target.value
                    })} />
                  }
                </Form.Item>
              ))}
              <Form.Item {...tailLayout}>
                <Space size='large'>
                  <Button type='primary' onClick={uploadHandle}>Submit</Button>
                  <Button type='primary' onClick={updateHandle}>Update</Button>
                </Space>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }

  const typeList = () => {
    const updateHandle = (data) => {
      setType({
        type: data.type,
        type_en: data.type_en,
        template: data.template,
      })
      setId(data._id)
    }

    const columns=[
      {title: 'Loại thiệp', dataIndex: 'type'},
      {title: 'Loại thiệp tiếng Anh', dataIndex: 'type_en'},
      {title: 'Mẫu thiệp', align: 'center', render: (row) => {
        return (
          <div>
            {row.template.map((item, index) => (
              <Row key={index} justify='center'>
                <Col>
                  <Link to={'/template/' + `${item}`}>
                    {item}
                  </Link>
                </Col>
              </Row>
            ))}
          </div>
        )
      }},
      {title: 'Tùy chọn', align: 'center', render: (row) => {
        return (
          <Space>
            <Button type='dashed' onClick={() => {
              TypeService.typeDelete(row._id);
              window.location = '/admin-panel'
            }}>
              Xóa loại thiệp
            </Button>
            <Button type='dashed' onClick={() => updateHandle(row)}>
              Cập nhật
            </Button>
          </Space>
        )
      }}
    ]

    return (
      <div className='container pt-50'>
        <h2 className='text-center'>Danh sách loại thiệp</h2>
        <Table
          rowKey='_id'
          columns={columns}
          dataSource={typeData}
          bordered
        />
      </div>
    )
  }

  const templateUpload = () => {
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
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

    return (
      <div>
        <Row justify='center'>
          <Col>
            <h2 className='pt-20'>Thêm thiệp</h2>
          </Col>
        </Row>
        <Row justify='center'>
          <Col span={16}>
            {message ? <Alert message={message} type="error" showIcon={true} className='message' /> : null}
          </Col>
        </Row>
        <Row justify='center'>
          <Col span={16}>
            <Form {...layout}>
              <Form.Item label='Tên thiệp'>
                <Input placeholder='Tên thiệp' value={template.name} type='text' onChange={e => setTemplate({
                  ...template,
                  name: e.target.value,
                })} />
              </Form.Item>
              <Form.Item label='Tên thiệp tiếng Anh'>
                <Input placeholder='Tên thiệp tiếng Anh' value={template.name_en} type='text' onChange={e => setTemplate({
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
                <Select defaultValue='standard' onChange={value => setTemplate({
                  ...template,
                  status: value
                })}>
                  <Option value='standard'>Standard</Option>
                  <Option value='premium'>Premium</Option>
                </Select>
              </Form.Item>
              <Form.Item label='Giá'>
                <InputNumber
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  placeholder='Giá'
                  value={template.price}
                  onChange={value => setTemplate({
                    ...template,
                    price: value,
                  })}
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row justify='center pb-20'>
          <Col span={16}>
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
      {title: 'Price', render: (row) => (
        <span>{row ? row.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : null}</span>
      )},
      {title: 'Tùy chọn', render: (row) => (
        <Space>
          <Button type='dashed' onClick={() => {
            TemplateService.templateDelete(row._id);
            window.location = '/admin-panel'
          }}>Xóa thiệp</Button>
          <Link to={'/template/' + `${row._id}`}>
            <Button type='dashed'>Xem thiệp</Button>
          </Link>
        </Space>
      )}
    ]

    return (
      <div className='container pt-50'>
        <h2 className='text-center'>Danh sách thiệp</h2>
        <Table
          rowKey='_id'
          columns={columns}
          dataSource={templateData}
          bordered
        />
      </div>
    )
  }

  return (
    <div>
      <Topbar />
      <Row className='container'>
        <h1 className='pt-20 text-rainbow'>Admin Panel</h1>
        <Col span={24}>
          <Tabs defaultActiveKey='1' size='small' type='card'>
            <TabPane tab='Category' key={1}>
              {typeCreate()}
              {typeList()}
            </TabPane>
            <TabPane tab='Template' key={2}>
              {templateUpload()}
              {templateDataList()}
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  )
};

export default AdminPanel;