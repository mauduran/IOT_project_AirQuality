import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signInStart } from '../../redux/account/account.actions';
import './SignIn.css';


const SignIn = ({ signInStart }) => {
    const [accountCredentials, setCredentials] = useState({ accountName: '', password: '' });
    const { accountName, password } = accountCredentials;

    const handleSubmit = () => {
        signInStart(accountName, password);
    }

    const handleChange = event => {
        const { value, name } = event.target
        setCredentials(prevCredentials => ({ ...prevCredentials, [name]: value }))
    }


    return (
        <Card
            className='sign-in card'
            title={<Title style={{ textAlign: 'center', padding: "0", margin: 0 }} level={2}>Sign In</Title>}
            bodyStyle={{ padding: "0", width: "100%" }}>
            <Form
                name="normal_login"
                className="login-form"
                size='large'
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "stretch"
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
                        message: 'Please input your Account Name!',
                    },
                ]}
            >
                <Input
                    name='accountName'
                    onChange={handleChange}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Account Name"
                    autoComplete= "current-password"
                    style={{ height: "60px" }} />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    name="password"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    autoComplete= "current-password"
                    size="large"
                    style={{ height: "60px" }}
                />
            </Form.Item>


            <Form.Item>
                <Button type="primary" htmlType="submit" size='large' style={{ width: "100%", height: "50px" }} className="login-form-button">
                    Log in
                </Button>
            </Form.Item>
        </Form>
        </Card >
    )
}

const mapDispatchToProps = dispatch => ({
    signInStart: (accountname, password) => dispatch(signInStart( accountname, password ))
})

export default connect(null, mapDispatchToProps)(SignIn)
