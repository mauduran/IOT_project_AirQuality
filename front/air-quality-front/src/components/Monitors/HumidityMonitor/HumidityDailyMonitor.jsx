import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import DailySensorGraph from '../../../common/DailySensorGraph/DailySensorGraph';
import { createStructuredSelector } from 'reselect';
import { getDailySensorDataStart } from '../../../redux/sensors/sensors.actions';
import { fetchingDailySensorData, selectDailySensorData } from '../../../redux/sensors/sensors.selectors';
import { Space, Spin } from 'antd';

const today = new Date();

const HumidityDailyMonitor = ({ fetchHumidityForDay, humidities, isLoading }) => {
    const [date, setDate] = useState({date: moment(today)});

    useEffect(() => {
        const [day, month, year] = date.date.format("DD/MM/YYYY").split("/");

        fetchHumidityForDay(day, month, year);

    }, [fetchHumidityForDay, date])

    if (isLoading)
        return <div className='centered' style={{ width: "100%" }}>
            <Space size="large">
                <Spin size="large" />
            </Space>
        </div>

    return (
        <DailySensorGraph
            date={date.date}
            titleY="Humidity (%)"
            sensorType="Humidity"
            onRefresh={(date)=>setDate({date})}
            values={humidities && humidities.map((humidity) => parseFloat(humidity.value))}
            categories={humidities && humidities.map((humidity) => new Date(humidity.date).toLocaleTimeString())}
        />
    )
}

const mapDispatchToProps = dispatch => ({
    fetchHumidityForDay: (day, month, year) => dispatch(getDailySensorDataStart("humidity", day, month, year))
})

const mapStateToProps = createStructuredSelector({
    humidities: selectDailySensorData("humidity"),
    isLoading: fetchingDailySensorData("humidity"),
})

export default connect(mapStateToProps, mapDispatchToProps)(HumidityDailyMonitor);