import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import './App.css';
import routes from './core/routes';

const App = () => (
  <Switch>
	  {
		  routes.map((route, i) => (
			  <Route key={i} {...route} />
		  ))
	  }
  </Switch>
);

export default App;
