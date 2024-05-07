import React, { Component } from 'react';
import { Row, Col, Alert, Button, Container, Label, Input } from 'reactstrap';

// Redux
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// availity-reactstrap-validation
import { AvForm } from 'availity-reactstrap-validation';

// import images
import logodark from '../../assets/images/logo.png';
import withRouter from '../../components/Common/withRouter';
import { showAlert } from '../../utils/alert';
import { updateShopFailure, updateShopStart, updateShopSuccess } from '../../store/actions';

class UpdatePasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // handleValidSubmit
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handleValidSubmit
  async handleValidSubmit() {
    try {
      const { navigate } = this.props.router;
      const { token } = this.props.currentShop;
      this.props.dispatch(updateShopStart());
      const res = await fetch(`${process.env.REACT_APP_APIKEY}/api/v1/shops/updateShopPassword`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(this.state),
      });
      const data = await res.json();
      if (data.status !== 'success') {
        this.props.dispatch(updateShopFailure(data.message));
        showAlert('danger', 'Something went wrong, Could not update your password!');
        return;
      }
      this.props.dispatch(updateShopSuccess(data));
      showAlert('success', 'Password updated successfully!');
      navigate('/');
    } catch (error) {
      this.props.dispatch(updateShopFailure(error.message));
      showAlert('danger', error.message);
    }
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
                              <Link to='/' className='logo'>
                                <img src={logodark} height='20' alt='logo' />
                              </Link>
                            </div>

                            <h4 className='font-size-18 mt-4'>Reset Password</h4>
                            <p className='text-muted'>Reset your password to Ishop.</p>
                          </div>

                          <div className='p-2 mt-5'>
                            {this.props.error && this.props.error ? (
                              <Alert color='danger' className='mb-4'>
                                {this.props.error}
                              </Alert>
                            ) : null}

                            <AvForm className='form-horizontal' onSubmit={this.handleValidSubmit}>
                              <div className='auth-form-group-custom mb-4'>
                                <i className='ri-lock-2-line auti-custom-input-icon'></i>
                                <Label htmlFor='passwordCurrent'>Current Password</Label>
                                <Input
                                  name='passwordCurrent'
                                  type='password'
                                  onChange={this.handleChange}
                                  className='form-control'
                                  id='passwordCurrent'
                                  placeholder='Enter current password'
                                />
                              </div>

                              <div className='auth-form-group-custom mb-4'>
                                <i className='ri-lock-2-line auti-custom-input-icon'></i>
                                <Label htmlFor='password'>New Password</Label>
                                <Input
                                  name='password'
                                  type='password'
                                  onChange={this.handleChange}
                                  className='form-control'
                                  id='password'
                                  placeholder='Enter new password'
                                />
                              </div>

                              <div className='auth-form-group-custom mb-4'>
                                <i className='ri-lock-2-line auti-custom-input-icon'></i>
                                <Label htmlFor='passwordConfirm'>Confrim Password</Label>
                                <Input
                                  name='passwordConfirm'
                                  type='password'
                                  onChange={this.handleChange}
                                  className='form-control'
                                  id='passwordConfirm'
                                  placeholder='Confirm new password'
                                />
                              </div>

                              <div className='mt-4 text-center'>
                                <Button color='primary' className='w-md waves-effect waves-light' type='submit'>
                                  Update Password
                                </Button>
                              </div>
                            </AvForm>
                          </div>

                          <div className='mt-5 text-center'>
                            <p>
                              Don't have an account ?{' '}
                              <Link to='/login' className='fw-medium text-primary'>
                                {' '}
                                Log in{' '}
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

const mapStatetoProps = (state) => {
  const { error, currentShop, loading } = state.Shop;
  return { error, currentShop, loading };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(UpdatePasswordPage));
