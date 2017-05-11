import React from 'react';
import ReportList from './ReportList';
import axios from 'axios';
class Reports extends React.Component{
    constructor(props){
        super(props);
        this.state={
            reports:[],
            search:'',
            selected:'0'
        }
        axios.post('http://localhost:3001/api/admin/report',
            {
                token:localStorage.jwtToken
            }
            )
            .then((response)=>{
                this.setState({reports:response.data})
            }).catch(
            (errors)=> {
                console.log(errors);
                //try again message
            }
        );
        this.onSubmit=this.onSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
        this.handleOptionChange=this.handleOptionChange.bind(this);
    }
    onSubmit(e){
        e.preventDefault();
    }
    addReply(data){
        axios.post('http://localhost:3001/api/admin/addReply',
            {
                token:localStorage.jwtToken,
                data:data
            })
            .then((res)=>{
                //this.setState({reports:this.state.reports.concat([data])
                })
                    .catch((err)=>{
                        //show a message of error
                        console.log(err);
                    });
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    handleOptionChange(e){
        axios.post('http://localhost:3001/api/admin/filterReports',
            {
                token:localStorage.jwtToken,
                selected:e.target.value
            })
            .then((res)=>{
                this.setState({reports:res.data});
            })
            .catch((err)=>{
                //show a message of error
                console.log(err);
            });
        this.setState({selected:e.target.value});
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        Sort by : 
                        <select className="selectpicker show-menu-arrow" value={this.state.selected}
                                onChange={this.handleOptionChange}>
                            <option value='0'>Date</option>
                            <option value='1'>Not Assessed</option>
                            <option value='2'>Assessed</option>
                            <option value='3'>All</option>
                        </select>
                    </div>
                    <div className="col-md-6 align-self-end">
                        <form action className="search-form">
                            <div className="form-group has-feedback">
                                <label htmlFor="search" className="sr-only">Search</label>
                                <input type="text"
                                       className="form-control"
                                       name="search"
                                       id="search"
                                       placeholder="search"
                                       value={this.state.search}
                                />
                                <span className="glyphicon glyphicon-search form-control-feedback" />
                            </div>
                        </form>
                    </div>
                </div>
                <ReportList data={this.state.reports} fn={this.addReply}/>
            </div>
        )
    }
}
Reports.contextTypes= {
    router:React.PropTypes.object.isRequired
}
export default Reports;