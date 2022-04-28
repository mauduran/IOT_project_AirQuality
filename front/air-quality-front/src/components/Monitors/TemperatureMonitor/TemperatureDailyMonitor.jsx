import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import DailySensorGraph from '../../../common/DailySensorGraph/DailySensorGraph';
import { createStructuredSelector } from 'reselect';
import { getDailySensorDataStart } from '../../../redux/sensors/sensors.actions';
import { fetchingDailySensorData, selectDailySensorData } from '../../../redux/sensors/sensors.selectors';
import { Space, Spin } from 'antd';

const today = new Date();

const TemperatureDailyMonitor = ({ fetchTemperatureForDay, temperatures, isLoading }) => {
    const [date, setDate] = useState({date: moment(today)});

    useEffect(() => {
        const [day, month, year] = date.date.format("DD/MM/YYYY").split("/");

        fetchTemperatureForDay(day, month, year);

    }, [fetchTemperatureForDay, date])

    if (isLoading)
        return <div className='centered' style={{ width: "100%" }}>
            <Space size="large">
                <Spin size="large" />
            </Space>
        </div>

    return (
        <DailySensorGraph
            date={date.date}
            titleY="Temperature (ºC)"
            sensorType="Temperature"
            seriesName="Temperature Level"
            onRefresh={(date)=>setDate({date})}
            values={temperatures && temperatures.map((temperature) => parseFloat(temperature.value))}
            categories={temperatures && temperatures.map((temperature) => new Date(temperature.date).toLocaleTimeString())}
        />
    )
}

const mapDispatchToProps = dispatch => ({
    fetchTemperatureForDay: (day, month, year) => dispatch(getDailySensorDataStart("temperature", day, month, year))
})

const mapStateToProps = createStructuredSelector({
    temperatures: selectDailySensorData("temperature"),
    isLoading: fetchingDailySensorData("temperature"),
})

export default connect(mapStateToProps, mapDispatchToProps)(TemperatureDailyMonitor);