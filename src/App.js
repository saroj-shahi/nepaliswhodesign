import React from 'react';

import Nav from './components/Nav'
import { Switch, Route } from 'react-router-dom';

import Submit from './views/Submit'
import Profile from './views/Profile'
import Home from './views/Home'
import Tag from './views/Tag'


export default class App extends React.Component {
  render () {
    return (
      <>
       <Nav />
       <Switch>
          <Route path="/" exact component={ Home } />
          <Route path="/submit" component={ Submit }  />
          <Route path="/profile/:id" component={ Profile }  />
          <Route path="/tag/:id" component={ Tag }  />

          <Route path="/profile" exact component={ Home }  />
          <Route path="/tag" exact component={ Home }  />
       </Switch>
      </>
    );
  }
}
