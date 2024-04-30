import React, { Component } from 'react';

import { Row, Col, Button, Alert, Container } from 'reactstrap';

// Redux
import { connect, useDispatch } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';

// actions
import { checkLogin, apiError } from '../../store/actions';

// import images
import logodark from '../../assets/images/logo.png';
import logolight from '../../assets/images/logo-light.png';
import withRouter from '../../components/Common/withRouter';
import { deleteShopFailure, deleteShopStart, deleteShopSuccess } from '../../redux/shop/shopSlice';
// import { showAlert } from '../../utils/alert';

// Functional component to wrap the class component
const WrapperComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Pass the dispatch function down as a prop to the class component
  return <Logout dispatch={dispatch} navigate={navigate} />;
};

class Logout extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  async handleLogout() {
    try {
      this.props.dispatch(deleteShopStart());
      const res = await fetch(`${process.env.REACT_APP_APIKEY}/api/v1/shops/logoutShop`);
      const data = await res.json();
      if (data.status !== 'success') {
        this.props.dispatch(deleteShopFailure(data.message));
        // showAlert('error', 'Something went wrong, Could not log out!');
        return;
      }
      this.props.dispatch(deleteShopSuccess(data));
      //   showAlert('success', 'You logged out from shop successfully!');
      this.props.navigate('/login');
    } catch (error) {
      this.props.dispatch(deleteShopFailure(error.message));
      //   showAlert('error', error.message);
    }
  }

  componentDidMount() {
    document.body.classList.add('auth-body-bg');
  }

  componentWillUnmount() {
    document.body.classList.remove('auth-body-bg');
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <Container fluid className='p-0'>
            <Row className='g-0'>
              <Col lg={4}>
                <div className='authentication-page-content p-4 d-flex align-items-center min-vh-100'>
                  <div className='w-100'>
                    <Row className='justify-content-center'>
                      <Col lg={9}>
                        <div>
                          <div className='text-center'>
                            <div>
                              <Link to='/' className=''>
                                <img src={logodark} alt='' height='20' className='auth-logo logo-dark mx-auto' />
                                <img src={logolight} alt='' height='20' className='auth-logo logo-light mx-auto' />
                              </Link>
                            </div>

                            <h4 className='font-size-18 mt-4'>Log out from shop ?</h4>
                            <p className='mt-4 text-muted'>
                              Logging out ensures that information related to your shop remains safe and secure,
                              especially if you're using a shared or public device. It's a small but crucial step in
                              maintaining the confidentiality of your shop.
                            </p>
                            <p className=' mt-4 text-muted'>
                              After logging out, you will not receive message notifications. Would you still like to log
                              out? If so, click the button below.
                            </p>
                          </div>
                          {this.props.loginError && this.props.loginError ? (
                            <Alert color='danger'>{this.props.loginError}</Alert>
                          ) : null}

                          <div className='mt-4 text-center'>
                            <Button
                              onClick={this.handleLogout}
                              color='primary'
                              className='w-md waves-effect waves-light'
                              type='button'
                            >
                              Log Out
                            </Button>
                          </div>

                          <div className='mt-4 text-center'>
                            <Link to='/delete-account' className='text-muted'>
                              Want to delete your shop ?
                            </Link>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col lg={8}>
                <div className='authentication-bg'>
                  <div className='bg-overlay'></div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { loginError } = state.Login;
  return { loginError };
};

export default withRouter(connect(mapStatetoProps, { checkLogin, apiError })(WrapperComponent));
