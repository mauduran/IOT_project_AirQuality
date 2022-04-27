import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import DailySensorGraph from '../../../common/DailySensorGraph/DailySensorGraph';
import { createStructuredSelector } from 'reselect';
import { getDailySensorDataStart } from '../../../redux/sensors/sensors.actions';
import { fetchingDailySensorData, selectDailySensorData } from '../../../redux/sensors/sensors.selectors';
import { Space, Spin } from 'antd';
import { getCO2Limits } from '../../../constants/SensorLimits';

const today = new Date();

const CO2DailyMonitor = ({ fetchCO2ForDay, co2s, isLoading }) => {
    const [date, setDate] = useState({date: moment(today)});

    useEffect(() => {
        const [day, month, year] = date.date.format("DD/MM/YYYY").split("/");

        fetchCO2ForDay(day, month, year);

    }, [fetchCO2ForDay, date])

    if (isLoading)
        return <div className='centered' style={{ width: "100%" }}>
            <Space size="large">
                <Spin size="large" />
            </Space>
        </div>

    return (
        <DailySensorGraph
            date={date.date}
            titleY="CO2 (ppm)"
            sensorType="CO2"
            onRefresh={(date)=>setDate({date})}
            values={co2s && co2s.map((co2) => parseFloat(co2.value))}
            categories={co2s && co2s.map((co2) => new Date(co2.date).toLocaleTimeString())}
            levels={getCO2Limits()}
            minY={0}
        />
    )
}

const mapDispatchToProps = dispatch => ({
    fetchCO2ForDay: (day, month, year) => dispatch(getDailySensorDataStart("co2", day, month, year))
})

const mapStateToProps = createStructuredSelector({
    co2s: selectDailySensorData("co2"),
    isLoading: fetchingDailySensorData("co2"),
})

export default connect(mapStateToProps, mapDispatchToProps)(CO2DailyMonitor);