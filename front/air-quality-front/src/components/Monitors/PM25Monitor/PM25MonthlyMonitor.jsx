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

const PM25MonthlyMonitor = ({ fetchPM25ForMonth, pm25Values, isLoading }) => {
    const [date, setDate] = useState({ date: moment(today) });
    const [categories, setCategories] = useState([]);
    const [values, setValues] = useState([]);
    const [daysInMonth, setDaysInMonth] = useState(moment(today).daysInMonth());

    useEffect(() => {
        const [month, year] = date.date.format("MM/YYYY").split("/");

        fetchPM25ForMonth(month, year);
        setCategories(generateArrayWithDaysInMonth(month, year));
        setDaysInMonth(getDaysInMonth(month, year));

    }, [fetchPM25ForMonth, date])

    useEffect(() => {
        if (!pm25Values || !pm25Values.length) {
            setValues([]);
        } else {
            setValues(reduceValueArrayToLevelCount(pm25Values, daysInMonth));
        }
    }, [pm25Values, daysInMonth])

    if (isLoading)
        return <div className='centered' style={{ width: "250%" }}>
            <Space size="large">
                <Spin size="large" />
            </Space>
        </div>

    return (
        <MonthlySensorGraphWithLevels
            date={date.date}
            titleY="Level count"
            sensorType="PM25"
            onRefresh={(date) => setDate({ date })}
            categories={categories}
            valuesMap={values}
        />
    )
}

const mapDispatchToProps = dispatch => ({
    fetchPM25ForMonth: (month, year) => dispatch(getMonthlySensorDataStart("pm2.5", month, year))
})

const mapStateToProps = createStructuredSelector({
    pm25Values: selectMonthlySensorData("pm2.5"),
    isLoading: fetchingMonthlySensorData("pm2.5"),
})

export default connect(mapStateToProps, mapDispatchToProps)(PM25MonthlyMonitor);