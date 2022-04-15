import React from 'react'
import { connect } from 'react-redux';
import { useLocation, Navigate } from "react-router-dom";
import { createStructuredSelector } from 'reselect';
import { selectAccountProfile } from '../redux/account/account.selectors';

const RequireAuth = ({ children, accountProfile }) => {
    let location = useLocation();

    if (accountProfile) {
        return children;
    }
    return <Navigate to="/signin" state={{ from: location }} />

}

const mapStateToProps = createStructuredSelector({
    accountProfile: selectAccountProfile
})

export default connect(mapStateToProps, null)(RequireAuth);
