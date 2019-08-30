import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {HashRouter, Switch, Route,Redirect} from 'react-router-dom';
import store from './redux/store';
import Login from './containers/login';
import Register from './containers/register';
import Main from './containers/main';
import './assets/less/index.less';

ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route path='/' component={Main}/>、
                <Redirect path='/' component={Login}></Redirect>
            </Switch>
        </HashRouter>
    </Provider>
), document.getElementById('app'))
