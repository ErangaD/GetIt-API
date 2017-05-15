import React from 'react';
import ReportList from './ReportList';
import axios from 'axios';
class ReportPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            sellerName:'',
            remarks:'',
            previousReports:[]
        }
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
                console.log(errors);
            }
        );
        this.onSubmit=this.onSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
    }
    onSubmit(e){
        e.preventDefault();
        var data = {
            sellerName:this.state.sellerName,
            remarks:this.state.remarks
        }
        axios.post('http://localhost:3001/api/user/reports',
            {data:data,
                token:localStorage.jwtToken})
            .then((response)=>{
                this.setState({previousReports:this.state.previousReports.concat([response.data])});
            }).catch(
            (errors)=> {
                const {status} = errors.response;
                console.log(errors.response.data.error);
                if(status===500){
                    this.setState(
                        {
                            errors:errors.response.data.error, isLoading:false
                        })
                }else if(status===400){
                    this.setState(
                        {
                            errors:errors.response.data.error, isLoading:false
                        })
                }
            }
        );
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    render(){
        return(
            <section id="content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-info">
                                <div className="panel-heading">Add Post</div>
                                <div className="panel-body">
                                    <form role="form" onSubmit={this.onSubmit}>
                                        <div className="form-group">
                                            <label className="control-label" htmlFor="exampleInputPassword1">Seller's User Name</label>
                                            <input type="text"
                                                   className="form-control"
                                                   id="exampleInputPassword1"
                                                   name="sellerName"
                                                   placeholder="sellerName"
                                                   value={this.state.sellerName}
                                                   onChange={this.onChange}
                                            />
                                        </div>
                                        <div className="form-group">
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