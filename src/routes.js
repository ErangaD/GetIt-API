import React from 'react';
import {Route} from 'react-router';
import Root from './components/Root'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import PostPage from './components/PostPage'
import Message from './components/ChatPage'
import Report from './components/ReportPage'
import DashBoard from './components/admin/AdminDashBoard'
import Reports from './components/admin/Reports'
import ErrorPage from './components/ErrorPage'
export default(
    <Route component={Root}>
        <Route path="/" component={Login}/>
        <Route path="register" component={Register}/>
        <Route path="login" component={Login}/>
        <Route path="profile" component={Profile}/>
        <Route path="posts" components={PostPage}/>
        <Route path="message" components={Message}/>
        <Route path="report" component={Report}/>
        <Route path="admin/reports" component={Reports}/>
        <Route path="admin" component={DashBoard}/>
        <Route path="*" component={ErrorPage}/>
    </Route>
)