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

const PM10MonthlyMonitor = ({ fetchPM10ForMonth, pm10Values, isLoading }) => {
    const [date, setDate] = useState({ date: moment(today) });
    const [categories, setCategories] = useState([]);
    const [values, setValues] = useState([]);
    const [daysInMonth, setDaysInMonth] = useState(moment(today).daysInMonth());

    useEffect(() => {
        const [month, year] = date.date.format("MM/YYYY").split("/");

        fetchPM10ForMonth(month, year);
        setCategories(generateArrayWithDaysInMonth(month, year));
        setDaysInMonth(getDaysInMonth(month, year));

    }, [fetchPM10ForMonth, date])

    useEffect(() => {
        if (!pm10Values || !pm10Values.length) {
            setValues([]);
        } else {
            setValues(reduceValueArrayToLevelCount(pm10Values, daysInMonth));
        }
    }, [pm10Values, daysInMonth])

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
            sensorType="PM10"
            onRefresh={(date) => setDate({ date })}
            categories={categories}
            valuesMap={values}
        />
    )
}

const mapDispatchToProps = dispatch => ({
    fetchPM10ForMonth: (month, year) => dispatch(getMonthlySensorDataStart("pm10", month, year))
})

const mapStateToProps = createStructuredSelector({
    pm10Values: selectMonthlySensorData("pm10"),
    isLoading: fetchingMonthlySensorData("pm10"),
})

export default connect(mapStateToProps, mapDispatchToProps)(PM10MonthlyMonitor);