import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import VerificationCodeInput from 'react-verification-code-input';
import { createStructuredSelector } from 'reselect';
import { selectAccountHasPhoneRegistered } from '../../../redux/account/account.selectors';
import { registerPhoneStart, verifyPhoneStart } from '../../../redux/phone/phone.actions';
import { selectIsRegisteringPhone, selectIsVerifyingCode, selectIsWaitingForVerification, selectPhoneNumber } from '../../../redux/phone/phone.selectors';
import "./AccountPhone.css";

const { Text } = Typography;

const AccountPhone = ({
    registerPhone,
    verifyPhone,
    isWaitingForVerification,
    hasPhoneRegistered,
    phoneNumber,
    updatedPhone,
    isVerifyingCode,
    isRegisteringPhone
}) => {

    const [phoneToRegister, setPhoneToRegister] = useState('');

    const sendPhoneVerificationCode = (code) => {
        console.log(code);
        if (code && code.length === 6) {
            console.log("Verifying phone");
            verifyPhone(phoneToRegister, code);
        }
    }

    const startPhoneNumberRegistration = () => {
        if (phoneToRegister) {
            registerPhone(phoneToRegister);
        }
    }

    const isPhoneNumberValid = (_, value) => {
        let regex = /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;
        if (regex.test(value)) return Promise.resolve();
        return Promise.reject(new Error("The value entered is not a valid phone number"));
    }

    const handlePhoneInputChange = (event) => {
        setPhoneToRegister(event.target.value);
    }
    const generatePhoneInfoContent = () => {

        if (updatedPhone || hasPhoneRegistered) {
            return <>
                <CheckCircleFilled style={{ color: "green", fontSize: "26px" }} />
                <Text style={{ fontSize: "22px", marginLeft: "10px" }}>
                    {updatedPhone || phoneNumber}
                </Text>
            </>
        }
        return <>
            <CloseCircleFilled style={{ color: "red", fontSize: "26px" }} />
            <Text style={{ fontSize: "22px", marginLeft: "10px" }}>
                No phone has been registered yet.
            </Text>
            <Form
                style={{ marginTop: "15px", marginBottom: "15px" }}
                name="register phone"
                layout="inline"
                onFinish={startPhoneNumberRegistration}
            >
                <Form.Item
                    name="new_phone_number"
                    rules={[
                        {
                            required: true,
                            validator: isPhoneNumberValid,
                            message: 'Please enter a valid phone number',
                        },
                    ]} >
                    <span>
                        <Input
                            name="new_phone_number"
                            type="text"
                            disabled={isRegisteringPhone}
                            value={phoneToRegister}
                            placeholder="Phone number"
                            onChange={handlePhoneInputChange}
                            style={{ width: "200px", height: "40px", fontSize: "18px" }}
                        />
                    </span>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ height: "40px", fontSize: "18px" }}>
                        Register Phone
                    </Button>
                </Form.Item>
            </Form>
            {isWaitingForVerification &&
                <VerificationCodeInput
                    autoFocus
                    fieldHeight={40}
                    fieldWidth={40}
                    fields={6}
                    loading={isVerifyingCode}
                    onComplete={sendPhoneVerificationCode} />
            }

        </>
    }

    return (
        <>
            <Title style={{ padding: "25px 15px 10px", margin: 0 }} level={3}>Phone Number</Title>
            <div className='phone-info'>
                {generatePhoneInfoContent()}
            </div>
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    registerPhone: (phoneNumber) => dispatch(registerPhoneStart(phoneNumber)),
    verifyPhone: (phoneNumber, code) => dispatch(verifyPhoneStart(phoneNumber, code)),
});

const mapStateToProps = createStructuredSelector({
    updatedPhone: selectPhoneNumber,
    isWaitingForVerification: selectIsWaitingForVerification,
    hasPhoneRegistered: selectAccountHasPhoneRegistered,
    isRegisteringPhone: selectIsRegisteringPhone,
    isVerifyingCode: selectIsVerifyingCode,
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountPhone)