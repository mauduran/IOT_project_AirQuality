import { InfoOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, notification } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signUpStart } from '../../redux/account/account.actions';
import './SignUp.css';


const SignUp = ({ SignUpStart }) => {
    const [accountCredentials, setCredentials] = useState({ accountName: '', title: '', password: '', confirmPassword: '', });
    const { accountName, password, title, confirmPassword } = accountCredentials;

    const handleSubmit = () => {
        if (password !== confirmPassword) {
            notification.error({
                key: "passwordsDontMatch",
                message: 'Error Registering',
                description: "Passwords don't match.",
                duration: 5,
            });
            return;
        }

        SignUpStart(accountName, title, password);
    }

    const handleChange = event => {
        const { value, name } = event.target
        setCredentials(prevCredentials => ({ ...prevCredentials, [name]: value }))
    }


    return (
        <Card
            className='sign-up card'
            title={<Title style={{ textAlign: 'center', padding: "0", margin: 0 }} level={2}>Sign Up</Title>}
            bodyStyle={{ padding: "0", width: "100%", height: "100%" }}

        >
            <Form
                name="normal_register"
                className="register-form"
                size='large'
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "stretch",
                    height: "100%"

                }}
                initialValues={{
                    remember: true,
                }}
                autoComplete="on"
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="accountName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Account Id!',
                        },
                    ]}
                >
                    <Input
                        name='accountName'
                        onChange={handleChange}
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Account Name"
                        autoComplete='username'
                        style={{ height: "50px" }} />
                </Form.Item>

                <Form.Item
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input a title for your account!',
                        },
                    ]}
                >
                    <Input
                        name="title"
                        prefix={<InfoOutlined />}
                        type="text"
                        placeholder="Account title"
                        autoComplete='title'
                        onChange={handleChange}
                        size="large"
                        style={{ height: "50px" }}
                    />
                </Form.Item>


                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]} >
                    <Input
                        name="password"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
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
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        size="large"
                        style={{ height: "50px" }}
                        autoComplete="new-password"
                    />
                </Form.Item>


                <Form.Item>
                    <Button danger type="primary" htmlType="submit" size='large' style={{ width: "100%", height: "50px" }} className="register-form-button">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </Card >
    )
}

const mapDispatchToProps = dispatch => ({
    SignUpStart: (accountname, title, password) => dispatch(signUpStart(accountname, title, password))
})

export default connect(null, mapDispatchToProps)(SignUp)
