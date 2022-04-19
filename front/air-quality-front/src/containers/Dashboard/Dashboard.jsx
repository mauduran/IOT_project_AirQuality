import { Col, Row } from 'antd';
import React from 'react'
import { connect } from 'react-redux';

const Dashboard = () => {

    return (
        <div className="Dashboard">
            <h1 className="title">HOME</h1>
            <Row gutter={[24, 24]} justify="space-evenly" style={{width: "95%", margin: "10px auto"}}>
                <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                    <div style={{ background: "blue", height: "300px", width: "100%" }} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                    <div style={{ background: "blue", height: "300px", width: "100%" }} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                    <div style={{ background: "blue", height: "300px", width: "100%" }} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                    <div style={{ background: "blue", height: "300px", width: "100%" }} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                    <div style={{ background: "blue", height: "300px", width: "100%" }} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                    <div style={{ background: "blue", height: "300px", width: "100%" }} />
                </Col>
            </Row>

        
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
})

export default connect(null, mapDispatchToProps)(Dashboard);
