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
import PublicTemplate from './views/publictemplate';
import PrivateTemplate from './views/privatetemplate';
import AdminPanel from './views/adminpanel';

function App() {
  return (
    <Router>
      <Route path='/' exact component={Homepage} />
      <Route path='/public-template' component={PublicTemplate} />
      <UnPrivateRoute path='/login' component={Login} />
      <UnPrivateRoute path='/register' roles={['user', 'admin']} component={Register} />
      <PrivateRoute path='/admin-panel' roles={'admin'} component={AdminPanel} />
      <PrivateRoute path='/welcome' roles={['user', 'admin']} component={Welcome} />
      <PrivateRoute path='/dashboard' roles={['user', 'admin']} component={Dashboard} />
      <PrivateRoute path='/profile' roles={['user', 'admin']} component={Profile} />
      <PrivateRoute path='/private-template' roles={['user', 'admin']} component={PrivateTemplate} />
    </Router>
  );
}

export default App;
