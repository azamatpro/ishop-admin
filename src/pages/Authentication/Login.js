import React, { Component } from 'react';

import { Row, Col, Input, Button, Alert, Container, Label } from 'reactstrap';

// Redux
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

// import images
import logodark from '../../assets/images/logo.png';
import logolight from '../../assets/images/logo-light.png';
import withRouter from '../../components/Common/withRouter';

import { createShopStart, createShopSuccess, createShopFailure } from '../../store/actions';
import { showAlert } from '../../utils/alert';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  async handleSubmit(e) {
    e.preventDefault();
    try {
      const { navigate } = this.props.router;
      this.props.dispatch(createShopStart());
      const res = await fetch(`${process.env.REACT_APP_APIKEY}/api/v1/shops/loginShop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state),
      });
      const data = await res.json();
      if (data.status !== 'success') {
        this.props.dispatch(createShopFailure(data.message));
        showAlert('danger', data.message);
        return;
      }
      this.props.dispatch(createShopSuccess(data));
      navigate('/');
      showAlert('success', 'You logged in your shop successfully!');
    } catch (error) {
      this.props.dispatch(createShopFailure(error.message));
      showAlert('danger', error.message);
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

                            <h4 className='font-size-18 mt-4'>Welcome Back !</h4>
                            <p className='text-muted'>Sign in to continue to Ishop.</p>
                          </div>
                          {this.props.error && this.props.error ? (
                            <Alert color='danger'>{this.props.error}</Alert>
                          ) : null}
                          <div className='p-2 mt-5'>
                            <form className='form-horizontal' onSubmit={this.handleSubmit}>
                              <div className='auth-form-group-custom mb-4'>
                                <i className='ri-user-2-line auti-custom-input-icon'></i>
                                <Label htmlFor='email'>Email</Label>
                                <Input
                                  name='email'
                                  onChange={this.handleChange}
                                  type='text'
                                  className='form-control'
                                  id='email'
                                  placeholder='Enter email'
                                />
                              </div>

                              <div className='auth-form-group-custom mb-4'>
                                <i className='ri-lock-2-line auti-custom-input-icon'></i>
                                <Label htmlFor='password'>Password</Label>
                                <Input
                                  name='password'
                                  type='password'
                                  onChange={this.handleChange}
                                  className='form-control'
                                  id='password'
                                  placeholder='Enter password'
                                />
                              </div>

                              <div className='form-check'>
                                <Input type='checkbox' className='form-check-input' id='customControlInline' />
                                <Label className='form-check-label' htmlFor='customControlInline'>
                                  Remember me
                                </Label>
                              </div>

                              <div className='mt-4 text-center'>
                                <Button color='primary' className='w-md waves-effect waves-light' type='submit'>
                                  Log In
                                </Button>
                              </div>

                              <div className='mt-4 text-center'>
                                <Link to='/forgot-password' className='text-muted'>
                                  <i className='mdi mdi-lock me-1'></i> Forgot your password?
                                </Link>
                              </div>
                            </form>
                          </div>

                          <div className='mt-5 text-center'>
                            <p>
                              Don't have an account ?{' '}
                              <Link to='#' className='fw-medium text-primary'>
                                {' '}
                                Register{' '}
                              </Link>{' '}
                            </p>
                            <p>
                              © 2024 Ishop. Crafted with <i className='mdi mdi-heart text-danger'></i> by Ishop team
                            </p>
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

const mapStateToProps = (state) => {
  const { currentShop, error, loading } = state.Shop;
  return { currentShop, loading, error };
};
const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
