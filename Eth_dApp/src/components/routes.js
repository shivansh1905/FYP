import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import POI from "./POI";
// import Contact from "./Contact/Contact";
// import Products from "./Product/Products";
import App from "./App";
import history from './History';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={App} />
                    <Route path="/POI" component={POI} />
                    {/* <Route path="/Contact" component={Contact} />
                    <Route path="/Products" component={Products} /> */}
                </Switch>
            </Router>
        )
    }
}