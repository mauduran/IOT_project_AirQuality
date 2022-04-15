import React from 'react'
import { connect } from 'react-redux';
import { Navigate, useLocation } from "react-router-dom";
import { createStructuredSelector } from 'reselect';
import { selectAccountProfile } from '../redux/account/account.selectors';

const RequireUnAuth = ({ accountProfile, children }) => {
    const location = useLocation();

    let to = (location.state && location.state.from && location.state.from.pathname) ? location.state.from.pathname : "/";

    return (accountProfile) ? <Navigate to={to} /> : children;
}

const mapStateToProps = createStructuredSelector({
    accountProfile: selectAccountProfile,
})

export default connect(mapStateToProps, null)(RequireUnAuth);
