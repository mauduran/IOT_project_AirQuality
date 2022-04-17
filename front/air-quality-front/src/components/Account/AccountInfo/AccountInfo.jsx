import Title from 'antd/lib/typography/Title';
import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import WithLoadingSpinner from '../../../common/WithLoadingSpinner/WithLoadingSpinner';
import { selectAccountProfile, selectIsFetchingAccount } from '../../../redux/account/account.selectors';
import AccountDescription from '../AccountDescription/AccountDescription';
import AccountPhone from '../AccountPhone/AccountPhone';
import AccountTitle from '../AccountTitle/AccountTitle';
import ChangePasswordForm from '../ChangePasswordForm/ChangePasswordForm';
import './AccountInfo.css';

const AccountInfo = ({ accountProfile }) => {
    if (accountProfile) {
        const { accountName, title, description } = accountProfile;
        return (
            <div className='account-info-container'>
                <div className='account-header'>
                    <Title style={{ fontSize: "48px", margin: 0, color: "white" }} level={1}>Account: {accountName}</Title>
                </div>
                <AccountTitle title={title} />
                <AccountDescription description={description} />
                <AccountPhone />
                <ChangePasswordForm />
            </div>
        )
    }
    return <Title style={{ padding: "15px", margin: 0 }} level={1}>Could not get account.</Title>
}

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsFetchingAccount,
    accountProfile: selectAccountProfile,
})

const AccountInfoContainer = compose(
    connect(mapStateToProps),
    WithLoadingSpinner
)(AccountInfo);

export default AccountInfoContainer;
