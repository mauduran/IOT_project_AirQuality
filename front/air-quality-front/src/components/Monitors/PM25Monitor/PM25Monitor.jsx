import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInterval } from '../../../hooks/useInterval';
import { fetchingLastSensorData, selectLastSensorData } from '../../../redux/sensors/sensors.selectors';
import { getLastSensorDataStart } from '../../../redux/sensors/sensors.actions';
import SensorLevel from '../../../common/SensorLevel/SensorLevel';

const PM25Monitor = ({ delay, pm25, isLoading, fetchLastPM25 }) => {
    useEffect(() => {
        fetchLastPM25();
    }, [fetchLastPM25])

    useInterval(
        () => fetchLastPM25(),
        delay
    );

    return (
        <SensorLevel
            sensorType="PM25"
            sensorData={pm25}
            isLoading={isLoading} />
    )
}

const mapDispatchToProps = dispatch => ({
    fetchLastPM25: () => dispatch(getLastSensorDataStart("pm2.5"))
})

const mapStateToProps = createStructuredSelector({
    pm25: selectLastSensorData("pm2.5"),
    isLoading: fetchingLastSensorData("pm2.5"),
})

export default connect(mapStateToProps, mapDispatchToProps)(PM25Monitor);