import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Tooltip } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';

const DailySensorGraph = ({ onRefresh, values, titleY, sensorType, categories, date, minY, maxY }) => {
    const [chartOptions, setchartOptions] = useState({});
    const dateFormat = 'MM/YYYY';

    useEffect(() => {
        setchartOptions({
            title: {
                text: `Daily ${sensorType} Levels for ${date.format("MM/YYYY")}`
            },
            xAxis: {
                categories: categories,
            },
            yAxis: {
                title: {
                    text: titleY
                },
                min: minY,
                max: maxY,
            },
            series: [
                {
                    name: "Temperatures",
                    data: values
                }
            ],
        })
    }, [values, categories, date, sensorType, titleY, minY, maxY])

    const disabledDate = (current) => {
        return current && current > moment().endOf('day');
    }

    const refreshData = () => {
        onRefresh(date)
    }

    const handleDateChange = (date) => {
        onRefresh(date);
    }

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                <Tooltip title="refresh">
                    <Button onClick={refreshData} shape="circle" type="text" icon={<SyncOutlined />} />
                </Tooltip>
                <DatePicker
                    picker="month"
                    disabledDate={disabledDate}
                    defaultValue={date}
                    onChange={handleDateChange}
                    format={dateFormat}
                    allowClear={false}
                />

            </div>
            {
                values && values.length ?
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions}
                    /> :
                    <Title style={{ fontSize: "48px" }} level={1}>N/A</Title>
            }
        </>
    )
}

export default DailySensorGraph