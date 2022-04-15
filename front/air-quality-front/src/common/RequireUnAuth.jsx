import React from 'react'
import { connect } from 'react-redux';
import { Navigate, useLocation } from "react-router-dom";
import { createStructuredSelector } from 'reselect';
import { selectCurrentAccountName } from '../redux/account/account.selectors';

const RequireUnAuth = ({ accountName, children }) => {
    const location = useLocation();

    let to = (location.state && location.state.from && location.state.from.pathname) ? location.state.from.pathname : "/";

    return (accountName) ? <Navigate to={to} /> : children;
}

const mapStateToProps = createStructuredSelector({
    accountName: selectCurrentAccountName,
})

export default connect(mapStateToProps, null)(RequireUnAuth);
