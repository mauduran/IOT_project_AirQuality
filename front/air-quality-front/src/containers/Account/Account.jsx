import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import AccountInfo from '../../components/Account/AccountInfo/AccountInfo';
import { getAccountProfileStart } from '../../redux/account/account.actions';

const Account = ({ fetchAccountProfile }) => {
  useEffect(() => {
    fetchAccountProfile();
  }, [fetchAccountProfile])

  return <AccountInfo/>;
}

const mapDispatchToProps = dispatch => ({
  fetchAccountProfile: () => dispatch(getAccountProfileStart()),
});

export default connect(null, mapDispatchToProps)(Account)