import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddDesignation from "./AddDesignation";
import Designation from "./Designation";
import Home from "./Home";
import UpdateDesignation from "./UpdateDesignation";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/designations" exact component={Designation} />
                <Route path="/create/designation" exact component={AddDesignation} />
                <Route path="/designation/update/:id" exact component={UpdateDesignation} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;