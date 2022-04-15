import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { Layout, Button } from 'antd';
import Title from 'antd/lib/typography/Title';

import './AppHeader.css';
import Logo from './air_quality_logo_nobg.png';
import { signOutStart } from '../../redux/account/account.actions';
import { selectIsLogged } from '../../redux/account/account.selectors';

const { Header } = Layout;

const AppHeader = ({ signOut, isLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut();
    }

    const goToSignInPage = () => {
        navigate("signin", { replace: true });
    }

    return (
        <Header className='navbar' style={{ padding: 10 }} onClick={() => navigate("/")} >
            <div className='nav-main'>
                <img src={Logo} className="logo" alt="logo" />
                <Title className="nav-header" style={{ color: 'white', margin: 0 }} level={3}>Air Quality System</Title>
            </div>

            {
                isLoggedIn ?
                    <Button type="text" size='large' style={{ color: "white" }} onClick={handleLogout}>Sign Out</Button> :
                    <Button type="text" size='large' style={{ color: "white" }} onClick={goToSignInPage}>Sign In</Button>
            }

        </Header>
    );
}

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOutStart())
})

const mapStateToProps = createStructuredSelector({
    isLoggedIn: selectIsLogged
})

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);

