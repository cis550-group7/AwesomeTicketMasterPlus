import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import ArtistPage from './pages/ArtistPage';
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import EventPage from './pages/EventPage';
import SongPage from './pages/SongPage';

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact
							path="/"
							render={() => (
								<HomePage />
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
							path="/songs"
							render={() => (
								<SongPage />
							)}/>
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);