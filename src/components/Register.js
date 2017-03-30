import React, { Component } from 'react';
import {Link} from "react-router";
import BuyerSignUpForm from './BuyerSignUpForm'
class Register extends Component{
    
    render(){
        return(
            <div className="container">
                <div id="signupbox" style={{marginTop: 50}} className="mainbox col-md-9 col-md-offset-2 col-sm-8 col-sm-offset-2">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="panel-title">Sign Up</div>
                            <div style={{float: 'right', fontSize: '85%', position: 'relative', top: '-10px'}}><Link to={"/register"}>Sign In</Link></div>
                            <div className="row">
                                <div className="panel with-nav-tabs panel-info">
                                    <div className="panel-heading">
                                        <ul className="nav nav-tabs nav-justified" width="100%">
                                            <li className="active"><a href="#tab1primary" data-toggle="tab">Buyer</a></li>
                                            <li><a href="#tab2primary" data-toggle="tab">Seller</a></li>
                                        </ul>
                                    </div>
                                    <div className="panel-body">
                                        <div className="tab-content">
                                            <div className="tab-pane fade in active" id="tab1primary">
                                                <div className="panel-body">
                                                    <BuyerSignUpForm/>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="tab2primary">
                                                <div className="panel-body">
                                                    <form id="signupform" className="form-horizontal" role="form" method="post" action="/profile">
                                                        <div id="signupalert" style={{display: 'none'}} className="alert alert-danger">
                                                            <p>Error:</p>
                                                            <span />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="email" className="col-md-3 control-label">Email</label>
                                                            <div className="col-md-9">
                                                                <input type="text" className="form-control" name="email" placeholder="Email Address" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="firstname" className="col-md-3 control-label">Name</label>
                                                            <div className="col-md-9">
                                                                <input type="text" className="form-control" name="name" placeholder="Name" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="lastname" className="col-md-3 control-label">userName</label>
                                                            <div className="col-md-9">
                                                                <input type="text" className="form-control" name="username" placeholder="User Name" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="password" className="col-md-3 control-label">Password</label>
                                                            <div className="col-md-9">
                                                                <input type="password" className="form-control" name="password" placeholder="Password" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="password" className="col-md-3 control-label">Reenter Password</label>
                                                            <div className="col-md-9">
                                                                <input type="password" className="form-control" name="password1" placeholder="Password" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="telNo" className="col-md-3 control-label">Telephone No</label>
                                                            <div className="col-md-9">
                                                                <input type="tel" className="form-control" name="tpNo" placeholder="0000000000" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="lastname" className="col-md-3 control-label">Number</label>
                                                            <div className="col-md-9">
                                                                <input type="text" className="form-control" name="number" placeholder="Place No" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="lastname" className="col-md-3 control-label">Lane Number</label>
                                                            <div className="col-md-9">
                                                                <input type="text" className="form-control" name="lane" placeholder="Lane" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="lastname" className="col-md-3 control-label">Address 1</label>
                                                            <div className="col-md-9">
                                                                <input type="text" className="form-control" name="address1" placeholder="Address 1" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="lastname" className="col-md-3 control-label">Address 2</label>
                                                            <div className="col-md-9">
                                                                <input type="text" className="form-control" name="address2" placeholder="Address 2" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            {/* Button */}
                                                            <div className="col-md-offset-3 col-md-9">
                                                                <button id="btn-signup" type="submit" className="btn btn-info"><i className="icon-hand-right" /> &nbsp; Sign Up</button>
                                                                <span style={{marginLeft: 8}}>or</span>
                                                            </div>
                                                        </div>
                                                        <div style={{borderTop: '1px solid #999', paddingTop: 20}} className="form-group">
                                                            <div className="col-md-offset-3 col-md-9">
                                                                <button id="btn-fbsignup" type="button" className="btn btn-primary"><i className="icon-facebook" /> &nbsp; Sign Up with Facebook</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
export default Register;