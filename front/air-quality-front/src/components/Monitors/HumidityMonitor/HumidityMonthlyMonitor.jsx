import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import MonthlySensorGraph from '../../../common/MonthlySensorGraph/MonthlySensorGraph';
import { createStructuredSelector } from 'reselect';
import { getMonthlySensorDataStart } from '../../../redux/sensors/sensors.actions';
import { fetchingMonthlySensorData, selectMonthlySensorData } from '../../../redux/sensors/sensors.selectors';
import { Space, Spin } from 'antd';
import { generateArrayWithDaysInMonth, getDaysInMonth } from '../../../utils/time.utils';
import { reduceValueArrayToDayAverages } from '../../../utils/sensors.utils';

const today = new Date();

const HumidityMonthlyMonitor = ({ fetchHumidityForMonth, humidities, isLoading }) => {
    const [date, setDate] = useState({ date: moment(today) });
    const [categories, setCategories] = useState([]);
    const [values, setValues] = useState([]);
    const [daysInMonth, setDaysInMonth] = useState(moment(today).daysInMonth());

    useEffect(() => {
        const [month, year] = date.date.format("MM/YYYY").split("/");

        fetchHumidityForMonth(month, year);
        setCategories(generateArrayWithDaysInMonth(month, year));
        setDaysInMonth(getDaysInMonth(month, year));

    }, [fetchHumidityForMonth, date])

    useEffect(() => {
        if (!humidities || !humidities.length) {
            setValues([]);
        } else {
            const averages = reduceValueArrayToDayAverages(humidities, daysInMonth);
            setValues(averages);
        }
    }, [humidities, daysInMonth])

    if (isLoading)
        return <div className='centered' style={{ width: "100%" }}>
            <Space size="large">
                <Spin size="large" />
            </Space>
        </div>

    return (
        <MonthlySensorGraph
            date={date.date}
            titleY="Humidity (%)"
            sensorType="Humidity"
            onRefresh={(date) => setDate({ date })}
            seriesName="Humidity level"
            values={values}
            categories={categories}
        />
    )
}

const mapDispatchToProps = dispatch => ({
    fetchHumidityForMonth: (month, year) => dispatch(getMonthlySensorDataStart("humidity", month, year))
})

const mapStateToProps = createStructuredSelector({
    humidities: selectMonthlySensorData("humidity"),
    isLoading: fetchingMonthlySensorData("humidity"),
})

export default connect(mapStateToProps, mapDispatchToProps)(HumidityMonthlyMonitor);