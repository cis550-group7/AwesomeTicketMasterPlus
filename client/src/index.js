import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import ArtistPage from './pages/ArtistPage';
import EventPage from './pages/EventPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

ReactDOM.render(
  <div>
	<Provider store={store}>
    <Router>
      <Switch>
        <Route exact
							path="/"
							render={() => (
								<HomePage />
							)}/>
        <Route exact
							path="/users"
							render={() => (
								<UserPage />
							)}/>
        <Route exact
							path="/artists"
							render={() => (
								<ArtistPage />
							)}/>
        <Route exact
							path="/events"
							render={() => (
								<EventPage />
							)}/>
        <Route exact
							path="/register"
							render={() => (
								<RegisterPage />
							)}/>
        <Route exact
							path="/login"
							render={() => (
								<LoginPage />
							)}/>
      </Switch>
    </Router>
	</Provider>
  </div>,
  document.getElementById('root')
);

