import React from 'react';
import {BrowserRouter, Route, Redirect, RouteProps, Switch} from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';

import { isAutheticated } from './services/auth';
import Header from './components/Header';
import Profile from './pages/Profile';
import Menu from './components/Menu';
import Create from './pages/Create';
import Post from './pages/Post';
import Search from './pages/Search';

interface RoutePropsCustom extends RouteProps {
    component: any;
}


const PrivateRoute = (props:RoutePropsCustom) => {
    const { component: Component, ...rest} = props;

    return (
        <>
        <Header />
        <Menu />
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
                <PrivateRoute path="/profile/:id" component={Profile} />
                <PrivateRoute path="/create" component={Create} />
                <PrivateRoute path="/post/:id" component={Post} />
                <PrivateRoute path="/search" component={Search} />
                <PrivateRoute path="*" component={() => <h1>Page not found</h1>} />
            </Switch>
            
        </BrowserRouter>
    )
}

export default Router;