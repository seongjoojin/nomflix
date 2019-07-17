import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from 'routes/Home';
import Detail from 'routes/Detail';

function Router() {
    return (
        <BrowserRouter>
            <>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/movie/:id" component={Detail} />
                    <Redirect from="*" to="/" />
                </Switch>
            </>
        </BrowserRouter>
    )
}

export default Router;