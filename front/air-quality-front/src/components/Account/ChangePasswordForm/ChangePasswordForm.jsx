
import Title from 'antd/lib/typography/Title';
import React, { useState } from 'react';
import './ChangePasswordForm.css';
import { Button, Form, Input, notification } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { changePasswordStart } from '../../../redux/account/account.actions';
import { connect } from 'react-redux';

const ChangePasswordForm = ({ ChangePasswordStart }) => {
    const [accountCredentials, setCredentials] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

    const [form] = Form.useForm();

    const { currentPassword, newPassword, confirmPassword } = accountCredentials;

    const handleSubmit = () => {
        console.log("Changing password");
        if (newPassword !== confirmPassword) {
            notification.error({
                key: "passwordsDontMatch",
                message: 'Error changing password',
                description: "new passwords don't match.",
                duration: 5,
            });
            return;
        }
        form.setFieldsValue({
            currentPassword: '', newPassword: '', confirmPassword: '',
        });

        ChangePasswordStart(currentPassword, newPassword);
    }

    const handleChange = event => {
        const { value, name } = event.target
        setCredentials(prevCredentials => ({ ...prevCredentials, [name]: value }))
    }


    return (
        <>
            <Title style={{ padding: "25px 15px", margin: 0 }} level={3}>Change Password</Title>
            <div className='change-password'>
                <Form
                    form={form}
                    name="change-password"
                    className="change-password-form"
                    size='large'
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        width: "500px",
                        alignItems: "stretch",
                        height: "100%"

                    }}
                    initialValues={{
                        remember: false,
                    }}
                    autoComplete="off"
                    onFinish={handleSubmit}
                >


                    <Form.Item
                        name="currentPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your current password!',
                            },
                        ]} >
                        <Input
                            name="currentPassword"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Current Password"
                            onChange={handleChange}
                            size="large"
                            style={{ height: "50px" }}
                            autoComplete="new-password"
                        />
                    </Form.Item>

                    <Form.Item
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                        ]}
                    >
                        <Input
                            name="newPassword"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="New Password"
                            onChange={handleChange}
                            size="large"
                            style={{ height: "50px" }}
                            autoComplete="new-password"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                        ]}
                    >
                        <Input
                            name="confirmPassword"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Confirm New Password"
                            onChange={handleChange}
                            size="large"
                            style={{ height: "50px" }}
                            autoComplete="new-password"
                        />
                    </Form.Item>


                    <Form.Item>
                        <Button danger type="primary" htmlType="submit" size='large' style={{ width: "100%", height: "50px", background: "#011529", border: "1px solid #011529" }} className="register-form-button">
                            Change Password
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    ChangePasswordStart: (currentPassword, newPassword) => dispatch(changePasswordStart({ currentPassword, newPassword })),
})

export default connect(null, mapDispatchToProps)(ChangePasswordForm);