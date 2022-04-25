import React from 'react';
import { connect } from 'react-redux';
import { Col, Row, Tabs } from 'antd';
import Title from 'antd/lib/typography/Title';

import HumidityMonitor from '../../components/Monitors/HumidityMonitor/HumidityMonitor';
import TemperatureMonitor from '../../components/Monitors/TemperatureMonitor/TemperatureMonitor';
import CO2Monitor from '../../components/Monitors/CO2Monitor/CO2Monitor';
import VOCMonitor from '../../components/Monitors/VOCMonitor/VOCMonitor';
import { msToMinutes } from '../../utils/time.utils';
import PM25Monitor from '../../components/Monitors/PM25Monitor/PM25Monitor';
import PM10Monitor from '../../components/Monitors/PM10Monitor/PM10Monitor';
import { createStructuredSelector } from 'reselect';
import { selectCurrentAccountTitle } from '../../redux/account/account.selectors';

const { TabPane } = Tabs;

const Dashboard = ({ accountTitle }) => {
    const fetchInterval = msToMinutes(5);
    return (
        <div className="Dashboard">
            <div style={{ margin: "20px auto", width: "96%" }}>
                <Row gutter={[24, 12]} style={{ marginBottom: "15px" }} align="middle" justify="space-evenly">
                    <Col xs={24} sm={24} md={24} lg={8} xl={12}>
                    <div className='page-header'>
                        <Title style={{ fontSize: "48px", color: "white", margin: "0 10px 0 0", textAlign: "justify" }} level={1}>{accountTitle}</Title>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <TemperatureMonitor delay={fetchInterval} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <HumidityMonitor delay={fetchInterval} />
                    </Col>
                </Row>
                <Row gutter={[24, 12]} justify="space-evenly" style={{ marginBottom: "15px" }}>
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

                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <Title style={{ fontSize: "36px", marginBottom: "0" }} level={2}>Analytics</Title>
                    </Col>
                </Row>
                <div>
                    <Tabs onChange={() => { }}>
                        <TabPane tab="Temperature" key="temperature">

                        </TabPane>
                        <TabPane tab="Humidity" key="humidity">

                        </TabPane>
                        <TabPane tab="CO2" key="co2">

                        </TabPane>
                        <TabPane tab="VOC" key="voc">

                        </TabPane>
                        <TabPane tab="PM2.5" key="pm2.5">

                        </TabPane>
                        <TabPane tab="PM10" key="PM10">

                        </TabPane>

                    </Tabs>
                </div>
            </div>
        </div >
    )
}

const mapStateToProps = createStructuredSelector({
    accountTitle: selectCurrentAccountTitle,
})

export default connect(mapStateToProps, null)(Dashboard);
