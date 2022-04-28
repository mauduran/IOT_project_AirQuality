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

const TemperatureMonthlyMonitor = ({ fetchTemperatureForMonth, temperatures, isLoading }) => {
    const [date, setDate] = useState({ date: moment(today) });
    const [categories, setCategories] = useState([]);
    const [values, setValues] = useState([]);
    const [daysInMonth, setDaysInMonth] = useState(moment(today).daysInMonth());



    useEffect(() => {
        const [month, year] = date.date.format("MM/YYYY").split("/");

        fetchTemperatureForMonth(month, year);
        setCategories(generateArrayWithDaysInMonth(month, year));
        setDaysInMonth(getDaysInMonth(month, year));

    }, [fetchTemperatureForMonth, date])

    useEffect(() => {
        if (!temperatures || !temperatures.length) {
            setValues([]);
        } else {
            const averages = reduceValueArrayToDayAverages(temperatures, daysInMonth);
            setValues(averages);
        }
    }, [temperatures, daysInMonth])

    if (isLoading)
        return <div className='centered' style={{ width: "100%" }}>
            <Space size="large">
                <Spin size="large" />
            </Space>
        </div>

    return (
        <MonthlySensorGraph
            date={date.date}
            titleY="Temperature (ºC)"
            sensorType="Temperature"
            onRefresh={(date) => setDate({ date })}
            values={values}
            categories={categories}
            seriesName="Temperature Level"
        />
    )
}

const mapDispatchToProps = dispatch => ({
    fetchTemperatureForMonth: (month, year) => dispatch(getMonthlySensorDataStart("temperature", month, year))
})

const mapStateToProps = createStructuredSelector({
    temperatures: selectMonthlySensorData("temperature"),
    isLoading: fetchingMonthlySensorData("temperature"),
})

export default connect(mapStateToProps, mapDispatchToProps)(TemperatureMonthlyMonitor);