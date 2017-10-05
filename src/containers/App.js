import React, { Component } from 'react';
import { Route, BrowserRouter, Link, Switch, Redirect } from 'react-router-dom';
import Articles from './Articles';
import Topics from './Topics';
import Article from '../components/Article';
import NotFound from '../components/NotFound';

require('../App.css');

const redirect = () => (
  <Redirect to="/" />
)

export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="navBar">
            <div>
              <Link className="navBar_link" to="/articles">Home</Link>
              <Link className="navBar_link" to="/topics">Topics</Link>
            </div>
            <Link to="/">
              <img src="med.png" alt="medcircle logo"/>
            </Link>
            <div>
              <Link className="navBar_link" to="/">Login</Link>
              <Link className="navBar_link" to="/topics">Sign Up</Link>
            </div>
          </div>
          <Switch>
            <Route path="/" exact component={Articles} />
            <Route path="/topics" exact component={Topics} />
            <Route path="/articles" exact component={redirect} />
            <Route name="read-article" path="/articles/:id" exact component={Article} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
