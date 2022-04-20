import { Progress, Space, Spin, Statistic } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { ALERT_LEVELS_TEXT } from '../../constants/AirQualityLevels';
import RiskLevelColors from '../../constants/RiskLevelColors';
import './SensorLevel.css';

const SensorLevel = ({ sensorType, sensorData, isLoading }) => {
    const setStatisticFormatter = (data) => {
        if (!data && !isLoading) return "N/A"
        return (isLoading ?
            <div className='centered' style={{ width: "100%" }}>
                <Space size="large">
                    <Spin size="large" />
                </Space>
            </div>
            : data &&
            <div className='centered-multi' style={{ width: "80%" }} >
                <Progress
                    type="dashboard"
                    percent={(data.value * 100 / data.maxValue).toPrecision(2)}
                    format={_ => (
                        <>
                            <p className="sensor-value">{data.value}</p> 
                            <p className="sensor-measurement">{data.measurement}</p>
                        </>
                    )}
                    strokeColor={RiskLevelColors[data.level]}
                    width={180}
                    strokeWidth={8}
                    trailColor="#bebebe"
                />
                <Title
                    style={{ margin: "-20px 0 0 0", textAlign: "center", height: "fit-content" }}
                    level={4}>
                    {ALERT_LEVELS_TEXT[data.level]}
                </Title>
            </div>
        )
    }

    return (
        <div className="temp-monitor-container">
            <Statistic
                title={sensorType}
                formatter={setStatisticFormatter}
                value={sensorData} />
        </div>
    )
}

export default SensorLevel;