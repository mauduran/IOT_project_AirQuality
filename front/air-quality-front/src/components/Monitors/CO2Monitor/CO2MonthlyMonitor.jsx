import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import MonthlySensorGraphWithLevels from '../../../common/MonthlySensorGraphWithLevels/MonthlySensorGraphWithLevels';
import { createStructuredSelector } from 'reselect';
import { getMonthlySensorDataStart } from '../../../redux/sensors/sensors.actions';
import { fetchingMonthlySensorData, selectMonthlySensorData } from '../../../redux/sensors/sensors.selectors';
import { Space, Spin } from 'antd';
import { generateArrayWithDaysInMonth, getDaysInMonth } from '../../../utils/time.utils';
import { reduceValueArrayToLevelCount } from '../../../utils/sensors.utils';

const today = new Date();

const CO2MonthlyMonitor = ({ fetchCO2ForMonth, co2Values, isLoading }) => {
    const [date, setDate] = useState({ date: moment(today) });
    const [categories, setCategories] = useState([]);
    const [values, setValues] = useState([]);
    const [daysInMonth, setDaysInMonth] = useState(moment(today).daysInMonth());

    useEffect(() => {
        const [month, year] = date.date.format("MM/YYYY").split("/");

        fetchCO2ForMonth(month, year);
        setCategories(generateArrayWithDaysInMonth(month, year));
        setDaysInMonth(getDaysInMonth(month, year));

    }, [fetchCO2ForMonth, date])

    useEffect(() => {
        if (!co2Values || !co2Values.length) {
            setValues([]);
        } else {
            setValues(reduceValueArrayToLevelCount(co2Values, daysInMonth));
        }
    }, [co2Values, daysInMonth])

    if (isLoading)
        return <div className='centered' style={{ width: "100%" }}>
            <Space size="large">
                <Spin size="large" />
            </Space>
        </div>

    return (
        <MonthlySensorGraphWithLevels
            date={date.date}
            titleY="Level count"
            sensorType="CO2"
            onRefresh={(date) => setDate({ date })}
            categories={categories}
            valuesMap={values}
        />
    )
}

const mapDispatchToProps = dispatch => ({
    fetchCO2ForMonth: (month, year) => dispatch(getMonthlySensorDataStart("co2", month, year))
})

const mapStateToProps = createStructuredSelector({
    co2Values: selectMonthlySensorData("co2"),
    isLoading: fetchingMonthlySensorData("co2"),
})

export default connect(mapStateToProps, mapDispatchToProps)(CO2MonthlyMonitor);