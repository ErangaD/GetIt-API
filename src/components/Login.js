import React from 'react';
import classNames from 'classnames';
import {Link} from "react-router";
var validator = require('validator');
import axios from 'axios';
var isEmpty = require('lodash.isempty');

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            userName:'',
            password:'',
            errors:{},
            isLoading:false
        };
        this.onChange=this.onChange.bind(this);
        this.onLogin=this.onLogin.bind(this);
    }
    isValid(){
        const {errors, isValid} =this.validateInput(this.state);
        if(!isValid){
            this.setState({errors});
        }
        return isValid;
    }
    validateInput(data){
        var errors = {};
        if(validator.isEmpty(data.name)){
            errors.name = "Name is required";
        }
        if(validator.isEmpty(data.password)){
            errors.password = "Password is required";
        }
        return({
            errors,
            isValid:isEmpty(errors)
        })
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    onLogin(e){
        e.preventDefault();
        this.setState({errors:{},isLoading:true});
        axios.post('http://localhost:3001/api/authentication',
            {user:this.state})
            .then((response)=>{
                const token = response.data.token;
                localStorage.setItem('jwtToken',token);
                this.context.router.push('/profile');
            }).catch((errors)=>{
                const {status} = errors.response;
                this.setState({userName:'',password:'',isLoading:false});
                if(status){
                    if(status===500){
                        this.setState(
                            {
                                errors:errors.response.data , isLoading:false
                            });
                        console.log(this.state.errors);
                    }
                }
        });
    }  
    render() {
        const {userName,password,isLoading}=this.state;
        return (
            <div className="container">
                <div id="loginbox" style={{marginTop: 50}}
                     className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                    <div className={classNames("container", {'has-error':this.props.location.query.err})}>
                        {this.props.location.query.err && <h3><span className="help-block">{this.props.location.query.err}</span></h3>}
                    </div>
                    <div className={classNames("container", {'has-error':this.state.errors.password})}>
                        {this.state.errors.password && <h3><span className="help-block">{this.state.errors.password}</span></h3>}
                    </div>
                    <div className={classNames("container", {'has-error':this.state.errors.userName})}>
                        {this.state.errors.userName && <h3><span className="help-block">{this.state.errors.userName}</span></h3>}
                    </div>
                    <div className={classNames("container", {'has-error':this.state.errors.error})}>
                        {this.state.errors.error && <h3><span className="help-block">{this.state.errors.error}</span></h3>}
                    </div>
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="panel-title">Sign In</div>
                            {/*<div style={{float: 'right', fontSize: '80%', position: 'relative', top: '-10px'}}><a
                                href="#">Forgot password?</a></div>*/}
                            {/* forgot password is to be implemented */}
                        </div>
                        <div style={{paddingTop: 30}} className="panel-body">
                            <div style={{display: 'none'}} id="login-alert" className="alert alert-danger col-sm-12"/>
                            <form id="loginform" className="form-horizontal" role="form" onSubmit={this.onLogin}>
                                <div style={{marginBottom: 25}} className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-user"/></span>
                                    <input id="login-username"
                                           type="text"
                                           className="form-control"
                                           name="userName"
                                           placeholder="username"
                                           value={userName}
                                           onChange={this.onChange}
                                    />
                                </div>
                                <div style={{marginBottom: 25}} className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock"/></span>
                                    <input id="login-password"
                                           type="password"
                                           className="form-control"
                                           name="password"
                                           placeholder="password"
                                           value={password}
                                           onChange={this.onChange}
                                    />
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
                                        <button id="btn-signup"
                                                type="submit"
                                                className="btn btn-info"
                                                disabled={isLoading}
                                        ><i
                                            className="icon-hand-right"/> &nbsp; Login
                                        </button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-12 control">
                                        <div style={{borderTop: '1px solid#888', paddingTop: 15, fontSize: '105%'}}>
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
Login.contextTypes= {
    router:React.PropTypes.object.isRequired
}
export default Login;
