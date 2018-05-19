import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Top from './components/Top';
import BakuhaTodo from './components/BakuhaTodo';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Top} />
      <Route exact path="/:id" component={BakuhaTodo} />
    </Switch>
  </Router>
);

export default App;
