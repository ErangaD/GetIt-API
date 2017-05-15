import React from 'react'
import axios from 'axios';
import classNames from 'classnames';
var validator = require('validator');
var isEmpty = require('lodash.isempty');

class SellerSignUpForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            name:'',
            telNo:'',
            userName:'',
            saleType:'Vehicle',
            password:'',
            password2:'',
            errors:{},
            isLoading:false,
            number:'',
            laneNumber:'',
            address1:'',
            address2:'',

        }
        this.handleSignUp=this.handleSignUp.bind(this);
        this.onChange=this.onChange.bind(this);
        this.handleOptionChange=this.handleOptionChange.bind(this);
    }
    handleOptionChange(e){
        this.setState({
            saleType:e.target.value
        });
    }
    isValid(){
        const {errors, isValid} =this.validateInput(this.state);
        if(!isValid){
            this.setState({errors});
        }
        return isValid;
    }
    handleSignUp(e){
        e.preventDefault();
        this.setState({errors:{},isLoading:true});
        axios.post('http://localhost:3001/api/sellerRegistration',
            {user:this.state})
            .then((response)=>{
                const token = response.data.token;
                localStorage.setItem('jwtToken',token);
                this.context.router.push('/profile');
        }).catch((errors)=>{
            const {status} = errors.response;
            if(status===500){
                this.setState(
                    {
                        errors:{email:"This email has been used previously"} , isLoading:false
                    })
            }else if(status===400){
                this.setState(
                    {
                        errors:errors.response.data , isLoading:false
                    })
            }
        });
    }
    validateInput(data){
        var errors = {};
        if(validator.isEmpty(data.email)){
            errors.email = "Email is required";
        }
        if(validator.isEmpty(data.name)){
            errors.name = "Name is required";
        }
        if(validator.isEmpty(data.password)){
            errors.password = "Password is required";
        }
        if(!validator.isEmail(data.email)){
            errors.email="Email is invalid";
        }
        if(validator.isEmpty(data.password2)){
            errors.password2 = "Email is required";
        }
        if(validator.isEmpty(data.userName)){
            errors.userName="User name is required";
        }
        if(!validator.isEmpty(data.telNo)){
            errors.telNo="Telephone number is required";
        }
        if(!validator.equals(data.password,data.password2)){
            errors.password2="Password must match";
        }
        return({
            errors,
            isValid:isEmpty(errors)
        })
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    render(){
        const {errors} = this.state;
        return(
            <form id="signupform" className="form-horizontal" role="form" onSubmit={this.handleSignUp}>
                <div id="signupalert" style={{display: 'none'}} className="alert alert-danger">
                    <p>Error:</p>
                    <span />
                </div>
                <div className={classNames("form-group",{'has-errors':errors.email})}>
                    <label htmlFor="email" className="col-md-3 control-label">Email</label>
                    <div className="col-md-9">
                        <input type="text"
                               className="form-control"
                               name="email"
                               placeholder="Email Address"
                               value={this.state.email}
                               onChange={this.onChange}
                        />
                        {errors.email && <span className="help-block">{errors.email}</span>}
                    </div>
                </div>
                <div className={classNames("form-group", {'has-error':errors.name})}>
                    <label htmlFor="firstname" className="col-md-3 control-label">Name</label>
                    <div className="col-md-9">
                        <input type="text"
                               className="form-control"
                               name="name"
                               placeholder="Name"
                               value={this.state.name}
                               onChange={this.onChange}
                        />
                        {errors.name && <span className="help-block">{errors.name}</span>}
                    </div>
                </div>
                <div className={classNames("form-group", {'has-error':errors.userName})}>
                    <label htmlFor="userName" className="col-md-3 control-label">userName</label>
                    <div className="col-md-9">
                        <input type="text"
                               className="form-control"
                               name="userName"
                               placeholder="User Name"
                               value={this.state.userName}
                               onChange={this.onChange}
                        />
                        {errors.userName && <span className="help-block">{errors.userName}</span>}
                    </div>
                </div>
                <div className={classNames("form-group", {'has-error':errors.password})}>
                    <label htmlFor="password" className="col-md-3 control-label">Password</label>
                    <div className="col-md-9">
                        <input type="password"
                               className="form-control"
                               name="password"
                               placeholder="Password"
                               value={this.state.password}
                               onChange={this.onChange}
                        />
                        {errors.password && <span className="help-block">{errors.password}</span>}
                    </div>
                </div>
                <div className={classNames("form-group", {'has-error':errors.password2})}>
                    <label htmlFor="password2" className="col-md-3 control-label">Reenter Password</label>
                    <div className="col-md-9">
                        <input type="password"
                               className="form-control"
                               name="password2"
                               placeholder="Password"
                               value={this.state.password2}
                               onChange={this.onChange}
                        />
                        {errors.password2 && <span className="help-block">{errors.password2}</span>}
                    </div>
                </div>
                <div className={classNames("form-group", {'has-error':errors.number})}>
                    <label htmlFor="forRad" className="col-md-3 control-label">Sale Type</label>
                    <div className="forRad col-md-9">
                        <div className="radio col-md-9">
                            <label className="control-label">
                                <input type="radio"
                                       name="radio"
                                       value='Electronic'
                                       checked={this.state.saleType==='Electronic'}
                                       onChange={this.handleOptionChange}
                                />
                                Electronic
                            </label>
                        </div>
                        <div className="radio col-md-9">
                            <label className="control-label">
                                <input type="radio"
                                       name="radio"
                                       value='Vehicle'
                                       checked={this.state.saleType==='Vehicle'}
                                       onChange={this.handleOptionChange}
                                />
                                Vehicle
                            </label>
                        </div>
                        <div className="radio col-md-9">
                            <label>
                                <input type="radio"
                                       name="radio"
                                       value="Property"
                                       checked={this.state.saleType==='Property'}
                                       onChange={this.handleOptionChange}
                                />
                                Property
                            </label>
                        </div>
                    </div>
                </div>
                <div className={classNames("form-group", {'has-error':errors.telNo})}>
                    <label htmlFor="telNo" className="col-md-3 control-label">Telephone No</label>
                    <div className="col-md-9">
                        <input type="tel"
                               className="form-control"
                               name="telNo"
                               placeholder="0000000000"
                               value={this.state.telNo}
                               onChange={this.onChange}
                        />
                        {errors.telNo && <span className="help-block">{errors.telNo}</span>}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="lastname" className="col-md-3 control-label">Number</label>
                    <div className="col-md-9">
                        <input type="text"
                               className="form-control"
                               name="number"
                               placeholder="Place No"
                               value={this.state.number}
                               onChange={this.onChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="lastname" className="col-md-3 control-label">Lane Number</label>
                    <div className="col-md-9">
                        <input type="text"
                               className="form-control"
                               name="laneNumber"
                               placeholder="Lane"
                               value={this.state.laneNumber}
                               onChange={this.onChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="lastname" className="col-md-3 control-label">Address 1</label>
                    <div className="col-md-9">
                        <input type="text"
                               className="form-control"
                               name="address1"
                               placeholder="Address 1"
                               value={this.state.address1}
                               onChange={this.onChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="lastname" className="col-md-3 control-label">Address 2</label>
                    <div className="col-md-9">
                        <input type="text"
                               className="form-control"
                               name="address2"
                               placeholder="Address 2"
                               value={this.state.address2}
                               onChange={this.onChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    {/* Button */}
                    <div className="col-md-offset-3 col-md-9">
                        <button id="btn-signup" type="submit" className="btn btn-info"><i className="icon-hand-right" /> &nbsp; Sign Up</button>
                    </div>
                </div>
            </form>
        )
    }
}
SellerSignUpForm.contextTypes= {
    router:React.PropTypes.object.isRequired
}
export default SellerSignUpForm;