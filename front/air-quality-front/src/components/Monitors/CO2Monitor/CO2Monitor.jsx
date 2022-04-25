import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInterval } from '../../../hooks/useInterval';
import { fetchingLastSensorData, selectLastSensorData } from '../../../redux/sensors/sensors.selectors';
import { getLastSensorDataStart } from '../../../redux/sensors/sensors.actions';
import SensorLevel from '../../../common/SensorLevel/SensorLevel';

const CO2Monitor = ({ delay, co2, isLoading, fetchLastCO2 }) => {
    useEffect(() => {
        fetchLastCO2();
    }, [fetchLastCO2])

    useInterval(
        () => fetchLastCO2(),
        delay
    );

    return (
        <SensorLevel
            sensorType="CO2"
            sensorData={co2}
            action={fetchLastCO2}
            isLoading={isLoading} />
    )
}

const mapDispatchToProps = dispatch => ({
    fetchLastCO2: () => dispatch(getLastSensorDataStart("co2"))
})

const mapStateToProps = createStructuredSelector({
    co2: selectLastSensorData("co2"),
    isLoading: fetchingLastSensorData("co2"),
})

export default connect(mapStateToProps, mapDispatchToProps)(CO2Monitor);