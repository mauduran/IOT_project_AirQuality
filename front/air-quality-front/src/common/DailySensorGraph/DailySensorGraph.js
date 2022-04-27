import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Tooltip } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';

const DailySensorGraph = ({ levels, onRefresh, values, titleY, sensorType, categories, date, minY, maxY }) => {
  const [chartOptions, setchartOptions] = useState({});
  const dateFormat = 'DD/MM/YYYY';

  useEffect(() => {
    setchartOptions({
      title: {
        text: `Daily ${sensorType} Levels for ${date.format("DD/MM/YYYY")}`
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
        plotLines: levels && levels.map((levelLimit) => ({
          value: levelLimit.value,
          color: levelLimit.color,
          label: { text: levelLimit.label },
          dashStyle: 'shortdash',
          width: 2,
        }))
      },
      series: [
        {
          name: "Temperatures",
          data: values
        }
      ],
    })
  }, [values, categories, date, levels, sensorType, titleY, minY, maxY])

  const disabledDate = (current) => {
    return current && current > moment().endOf('day');
  }

  const refreshData = () => {
    console.log("REFRESHING")
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
          defaultValue={date}
          disabledDate={disabledDate}
          onChange={handleDateChange}
          format={dateFormat}
          allowClear={false}
        />
      </div>
      {
        values && values.length?
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />:
        <Title style={{ fontSize: "48px" }} level={1}>N/A</Title>
      }
    </>
  )
}

export default DailySensorGraph