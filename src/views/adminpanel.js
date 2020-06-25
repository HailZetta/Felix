import React, { useState } from 'react';
import { Button, Input, Form, Row, Col, Select, Alert, Typography } from 'antd';
import TemplateService from '../services/TemplateService';

const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;

const AdminPanel = () => {
  let [template, setTemplate] = useState({name: '', name_en: '', templateFile: null, content: {}, status: 'public'});
  let [message, setMessage] = useState(null);

  let newTemplate = new FormData();
  newTemplate.append('name', template.name);
  newTemplate.append('name_en', template.name_en);
  newTemplate.append('templateFile', template.templateFile);
  newTemplate.append('content', template.content);
  newTemplate.append('status', template.status);

  const uploadHandle = () => {
    TemplateService.uploadTemplate(newTemplate)
    .then(data => {
      if (data.message) {
        setMessage(data.message)
      }
      // if (!data.messageError) {
      //   props.history.push('/login');
      // }
    });
  };

  const templateUpload = () => {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };

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
              <Form.Item label='Nội dung thiệp'>
                <Input />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type='primary' onClick={uploadHandle}>Submit</Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    )
  };

  return (
    <div>
      <Row justify='center'>
        <Col>
          <h1 className='pt-20 text-rainbow'>Admin Panel</h1>
        </Col>
      </Row>
      {templateUpload()}
    </div>
  )
};

export default AdminPanel;