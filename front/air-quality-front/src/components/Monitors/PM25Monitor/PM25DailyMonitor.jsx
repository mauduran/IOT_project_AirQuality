import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import DailySensorGraph from '../../../common/DailySensorGraph/DailySensorGraph';
import { createStructuredSelector } from 'reselect';
import { getDailySensorDataStart } from '../../../redux/sensors/sensors.actions';
import { fetchingDailySensorData, selectDailySensorData } from '../../../redux/sensors/sensors.selectors';
import { Space, Spin } from 'antd';
import { getPM25Limits } from '../../../constants/SensorLimits';

const today = new Date();

const PM25DailyMonitor = ({ fetchPM25ForDay, pm25s, isLoading }) => {
    const [date, setDate] = useState({date: moment(today)});

    useEffect(() => {
        const [day, month, year] = date.date.format("DD/MM/YYYY").split("/");

        fetchPM25ForDay(day, month, year);

    }, [fetchPM25ForDay, date])

    if (isLoading)
        return <div className='centered' style={{ width: "100%" }}>
            <Space size="large">
                <Spin size="large" />
            </Space>
        </div>

    return (
        <DailySensorGraph
            date={date.date}
            titleY="PM2.5 (ppm)"
            sensorType="PM25"
            onRefresh={(date)=>setDate({date})}
            values={pm25s && pm25s.map((pm25) => parseFloat(pm25.value))}
            categories={pm25s && pm25s.map((pm25) => new Date(pm25.date).toLocaleTimeString())}
            levels={getPM25Limits()}
            minY={0}
        />
    )
}

const mapDispatchToProps = dispatch => ({
    fetchPM25ForDay: (day, month, year) => dispatch(getDailySensorDataStart("pm2.5", day, month, year))
})

const mapStateToProps = createStructuredSelector({
    pm25s: selectDailySensorData("pm2.5"),
    isLoading: fetchingDailySensorData("pm2.5"),
})

export default connect(mapStateToProps, mapDispatchToProps)(PM25DailyMonitor);