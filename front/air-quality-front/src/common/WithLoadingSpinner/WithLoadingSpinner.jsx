import React from 'react';
import { Space, Spin } from 'antd';

import "./WithLoadingSpinner.css";

const WithLoadingSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {

    return isLoading ? (
        <div className="centered space-above">
            <Space size="large">
                <Spin size="large" />
            </Space>
        </div>
    ) : <WrappedComponent {...otherProps} />
}

export default WithLoadingSpinner;