import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect, RouteProps, Switch} from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';

import { isAutheticated } from './services/auth';

interface RoutePropsCustom extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any;
}


const PrivateRoute = (props:RoutePropsCustom) => {
    const { component: Component, ...rest} = props;

    return (
        <>
        <Route 
            {...rest}
            render = { routerProps => 
                
                isAutheticated() ? ( 
                    <Component {...routerProps} />
                ) : (
                    <Redirect to={{pathname:"/", state: { from: routerProps.location}}} />
                )
            }
        />
        </>
    )
}

const PublicRoute = (props: RoutePropsCustom) => {
    const { component: Component, ...rest} = props;

    return (
        <>
            <Route 
                {...rest}
                render = { routerProps => 
                    isAutheticated() ? (
                        <Redirect to={{ pathname:"/home", state: {
                            from : routerProps.location
                        }}} />
                    ) : (
                        <Component {...routerProps} /> 
                    )
                
                }
            />
        </>
    )
}
function Router() {
    return(
        <BrowserRouter>
            <Switch>
                <PublicRoute path="/" component={Login} exact/>
                <PrivateRoute path="/home" component={Home} />
                <Route path="*" component={() => <h1>Page not found</h1>} />
            </Switch>
            
        </BrowserRouter>
    )
}

export default Router;