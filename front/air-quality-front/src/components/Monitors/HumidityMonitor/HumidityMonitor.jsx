import React, { useEffect } from 'react';
import { Space, Spin, Statistic } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInterval } from '../../../hooks/useInterval';
import { fetchingLastSensorData, selectLastSensorData } from '../../../redux/sensors/sensors.selectors';
import { getLastSensorDataStart } from '../../../redux/sensors/sensors.actions';

const HumidityMonitor = ({ delay, humidity, isLoading, fetchLastHumidity }) => {
    useEffect(() => {
        fetchLastHumidity();
    }, [fetchLastHumidity])

    useInterval(
        () => fetchLastHumidity(),
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
                title="Humidity"
                formatter={setStatisticFormatter}
                value={humidity && `${humidity.value} ${humidity.measurement}`} />
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    fetchLastHumidity: () => dispatch(getLastSensorDataStart("humidity"))
})

const mapStateToProps = createStructuredSelector({
    humidity: selectLastSensorData("humidity"),
    isLoading: fetchingLastSensorData("humidity"),
})

export default connect(mapStateToProps, mapDispatchToProps)(HumidityMonitor);