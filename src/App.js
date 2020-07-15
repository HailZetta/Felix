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
import CreateInvitation from './views/createinvitation';
import Contact from './views/contact';
import Library from './views/library';

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
      <PrivateRoute path='/profile' roles={['user', 'admin']} component={Profile} />
      <PrivateRoute path='/create-invitation' roles={['user', 'admin']} component={CreateInvitation} />
    </Router>
  );
}

export default App;
