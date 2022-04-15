import React from 'react'
import { connect } from 'react-redux';

const Dashboard = () => {
    return (
        <div className="Dashboard">
            <h1 className="title">HOME</h1>

        </div>
    )
}

const mapDispatchToProps = dispatch => ({
})

export default connect(null, mapDispatchToProps)(Dashboard);
