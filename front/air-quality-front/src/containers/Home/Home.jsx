import React from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';


const Home = ({ fetchTasks }) => {
    const navigate = useNavigate();


    return (
        <div className="Home">
            <h1 className="title">HOME</h1>

        </div>
    )
}

const mapDispatchToProps = dispatch => ({
})

export default connect(null, mapDispatchToProps)(Home);
