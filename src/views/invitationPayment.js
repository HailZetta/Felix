import React, { useState, useEffect, lazy, Suspense } from 'react';
import LayoutWrap from '../components/layout';
import ProcessStep from '../components/step';
import InvitationService from '../services/InvitationService';
import { Row, Col, Divider, Table } from 'antd';
import { useTranslation } from 'react-i18next';
import TemplateService from '../services/TemplateService';
import TypeService from '../services/TypeService';

const InvitationPayment = ({match, location}) => {
  let [invitation, setInvitation] = useState();
  let [template, setTemplate] = useState();
  let [type, setType] = useState();
  const { t } = useTranslation();
  const {params: { id }} = match;
  const PreviewContent = lazy(() => import(template.templateFile.replace('../src/views', '.') + '/index.js'));

  useEffect(() => {
    InvitationService.invitationListId(id).then(data => {
      setInvitation(data);
      TemplateService.templateListId(data.template).then(data => setTemplate(data));
      TypeService.typeListId(data.type).then(data => setType(data));
    });
  }, []);

  const OrderInfomation = () => {
    if (type && invitation && template) {
      const columns = [
        {title: t('lang') === 'en' ? 'Type' : 'Loại thiệp', dataIndex: 'type', align: 'center'},
        {title: t('lang') === 'en' ? 'Template' : 'Mẫu thiệp', dataIndex: 'template', align: 'center'},
        {title: t('lang') === 'en' ? 'Number of Guest' : 'Số khách mời', dataIndex: 'guestlist', align: 'center'},
        {title: t('lang') === 'en' ? 'Total Amount' : 'Tổng tiền thanh toán', dataIndex: 'total', align: 'right', render: (text) => (
          <h2 className='m-0'>{text}</h2>
        )},
      ]

      const data = [{
        key: invitation._id,
        type: t('lang') === 'en' ? type.type_en : type.type,
        template: t('lang') === 'en' ? template.name_en : template.name,
        guestlist: invitation.guestlist.length,
        total: template.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
      }]

      const props = {
        ...invitation.content,
        position: 'absolute',
      };

      return (
        <div>
          <h1 className='pt-50 text-22 text-center bold uppercase'>{t('lang') === 'en' ? 'Order Infomation' : 'Thông tin đơn hàng'}</h1>
          <Table
            rowKey='key'
            columns={columns}
            dataSource={data}
            bordered
            pagination={false}
          />
          <Row justify='center' className='pt-20'>
            <Col span={20} style={{border: '1px rgba(0, 0, 0, 0.1) solid'}} className='bg-white p-20'>
              <Suspense fallback={<div>Loading...</div>}>
                <PreviewContent {...props} />
              </Suspense>
            </Col>
          </Row>
        </div>
      )
    }
  }

  const BankTransfer = () => {
    return (
      <div>
        <h1 className='pt-50 text-22 text-center bold uppercase'>{t('lang') === 'en' ? 'Payment Infomation' : 'Thông tin thanh toán'}</h1>
        <Row justify='center' align='middle' className='h-50vh'>
          <Col>
            <h2>Số tài khoản: <b>19033301328016</b></h2>
            <h2>Ngân hàng: <b>Techcombank - CN Hà Nội</b></h2>
            <h2>Chủ tài khoản: <b>Do Hoang Thanh</b></h2>
            <h4><i>*Cú pháp chuyển khoản: [tên người tạo] [mẫu thiệp]</i></h4>
          </Col>
          <Divider>hoặc</Divider>
          <Col>
            <h2>Liên hệ hotline: <b>0362 533 282</b></h2>
          </Col>
        </Row>
      </div>
    )
  }

  return (
    <LayoutWrap>
      <ProcessStep status={invitation ? invitation.status : null} />
      <Row justify='center' className='p-20'>
        <Col xs={24} md={12}>
          {OrderInfomation()}
        </Col>
        <Col xs={24} md={12}>
          {BankTransfer()}
        </Col>
      </Row>
    </LayoutWrap>
  )
}

export default InvitationPayment;