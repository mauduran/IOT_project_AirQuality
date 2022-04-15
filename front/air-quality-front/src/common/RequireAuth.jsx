import React from 'react'
import { connect } from 'react-redux';
import { useLocation, Navigate } from "react-router-dom";
import { createStructuredSelector } from 'reselect';
import { selectCurrentAccountName } from '../redux/account/account.selectors';

const RequireAuth = ({ children, accountName }) => {
    let location = useLocation();

    if (accountName) {
        return children;
    }
    return <Navigate to="/signin" state={{ from: location }} />

}

const mapStateToProps = createStructuredSelector({
    accountName: selectCurrentAccountName
})

export default connect(mapStateToProps, null)(RequireAuth);
