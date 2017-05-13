import React, { Component } from 'react';
import BuyerSignUpForm from './BuyerSignUpForm';
import SellerSignUpForm from './SellerSignUpForm';
class Register extends Component{
    
    render(){
        return(
            <div className="container">
                <div id="signupbox" style={{marginTop: 50}} className="mainbox col-md-9 col-md-offset-2 col-sm-8 col-sm-offset-2">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="panel-title">Sign Up</div>
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
                                                    <SellerSignUpForm/>
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