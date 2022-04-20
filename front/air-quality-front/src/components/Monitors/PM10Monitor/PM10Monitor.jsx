import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInterval } from '../../../hooks/useInterval';
import { fetchingLastSensorData, selectLastSensorData } from '../../../redux/sensors/sensors.selectors';
import { getLastSensorDataStart } from '../../../redux/sensors/sensors.actions';
import SensorLevel from '../../../common/SensorLevel/SensorLevel';

const PM10Monitor = ({ delay, pm10, isLoading, fetchLastPM10 }) => {
    useEffect(() => {
        fetchLastPM10();
    }, [fetchLastPM10])

    useInterval(
        () => fetchLastPM10(),
        delay
    );

    return (
        <SensorLevel
            sensorType="PM10"
            sensorData={pm10}
            isLoading={isLoading} />
    )
}

const mapDispatchToProps = dispatch => ({
    fetchLastPM10: () => dispatch(getLastSensorDataStart("pm10"))
})

const mapStateToProps = createStructuredSelector({
    pm10: selectLastSensorData("pm10"),
    isLoading: fetchingLastSensorData("pm10"),
})

export default connect(mapStateToProps, mapDispatchToProps)(PM10Monitor);