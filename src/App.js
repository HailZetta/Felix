import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'antd/dist/antd.css';
import './i18n';
import PrivateRoute from './privaterule/PrivateRoute';
import UnPrivateRoute from './privaterule/UnPrivateRoute';
import Homepage from './views';
import Login from './views/login';
import Register from './views/register';
import Dashboard from './views/dashboard';
import Profile from './views/profile';
import Welcome from './views/welcome';
import AdminPanel from './views/adminpanel';
import Template from './views/template';
import Libraries from './views/libraries';
import Contact from './views/contact';
import Library from './views/library';
import Invitation from './views/invitation';
import GuestList from './views/guestlist';
import Create from './views/invitationCreate';
import ChooseTemplate from './views/invitationTemplate';
import InvitationContent from './views/invitationContent';
import InvitationGuest from './views/invitationGuest';
import InvitationPayment from './views/invitationPayment';
import InvitationFinish from './views/invitationFinish';
import InvitationView from './views/invitationView';

function App() {
  return (
    <Router>
      <Route path='/' exact component={Homepage} />
      <Route path='/template/:templateId' component={Template} />
      <Route path='/libraries' component={Libraries} />
      <Route path='/library/:type_en' component={Library} />
      <Route path='/contact' component={Contact} />
      <UnPrivateRoute path='/login' component={Login} />
      <UnPrivateRoute path='/register' component={Register} />
      <PrivateRoute path='/admin-panel' roles={'admin'} component={AdminPanel} />
      <PrivateRoute path='/welcome' roles={['user', 'admin']} component={Welcome} />
      <PrivateRoute path='/dashboard' roles={['user', 'admin']} component={Dashboard} />
      <PrivateRoute path='/invitation' roles={['user', 'admin']} component={Invitation} />
      <PrivateRoute path='/guestlist' roles={['user', 'admin']} component={GuestList} />
      <PrivateRoute path='/profile' roles={['user', 'admin']} component={Profile} />
      <PrivateRoute path='/invitation-create' roles={['user', 'admin']} component={Create} />
      <PrivateRoute path='/invitation-template/:id' roles={['user', 'admin']} component={ChooseTemplate} />
      <PrivateRoute path='/invitation-content/:id' roles={['user', 'admin']} component={InvitationContent} />
      <PrivateRoute path='/invitation-guest/:id' roles={['user', 'admin']} component={InvitationGuest} />
      <PrivateRoute path='/invitation-payment/:id' roles={['user', 'admin']} component={InvitationPayment} />
      <PrivateRoute path='/invitation-finish/:id' roles={['user', 'admin']} component={InvitationFinish} />
      <PrivateRoute path='/invi/:invi_id/:guest_id' roles={['user', 'admin']} component={InvitationView} />
    </Router>
  );
}

export default App;
