import React from 'react';
import { Navigate } from 'react-router-dom';

// Authentication related pages
import Login from '../pages/Authentication/Login';
import Logout from '../pages/Authentication/Logout';
import ForgetPwd from '../pages/Authentication/ForgetPassword';
import AuthLockScreen from '../pages/Authentication/AuthLockScreen';
import DeleteAccount from '../pages/Authentication/DeleteAccount';

// Dashboard
import Dashboard from '../pages/Dashboard/index';

// Pages Calendar
import Calendar from '../pages/Calendar/Calendar';

// Pages Component
import Chat from '../pages/Chat/Chat';

//Activity Pages
import ActivityProducts from '../pages/Activity/ActivityProducts/index';
import ActivityProductDetail from '../pages/Activity/ActivityProducts/ActivityProductDetail';
import ActivityOrders from '../pages/Activity/ActivityOrders/index';
import ActivityCustomers from '../pages/Activity/ActivityCustomers/index';

import ActivityAddProduct from '../pages/Activity/ActivityAddProduct';

//Email
import EmailInbox from '../pages/Email/email-inbox';
import EmailRead from '../pages/Email/email-read';

// Inner Authentication
import Login1 from '../pages/AuthenticationInner/Login';
import ForgetPwd1 from '../pages/AuthenticationInner/ForgetPassword';

const authProtectedRoutes = [
  //Email
  { path: '/email-inbox', component: <EmailInbox /> },
  { path: '/email-read', component: <EmailRead /> },

  //Ecommerce

  { path: '/activity-products', component: <ActivityProducts /> },
  { path: '/ecommerce-product-detail/:id', component: <ActivityProductDetail /> },
  { path: '/activity-orders', component: <ActivityOrders /> },
  { path: '/activity-customers', component: <ActivityCustomers /> },
  { path: '/activity-add-product', component: <ActivityAddProduct /> },

  //chat
  { path: '/chat', component: <Chat /> },

  //calendar
  { path: '/calendar', component: <Calendar /> },

  { path: '/dashboard', component: <Dashboard /> },

  // this route should be at the end of all other routes
  { path: '/', exact: true, component: <Navigate to='/dashboard' /> },
];

const publicRoutes = [
  { path: '/logout', component: <Logout /> },
  { path: '/login', component: <Login /> },
  { path: '/forgot-password', component: <ForgetPwd /> },
  { path: '/lock-screen', component: <AuthLockScreen /> },
  { path: '/delete-account', component: <DeleteAccount /> },

  // Authentication Inner
  { path: '/auth-login', component: <Login1 /> },
  { path: '/auth-recoverpw', component: <ForgetPwd1 /> },
];

export { authProtectedRoutes, publicRoutes };
