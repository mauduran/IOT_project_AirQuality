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

const VOCMonthlyMonitor = ({ fetchVOCForMonth, vocValues, isLoading }) => {
    const [date, setDate] = useState({ date: moment(today) });
    const [categories, setCategories] = useState([]);
    const [values, setValues] = useState([]);
    const [daysInMonth, setDaysInMonth] = useState(moment(today).daysInMonth());

    useEffect(() => {
        const [month, year] = date.date.format("MM/YYYY").split("/");

        fetchVOCForMonth(month, year);
        setCategories(generateArrayWithDaysInMonth(month, year));
        setDaysInMonth(getDaysInMonth(month, year));

    }, [fetchVOCForMonth, date])

    useEffect(() => {
        if (!vocValues || !vocValues.length) {
            setValues([]);
        } else {
            setValues(reduceValueArrayToLevelCount(vocValues, daysInMonth));
        }
    }, [vocValues, daysInMonth])

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
            sensorType="VOC"
            onRefresh={(date) => setDate({ date })}
            categories={categories}
            valuesMap={values}
        />
    )
}

const mapDispatchToProps = dispatch => ({
    fetchVOCForMonth: (month, year) => dispatch(getMonthlySensorDataStart("voc", month, year))
})

const mapStateToProps = createStructuredSelector({
    vocValues: selectMonthlySensorData("voc"),
    isLoading: fetchingMonthlySensorData("voc"),
})

export default connect(mapStateToProps, mapDispatchToProps)(VOCMonthlyMonitor);