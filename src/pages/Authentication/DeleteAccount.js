import React, { Component } from 'react';

import { Row, Col, Button, Alert, Container } from 'reactstrap';

// Redux
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

// import images
import logodark from '../../assets/images/logo.png';
import logolight from '../../assets/images/logo-light.png';
import withRouter from '../../components/Common/withRouter';
import { showAlert } from '../../utils/alert';
import { deleteShopFailure, deleteShopStart, deleteShopSuccess } from '../../store/actions';

class DeleteAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleDelete() {
    try {
      const { navigate } = this.props.router;
      this.props.dispatch(deleteShopStart());
      const { id } = this.props.currentShop.data?.shop;
      const { token } = this.props.currentShop;

      const res = await fetch(`${process.env.REACT_APP_APIKEY}/api/v1/shops/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        this.props.dispatch(deleteShopFailure('Could not delete shop document'));
        showAlert('danger', 'Something went wrong, Could not delete your shop!');
        return;
      }
      this.props.dispatch(deleteShopSuccess(null));
      navigate('/login');
    } catch (error) {
      this.props.dispatch(deleteShopFailure(error.message));
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

                            <h4 className='font-size-18 mt-4'>Delete your shop ?</h4>
                            <p className='mt-4 text-muted'>
                              Contact the iShop Team regarding problems with your account. Our team is here to assist
                              you with anything you need, whether it's resolving a problem, updating your preferences,
                              or answering questions about our products and services.
                            </p>
                            <p className=' mt-4 text-muted'>
                              After deleting shop, you will not recover shop data. Would you still like to delete your
                              shop? If so, click the button below.
                            </p>
                          </div>
                          {this.props.error && this.props.error ? (
                            <Alert color='danger'>{this.props.error}</Alert>
                          ) : null}

                          <div className='mt-4 text-center'>
                            <Button
                              onClick={this.handleDelete}
                              color='primary'
                              className='w-md waves-effect waves-light'
                              type='button'
                            >
                              Delete Account
                            </Button>
                          </div>

                          <div className='mt-4 text-center'>
                            <Link to='/logout' className='text-muted'>
                              Log out to keep your data safe
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
  const { error, currentShop } = state.Shop;
  return { error, currentShop };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(DeleteAccount));
