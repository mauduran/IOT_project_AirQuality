import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import DailySensorGraph from '../../../common/DailySensorGraph/DailySensorGraph';
import { createStructuredSelector } from 'reselect';
import { getDailySensorDataStart } from '../../../redux/sensors/sensors.actions';
import { fetchingDailySensorData, selectDailySensorData } from '../../../redux/sensors/sensors.selectors';
import { Space, Spin } from 'antd';
import { getPM10Limits } from '../../../constants/SensorLimits';

const today = new Date();

const PM10DailyMonitor = ({ fetchPM10ForDay, pm10s, isLoading }) => {
    const [date, setDate] = useState({date: moment(today)});

    useEffect(() => {
        const [day, month, year] = date.date.format("DD/MM/YYYY").split("/");

        fetchPM10ForDay(day, month, year);

    }, [fetchPM10ForDay, date])

    if (isLoading)
        return <div className='centered' style={{ width: "100%" }}>
            <Space size="large">
                <Spin size="large" />
            </Space>
        </div>

    return (
        <DailySensorGraph
            date={date.date}
            titleY="PM10 (ug/m3)"
            sensorType="PM10"
            onRefresh={(date)=>setDate({date})}
            values={pm10s && pm10s.map((pm10) => parseFloat(pm10.value))}
            categories={pm10s && pm10s.map((pm10) => new Date(pm10.date).toLocaleTimeString())}
            levels={getPM10Limits()}
            minY={0}
        />
    )
}

const mapDispatchToProps = dispatch => ({
    fetchPM10ForDay: (day, month, year) => dispatch(getDailySensorDataStart("pm10", day, month, year))
})

const mapStateToProps = createStructuredSelector({
    pm10s: selectDailySensorData("pm10"),
    isLoading: fetchingDailySensorData("pm10"),
})

export default connect(mapStateToProps, mapDispatchToProps)(PM10DailyMonitor);