import './asset/scss/common.scss'
import React, {Fragment} from 'react';
import Switch from 'react-router-dom/Switch';
import './App.css';
import routes from './core/routes';
import Head from './component/Head';
import NotFoundPage from './pages/NotFoundPage';

import {Route, Redirect} from 'react-router-dom'

const App = () => (
  <Fragment>
    <Switch>
      {
        routes.map((route, i) => (
          <Route key={i} {...route} />
        ))
      }
      <Route path='/404' component={NotFoundPage}/>
      <Redirect from='*' to='/404'/>
    </Switch>
  </Fragment>
);
//<Head />
export default App;
