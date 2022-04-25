import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInterval } from '../../../hooks/useInterval';
import { fetchingLastSensorData, selectLastSensorData } from '../../../redux/sensors/sensors.selectors';
import { getLastSensorDataStart } from '../../../redux/sensors/sensors.actions';
import SensorLevel from '../../../common/SensorLevel/SensorLevel';

const VOCMonitor = ({ delay, voc, isLoading, fetchLastVOC }) => {
    useEffect(() => {
        fetchLastVOC();
    }, [fetchLastVOC])

    useInterval(
        () => fetchLastVOC(),
        delay
    );

    return (
        <SensorLevel
            sensorType="VOC"
            sensorData={voc}
            action={fetchLastVOC}
            isLoading={isLoading} />
    )
}

const mapDispatchToProps = dispatch => ({
    fetchLastVOC: () => dispatch(getLastSensorDataStart("voc"))
})

const mapStateToProps = createStructuredSelector({
    voc: selectLastSensorData("voc"),
    isLoading: fetchingLastSensorData("voc"),
})

export default connect(mapStateToProps, mapDispatchToProps)(VOCMonitor);