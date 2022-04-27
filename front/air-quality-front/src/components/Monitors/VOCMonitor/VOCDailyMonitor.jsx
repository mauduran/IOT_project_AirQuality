import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import DailySensorGraph from '../../../common/DailySensorGraph/DailySensorGraph';
import { createStructuredSelector } from 'reselect';
import { getDailySensorDataStart } from '../../../redux/sensors/sensors.actions';
import { fetchingDailySensorData, selectDailySensorData } from '../../../redux/sensors/sensors.selectors';
import { Space, Spin } from 'antd';
import { getVOCLimits } from '../../../constants/SensorLimits';

const today = new Date();

const VOCDailyMonitor = ({ fetchVOCForDay, vocs, isLoading }) => {
    const [date, setDate] = useState({date: moment(today)});

    useEffect(() => {
        const [day, month, year] = date.date.format("DD/MM/YYYY").split("/");

        fetchVOCForDay(day, month, year);

    }, [fetchVOCForDay, date])

    if (isLoading)
        return <div className='centered' style={{ width: "100%" }}>
            <Space size="large">
                <Spin size="large" />
            </Space>
        </div>

    return (
        <DailySensorGraph
            date={date.date}
            titleY="VOC (ppm)"
            sensorType="VOC"
            onRefresh={(date)=>setDate({date})}
            values={vocs && vocs.map((voc) => parseFloat(voc.value))}
            categories={vocs && vocs.map((voc) => new Date(voc.date).toLocaleTimeString())}
            levels={getVOCLimits()}
            minY={0}
        />
    )
}

const mapDispatchToProps = dispatch => ({
    fetchVOCForDay: (day, month, year) => dispatch(getDailySensorDataStart("voc", day, month, year))
})

const mapStateToProps = createStructuredSelector({
    vocs: selectDailySensorData("voc"),
    isLoading: fetchingDailySensorData("voc"),
})

export default connect(mapStateToProps, mapDispatchToProps)(VOCDailyMonitor);