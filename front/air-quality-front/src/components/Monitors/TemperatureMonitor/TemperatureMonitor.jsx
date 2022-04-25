import React, { useEffect } from 'react';
import { Button, Space, Spin, Statistic, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInterval } from '../../../hooks/useInterval';
import { fetchingLastSensorData, selectLastSensorData } from '../../../redux/sensors/sensors.selectors';
import { getLastSensorDataStart } from '../../../redux/sensors/sensors.actions';
import { SyncOutlined } from '@ant-design/icons';

const TemperatureMonitor = ({ delay, temperature, isLoading, fetchLastTemperature }) => {
    useEffect(() => {
        fetchLastTemperature();
    }, [fetchLastTemperature])

    useInterval(
        () => fetchLastTemperature(),
        delay
    );

    const setStatisticFormatter = (value) => (
        isLoading ?
            <div className='centered' style={{ width: "100%" }}>
                <Space size="large">
                    <Spin size="large" />
                </Space>
            </div>
            : value || "N/A"
    )

    return (
        <div className="temp-monitor-container">
            <Statistic
                title={
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Tooltip title="refresh">
                            <Button onClick={fetchLastTemperature} shape="circle" type="text" icon={<SyncOutlined />} />
                        </Tooltip>
                        Temperature
                    </div>
                }
            formatter={setStatisticFormatter}
            value={temperature && `${temperature.value} ${temperature.measurement}`} />
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    fetchLastTemperature: () => dispatch(getLastSensorDataStart("temperature"))
})

const mapStateToProps = createStructuredSelector({
    temperature: selectLastSensorData("temperature"),
    isLoading: fetchingLastSensorData("temperature"),
})

export default connect(mapStateToProps, mapDispatchToProps)(TemperatureMonitor);