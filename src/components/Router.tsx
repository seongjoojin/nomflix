import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from 'routes/Home';
import Detail from 'routes/Detail';
import Header from './Header';
import Search from 'routes/Search';

function Router() {
    return (
        <BrowserRouter>
            <>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/movie/:id" component={Detail} />
                    <Route path="/search" component={Search} />
                    <Redirect from="*" to="/" />
                </Switch>
            </>
        </BrowserRouter>
    )
}

export default Router;