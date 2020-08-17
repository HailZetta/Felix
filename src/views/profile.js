import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LayoutWrap from '../components/layout';
import { Layout, Row, Col, Form, Input, Button, Divider, Alert, Space } from 'antd';
import ProfileService from '../services/ProfileService';
import { AuthContext } from '../context/AuthContext';
import AuthService from '../services/AuthService';
import SiderWrap from '../components/sider';
import CreateButton from '../components/create-button';

const { Sider, Content } = Layout;

const Profile = () => {
  let [profileData, setProfileData] = useState();
  let [profileItem, setProfileItem] = useState({fullname: '', tel: '', city: ''});
  let [newPassword, setNewPassword] = useState({password: '', password2: ''});
  let [message, setMessage] = useState({content_en: '', content: '', success: ''});
  let [visible, setVisible] = useState(false);
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();

  useEffect(() => {
    ProfileService.profileListId(user.profile).then(data => {
      setProfileData(data);
      setProfileItem({
        fullname: data.fullname,
        tel: data.tel,
        city: data.city,
      })
    });
  }, []);

  const SiderArea = () => {
    return (
      <SiderWrap />
    )
  }

  const handleClick = () => {
    if (!profileItem.fullname) {
      setMessage({
        content_en: 'Please fill your name',
        content: 'Đừng để trống tên bạn nhé',
        success: false,
      })
    } else if (!newPassword.password && visible) {
      setMessage({
        content_en: 'Please fill password',
        content: 'Đừng để trống mật khẩu nhé',
        success: false,
      })
    } else if (newPassword.password !== newPassword.password2 && visible) {
      setMessage({
        content_en: 'Password not match',
        content: 'Mật khẩu xác nhận không khớp',
        success: false,
      })
    } else {
      if (profileItem.fullname || profileItem.tel || profileItem.email) {
        ProfileService.profileUpdate(profileItem, user.profile);
        setMessage({
          content_en: 'Update Success!',
          content: 'Cập nhật thông tin thành công',
          success: true,
        })
      }
      if (visible) {
        AuthService.updatePassword(newPassword, user._id);
        setMessage({
          content_en: 'Update Success!',
          content: 'Cập nhật thông tin thành công',
          success: true,
        })
      }
    }
  }

  const handleCancel = () =>{
    setVisible(false);
  }

  const ContentArea = () => {
    const formData = [
      {label_en: 'fullname', label: 'Tên gọi', value: profileItem.fullname, type: 'text'},
      {label_en: 'tel', label: 'Điện thoại', value: profileItem.tel, type: 'tel'},
      {label_en: 'city', label: 'Nơi ở', value: profileItem.city, type: 'email'},
    ]
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    
    const tailLayout = {
      wrapperCol: { offset: 6, span: 18 },
    };
    const { t } = useTranslation();
    if (profileData) {
      return (
        <div className='p-20 container'>
          <div className='container'>
            <h1 className='bold text-22'>{`Hi ${profileItem.fullname}, you can check your profile here!`}</h1>
          </div>
          <Row justify='center'>
            <Col xs={24} md={15}>
              <div className='container mb-20'>
                {message.content ?
                  message.success ?
                    <Alert message={t('lang') === 'en' ? message.content_en : message.content} type='success' showIcon={true} className='message' />
                  :
                    <Alert message={t('lang') === 'en' ? message.content_en : message.content} type='error' showIcon={true} className='message' />
                : null}
              </div>
              <Form {...layout}>
                {formData.map((item, index) => (
                  <Form.Item label={<span className='capital'>{t('lang') === 'en' ? item.label_en : item.label}</span>} key={index}>
                    <Input type={item.type} value={item.value} onChange={e => setProfileItem({
                      ...profileItem,
                      [item.label_en]: e.target.value,
                    })} />
                  </Form.Item>
                ))}
                <Divider style={{borderTop: '1px #fff solid'}} />
                {!visible ?
                  <Form.Item {...tailLayout}>
                    <Button onClick={() => setVisible(true)}>{t('lang') === 'en' ? 'Change Password' : 'Đổi mật khẩu'}</Button>
                  </Form.Item>
                :
                  <>
                    <Form.Item label={t('lang') === 'en' ? 'New Password' : 'Mật khẩu mới'}>
                      <Input type='password' onChange={e => setNewPassword({
                        ...newPassword,
                        password: e.target.value,
                      })} />
                    </Form.Item>
                    <Form.Item label={t('lang') === 'en' ? 'Confirm Password' : 'Xác nhận mật khẩu'}>
                      <Input type='password' onChange={e => setNewPassword({
                        ...newPassword,
                        password2: e.target.value,
                      })} />
                    </Form.Item>
                  </>
                }
                <Form.Item {...tailLayout}>
                  <Space>
                    <Button type='primary' className='button' onClick={handleClick}>{t('save')}</Button>
                    {visible ? <Button onClick={handleCancel} className='border-radius-10'>{`${t('cancel')} change password`}</Button> : null}
                  </Space>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      )
    }
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

export default Profile;