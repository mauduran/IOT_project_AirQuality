import React from 'react';
import Title from 'antd/lib/typography/Title';
import { connect } from 'react-redux';
import { Col, Row, Tabs } from 'antd';
import { createStructuredSelector } from 'reselect';

import HumidityMonitor from '../../components/Monitors/HumidityMonitor/HumidityMonitor';
import TemperatureMonitor from '../../components/Monitors/TemperatureMonitor/TemperatureMonitor';
import TemperatureDailyMonitor from '../../components/Monitors/TemperatureMonitor/TemperatureDailyMonitor';
import CO2Monitor from '../../components/Monitors/CO2Monitor/CO2Monitor';
import VOCMonitor from '../../components/Monitors/VOCMonitor/VOCMonitor';
import PM25Monitor from '../../components/Monitors/PM25Monitor/PM25Monitor';
import PM10Monitor from '../../components/Monitors/PM10Monitor/PM10Monitor';
import PM25DailyMonitor from '../../components/Monitors/PM25Monitor/PM25DailyMonitor';
import HumidityDailyMonitor from '../../components/Monitors/HumidityMonitor/HumidityDailyMonitor';
import PM10DailyMonitor from '../../components/Monitors/PM10Monitor/PM10DailyMonitor';
import VOCDailyMonitor from '../../components/Monitors/VOCMonitor/VOCDailyMonitor';
import CO2DailyMonitor from '../../components/Monitors/CO2Monitor/CO2DailyMonitor';
import TemperatureMonthlyMonitor from '../../components/Monitors/TemperatureMonitor/TemperatureMonthlyMonitor';
import HumidityMonthlyMonitor from '../../components/Monitors/HumidityMonitor/HumidityMonthlyMonitor';
import CO2MonthlyMonitor from '../../components/Monitors/CO2Monitor/CO2MonthlyMonitor';
import { msToMinutes } from '../../utils/time.utils';
import { selectCurrentAccountTitle } from '../../redux/account/account.selectors';
import PM10MonthlyMonitor from '../../components/Monitors/PM10Monitor/PM10MonthlyMonitor';
import PM25MonthlyMonitor from '../../components/Monitors/PM25Monitor/PM25MonthlyMonitor';
import VOCMonthlyMonitor from '../../components/Monitors/VOCMonitor/VOCMonthlyMonitor';

const { TabPane } = Tabs;

const Dashboard = ({ accountTitle }) => {
    const fetchInterval = msToMinutes(5);
    return (
        <div className="Dashboard" style={{ backgroundColor: "white", height: "100%", width: "100%", overflowY: "scroll" }}>
            <div style={{ margin: "0 auto", width: "96%", paddingTop: "5px" }}>
                <Row gutter={[24, 12]} style={{ marginBottom: "15px" }} align="middle" justify="space-evenly">
                    <Col xs={24} sm={24} md={24} lg={8} xl={12}>
                        <div className='page-header'>
                            <Title style={{ fontSize: "48px", color: "white", margin: "0 10px 0 0", textAlign: "justify" }} level={1}>{accountTitle || "Fetching Account..."}</Title>
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
                            <Row gutter={[24, 24]} style={{ marginBottom: "15px" }} justify="space-evenly">
                                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                                    <TemperatureDailyMonitor />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                                    <TemperatureMonthlyMonitor />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="Humidity" key="humidity">
                            <Row gutter={[24, 24]} style={{ marginBottom: "15px" }} justify="space-evenly">
                                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                                    <HumidityDailyMonitor />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                                    <HumidityMonthlyMonitor />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="CO2" key="co2">
                            <Row gutter={[24, 24]} style={{ marginBottom: "15px" }} justify="space-evenly">
                                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                                    <CO2DailyMonitor />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                                    <CO2MonthlyMonitor />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="VOC" key="voc">
                            <Row gutter={[24, 24]} style={{ marginBottom: "15px" }} justify="space-evenly">
                                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                                    <VOCDailyMonitor />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                                    <VOCMonthlyMonitor />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="PM2.5" key="pm2.5">
                            <Row gutter={[24, 24]} style={{ marginBottom: "15px" }} justify="space-evenly">
                                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                                    <PM25DailyMonitor />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                                    <PM25MonthlyMonitor />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="PM10" key="PM10">
                            <Row gutter={[24, 24]} style={{ marginBottom: "15px" }} justify="space-evenly">
                                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                                    <PM10DailyMonitor />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                                    <PM10MonthlyMonitor />
                                </Col>
                            </Row>
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
