import { Col, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { connect } from 'react-redux';
import HumidityMonitor from '../../components/Monitors/HumidityMonitor/HumidityMonitor';
import TemperatureMonitor from '../../components/Monitors/TemperatureMonitor/TemperatureMonitor';
import { msToMinutes } from '../../utils/time.utils';

const Dashboard = () => {
    const fetchInterval = msToMinutes(1);
    return (
        <div className="Dashboard">
            <div className='page-header'>
                <Title style={{ fontSize: "48px", margin: 0, color: "white" }} level={1}>Dashboard</Title>
            </div>

            <div style={{ margin: "10px auto", width: "94%" }}>
                <Row gutter={[24, 24]} justify="space-evenly">
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <TemperatureMonitor delay={fetchInterval} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <HumidityMonitor delay={fetchInterval} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <div style={{ background: "blue", height: "300px", width: "100%" }}>
                            CO2
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <div style={{ background: "blue", height: "300px", width: "100%" }}>
                            VOC
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <div style={{ background: "blue", height: "300px", width: "100%" }}>
                            PM2.5
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <div style={{ background: "blue", height: "300px", width: "100%" }}>
                            PM10
                        </div>
                    </Col>
                </Row>
            </div>


        </div >
    )
}

const mapDispatchToProps = dispatch => ({
})

export default connect(null, mapDispatchToProps)(Dashboard);
