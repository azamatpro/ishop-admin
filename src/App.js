import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

// Import Routes
import { authProtectedRoutes, publicRoutes } from './routes';

// layouts
import VerticalLayout from './components/VerticalLayout/';
import NonAuthLayout from './components/NonAuthLayout';

// Import scss
import './assets/scss/theme.scss';

//Fake backend
import fakeBackend from './helpers/AuthType/fakeBackend';
import AppRoute from './routes/route';

//Firebase helper
// import { initFirebaseBackend } from "./helpers/firebase_helper";

// Activating fake backend
fakeBackend();

// const firebaseConfig = {
// 	apiKey: process.env.REACT_APP_APIKEY,
// 	authDomain: process.env.REACT_APP_AUTHDOMAIN,
// 	databaseURL: process.env.REACT_APP_DATABASEURL,
// 	projectId: process.env.REACT_APP_PROJECTID,
// 	storageBucket: process.env.REACT_APP_STORAGEBUCKET,
// 	messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
// 	appId: process.env.REACT_APP_APPID,
// 	measurementId: process.env.REACT_APP_MEASUREMENTID,
// };

// init firebase backend
// initFirebaseBackend(firebaseConfig);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getLayout = this.getLayout.bind(this);
  }

  /**
   * Returns the layout
   */
  getLayout = () => {
    let layoutCls = VerticalLayout;

    switch (this.props.layout.layoutType) {
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  };

  render() {
    const Layout = this.getLayout();

    return (
      <React.Fragment>
        <Routes>
          {publicRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={<NonAuthLayout>{route.component}</NonAuthLayout>}
              key={idx}
              exact={true}
            />
          ))}

          {authProtectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <AppRoute>
                  <Layout>{route.component}</Layout>
                </AppRoute>
              }
              key={idx}
              exact={true}
            />
          ))}
        </Routes>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
