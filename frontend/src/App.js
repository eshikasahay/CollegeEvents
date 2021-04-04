import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import RSOPage from './pages/RSOPage';
import CollegePage from './pages/CollegePage';
import CreateCollPage from './pages/CreateCollPage';
import CreateRsoPage from './pages/CreateRsoPage';
import CreateEventPage from './pages/CreateEventPage';
// import CreateRso from './components/CreateRso';
import ApproveRSOPage from './pages/ApproveRSOPage';
import DeleteRSOPage from './pages/DeleteRSOPage';

function App() {
  return (
    <Router >
      <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <Route path="/register" exact>
          <RegisterPage />
        </Route>
        <Route path="/home" exact>
          <HomePage />
        </Route>
        <Route path="/rso" exact>
          <RSOPage />
        </Route>
        <Route path="/college" exact>
          <CollegePage />
        </Route>
        <Route path="/createRso" exact>
          <CreateRsoPage />
        </Route>
        <Route path="/createColl" exact>
          <CreateCollPage />
        </Route>
        <Route path="/createEvent" exact>
          <CreateEventPage />
        </Route>
        <Route path="/approveRSO" exact>
          <ApproveRSOPage />
        </Route>
        <Route path="/deleteRSO" exact>
          <DeleteRSOPage />
        </Route>
        <Redirect to="/" />
      </Switch>  
    </Router>
  );
}

export default App;
