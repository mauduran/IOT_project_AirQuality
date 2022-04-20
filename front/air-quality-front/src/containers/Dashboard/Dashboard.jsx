import { Col, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { connect } from 'react-redux';

import HumidityMonitor from '../../components/Monitors/HumidityMonitor/HumidityMonitor';
import TemperatureMonitor from '../../components/Monitors/TemperatureMonitor/TemperatureMonitor';
import CO2Monitor from '../../components/Monitors/CO2Monitor/CO2Monitor';
import VOCMonitor from '../../components/Monitors/VOCMonitor/VOCMonitor';
import { msToMinutes } from '../../utils/time.utils';
import PM25Monitor from '../../components/Monitors/PM25Monitor/PM25Monitor';
import PM10Monitor from '../../components/Monitors/PM10Monitor/PM10Monitor';

const Dashboard = () => {
    const fetchInterval = msToMinutes(5);
    return (
        <div className="Dashboard">
            <div className='page-header'>
                <Title style={{ fontSize: "48px", margin: 0, color: "white" }} level={1}>Dashboard</Title>
            </div>

            <div style={{ margin: "20px auto", width: "94%" }}>
                <Row gutter={[24, 24]} style={{marginBottom: "24px"}} justify="space-evenly">
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <TemperatureMonitor delay={fetchInterval} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <HumidityMonitor delay={fetchInterval} />
                    </Col>
                </Row>
                <Row gutter={[24, 24]} justify="space-evenly">
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <CO2Monitor delay={fetchInterval} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <VOCMonitor delay={fetchInterval} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <PM25Monitor delay={fetchInterval} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <PM10Monitor delay={fetchInterval} />
                    </Col>
                </Row>
            </div>


        </div >
    )
}

const mapDispatchToProps = dispatch => ({
})

export default connect(null, mapDispatchToProps)(Dashboard);
