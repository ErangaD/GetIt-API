import React, { Component } from 'react';
import {Link} from "react-router";
class Login extends Component {
    render() {
        return (
            <div className="container">
                <div id="loginbox" style={{marginTop: 50}}
                     className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="panel-title">Sign In</div>
                            <div style={{float: 'right', fontSize: '80%', position: 'relative', top: '-10px'}}><a
                                href="#">Forgot password?</a></div>
                        </div>
                        <div style={{paddingTop: 30}} className="panel-body">
                            <div style={{display: 'none'}} id="login-alert" className="alert alert-danger col-sm-12"/>
                            <form id="loginform" className="form-horizontal" role="form" method="post" action="/login">
                                <div style={{marginBottom: 25}} className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-user"/></span>
                                    <input id="login-username" type="text" className="form-control" name="username"
                                           defaultValue placeholder="username or email"/>
                                </div>
                                <div style={{marginBottom: 25}} className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock"/></span>
                                    <input id="login-password" type="password" className="form-control" name="password"
                                           placeholder="password"/>
                                </div>
                                <div className="input-group">
                                    <div className="checkbox">
                                        <label>
                                            <input id="login-remember" type="checkbox" name="remember"
                                                   defaultValue={1}/> Remember me
                                        </label>
                                    </div>
                                </div>
                                <div style={{marginTop: 10}} className="form-group">
                                    {/* Button */}
                                    <div className="col-sm-12 controls">
                                        <button id="btn-signup" type="submit" className="btn btn-info"><i
                                            className="icon-hand-right"/> &nbsp; Login
                                        </button>
                                        <a id="btn-fblogin" href="#" className="btn btn-primary">Login with Facebook</a>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-12 control">
                                        <div style={{borderTop: '1px solid#888', paddingTop: 15, fontSize: '85%'}}>
                                            Don't have an account!
                                            <Link to="/register">
                                                Sign Up Here
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;
