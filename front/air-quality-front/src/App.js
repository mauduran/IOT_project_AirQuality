import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Title from 'antd/lib/typography/Title';

import './App.css';
import { checkAccountSession, getAccountProfileStart } from './redux/account/account.actions';
import RequireAuth from './common/RequireAuth';
import RequireUnAuth from './common/RequireUnAuth';
import Dashboard from './containers/Dashboard/Dashboard';
import SignInAndSignUp from './containers/SignInAndSignUp/SignInAndSignUp';
import AppHeader from './components/AppHeader/AppHeader';
import { selectCurrentAccountName, selectIsLogged } from './redux/account/account.selectors';
import Account from './containers/Account/Account';

const { Sider, Content } = Layout;

function App({ checkAccountSession, isLoggedIn, accountName, fetchAccountProfile }) {
  useEffect(() => {
    checkAccountSession();
  }, [checkAccountSession]);

  useEffect(() => {
    if (isLoggedIn)
      fetchAccountProfile();

  }, [isLoggedIn, fetchAccountProfile])


  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="App">
      <Layout style={{ height: "100%" }}>
        <AppHeader />
        <Layout >
          {isLoggedIn && <Sider width="256px">
            <Menu
              style={{ width: 256 }}
              selectedKeys={location.pathname}
              defaultSelectedKeys={["/dashboard"]}
              mode="inline"
              theme="dark"
            >
              <Menu.Item key="account name" disabled="true">
                <Title style={{ color: 'white', padding: "15px", margin: 0 }} level={4}>{accountName}</Title>
              </Menu.Item>

              <Menu.Item key='/dashboard' onClick={() => navigate("/dashboard")} >
                Dashboard
              </Menu.Item>
              <Menu.Item key='/account' onClick={() => navigate("/account")}>
                Account Details
              </Menu.Item>
            </Menu>
          </Sider>}
          <Content style={{ overflowY: "auto", backgroundColor: "#ddd" }}>
            <Routes>
              <Route path='/' element={<Navigate to="/dashboard" />} />
              <Route path='/dashboard' element={<RequireAuth><Dashboard /></RequireAuth>} />
              <Route exact path='/account' element={<RequireAuth><Account /></RequireAuth>} />
              <Route exact path='/signin' element={<RequireUnAuth> <SignInAndSignUp /> </RequireUnAuth>} />
              <Route path="*" element={<Navigate to="/404" />} />
              <Route path="/404" element={<h1>404 - Nothing to see here</h1>} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  checkAccountSession: () => dispatch(checkAccountSession()),
  fetchAccountProfile: () => dispatch(getAccountProfileStart()),
});

const mapStateToProps = createStructuredSelector({
  isLoggedIn: selectIsLogged,
  accountName: selectCurrentAccountName,
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
