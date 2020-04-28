import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import POI from "../components/POI";
import RetrieveID from "../components/RetrieveID";
import App from "../components/App";
import history from './History';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={App} />
                    <Route path="/POI" component={POI} />
                    <Route path="/RetrieveID" component={RetrieveID} />
                </Switch>
            </Router>
        )
    }
}