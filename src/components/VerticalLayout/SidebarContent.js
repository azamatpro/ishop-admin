import React, { Component } from 'react';

// MetisMenu
import MetisMenu from 'metismenujs';
// import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';

//i18n
import { withTranslation } from 'react-i18next';

import { connect } from 'react-redux';
import {
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType,
  changePreloader,
} from '../../store/actions';
import withRouter from '../Common/withRouter';

class SidebarContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathName: this.props.router.location.pathname,
      loggedAuthElements: [
        { to: '/update-password', text: 'Update Password' },
        { to: '/forgot-password', text: 'Forget Password' },
        { to: '/lock-screen', text: 'Lock Screen' },
        { to: '/logout', text: 'Log out' },
      ],
    };
  }

  componentDidMount() {
    this.initMenu();
  }

  UNSAFE_componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.type !== prevProps.type) {
        this.initMenu();
      }
    }
    if (this.props.router.location.pathname !== prevProps.router.location.pathname) {
      this.setState({ pathName: this.props.router.location.pathname }, () => {
        this.initMenu();
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  initMenu() {
    new MetisMenu('#side-menu');
    const { pathName } = this.state;

    var matchingMenuItem = null;
    var ul = document.getElementById('side-menu');
    var items = ul.getElementsByTagName('a');
    for (var i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }
  }

  activateParentDropdown = (item) => {
    item.classList.add('active');
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add('mm-active');
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add('mm-show');

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add('mm-active'); // li
          parent3.childNodes[0].classList.add('mm-active'); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add('mm-active');
          }
        }
      }
      return false;
    }
    return false;
  };

  render() {
    return (
      <React.Fragment>
        <div id='sidebar-menu'>
          <ul className='metismenu list-unstyled' id='side-menu'>
            <li className='menu-title'>{this.props.t('Menu')}</li>
            <li>
              <Link to='/dashboard' className='waves-effect'>
                <i className='ri-dashboard-line'></i>
                <span className='ms-1'>{this.props.t('Dashboard')}</span>
              </Link>
            </li>
            <li>
              <Link to='/calendar' className=' waves-effect'>
                <i className='ri-calendar-2-line'></i>
                <span className='ms-1'>{this.props.t('Calendar')}</span>
              </Link>
            </li>
            <li>
              <Link to='/chat' className=' waves-effect'>
                <i className='ri-chat-1-line'></i>
                <span className='ms-1'>{this.props.t('Chat')}</span>
              </Link>
            </li>
            <li>
              <Link to='/#' className='has-arrow waves-effect'>
                <i className='ri-store-2-line'></i>
                <span className='ms-1'>{this.props.t('Activity')}</span>
              </Link>
              <ul className='sub-menu'>
                <li>
                  <Link to='/activity-products'>{this.props.t('Products')}</Link>
                </li>
                <li>
                  <Link to='/activity-orders'>{this.props.t('Orders')}</Link>
                </li>
                <li>
                  <Link to='/activity-customers'>{this.props.t('Customers')}</Link>
                </li>
                <li>
                  <Link to='/activity-add-product'>{this.props.t('Add Product')}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to='/#' className='has-arrow waves-effect'>
                <i className='ri-mail-send-line'></i>
                <span className='ms-1'>{this.props.t('Email')}</span>
              </Link>
              <ul className='sub-menu'>
                <li>
                  <Link to='/email-inbox'>{this.props.t('Inbox')}</Link>
                </li>
                <li>
                  <Link to='/email-read'>{this.props.t('Read Email')}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to='/#' className='has-arrow waves-effect'>
                <i className='ri-account-circle-line'></i>
                <span className='ms-1'>{this.props.t('Authentication')}</span>
              </Link>
              <ul className='sub-menu'>
                {!this.props.currentShop && (
                  <li>
                    <Link to='/login'>{this.props.t('Login')}</Link>
                  </li>
                )}
                {this.props.currentShop &&
                  this.state.loggedAuthElements.map((el, index) => (
                    <li key={index}>
                      <Link to={el.to}>{this.props.t(el.text)}</Link>
                    </li>
                  ))}
              </ul>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { currentShop } = state.Shop;
  return { currentShop, ...state.Layout };
};

export default withRouter(
  connect(mapStatetoProps, {
    changeLayout,
    changeSidebarTheme,
    changeSidebarType,
    changeLayoutWidth,
    changePreloader,
  })(withTranslation()(SidebarContent))
);
