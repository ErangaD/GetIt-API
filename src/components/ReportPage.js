import React from 'react';
import ReportList from './ReportList';
import axios from 'axios';
import classNames from 'classnames'
class ReportPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            sellerName:'',
            remarks:'',
            previousReports:[],
            errors:{}
        }
        //sending the request to the server to check authentication
        axios.get('http://localhost:3001/api/user/reports',
            {
                params:{
                    token:localStorage.jwtToken
                }
            }
            )
            .then((response)=>{
                this.setState({previousReports:response.data});
            }).catch(
            (errors)=> {
                localStorage.removeItem('jwtToken');
                this.context.router.push({
                    pathname:`/login`,
                    query:{err:'You have to log in'}
                });
            }
        );
        this.onSubmit=this.onSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
    }
    onSubmit(e){
        this.setState({errors:{}});
        e.preventDefault();
        var data = {
            sellerName:this.state.sellerName,
            remarks:this.state.remarks
        }
        axios.post('http://localhost:3001/api/user/reports',
            {data:data,
                token:localStorage.jwtToken})
            .then((response)=>{
                this.setState({previousReports:this.state.previousReports.concat([response.data]),
                    sellerName:'',
                    remarks:''});
            }).catch(
            (errors)=> {
                this.setState(
                    {
                        errors:errors.response.data, isLoading:false
                    })
            }
        );
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    render(){
        let buyerForm;
        if (localStorage.userType) {
            if (localStorage.userType === "false") {
                buyerForm=<div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-info">
                                <div className="panel-heading">Add Post</div>
                                <div className="panel-body">
                                    <form role="form" onSubmit={this.onSubmit}>
                                        <div className={classNames("form-group", {'has-error':this.state.errors.error})}>
                                            <label className="control-label" htmlFor="exampleInputPassword1">Seller's User Name</label>
                                            <input type="text"
                                                   className="form-control"
                                                   id="exampleInputPassword1"
                                                   name="sellerName"
                                                   placeholder="sellerName"
                                                   value={this.state.sellerName}
                                                   onChange={this.onChange}
                                            />
                                            {this.state.errors.error && <span className="help-block">{this.state.errors.error}</span>}
                                        </div>
                                        <div className={classNames("form-group", {'has-error':this.state.errors.error})}>
                                            <label className="control-label" htmlFor="exampleInputEmail1">Details</label>
                                            <textarea type="text"
                                                      className="form-control"
                                                      id="exampleInputEmail1"
                                                      placeholder="Remarks"
                                                      name="remarks"
                                                      value={this.state.remarks}
                                                      onChange={this.onChange}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-default">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        }
        let empty;
        if(!(this.state.previousReports.length>0)){
            empty=<h2>There is no Complaints</h2>
        }
        return(
            <section id="content">
                {buyerForm}
                {empty}
                <div className="container ">
                    <ReportList data={this.state.previousReports} userType={this.state.userType}/>
                </div>
            </section>
        )
    }
}
ReportPage.contextTypes= {
    router:React.PropTypes.object.isRequired
}
export default ReportPage;