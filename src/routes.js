import React from 'react';
import {Route} from 'react-router';
import Root from './components/Root'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import PostPage from './components/PostPage'
export default(
    <Route path="/" component={Root}>
        <Route path="register" component={Register}/>
        <Route path="login" component={Login}/>
        <Route path="profile" component={Profile}/>
        <Route path="posts" components={PostPage}/>
    </Route>
)