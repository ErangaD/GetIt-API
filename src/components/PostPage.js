import React from 'react';
import PostsList from './PostsList';
import axios from 'axios';
import classNames from 'classnames';
var config = require("../../config.json");
class PostPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            price:'',
            remarks:'',
            saleType:'Vehicle',
            data:[],
            userType:false,
            errors:{},
            selected:'0'
        }
        axios.get(config.server+'/api/user/posts',
            {
                params:{
                    token:localStorage.jwtToken
                }
            }
            )
            .then((response)=>{
                this.setState({data:response.data.comments,userType:response.data.userType})
            }).catch(
            (errors)=> {
                console.log(errors);
                this.context.router.push({
                    pathname:`/login`,
                    query:{err:'You have to log in'}
                });
            }
        );
        this.onSubmit=this.onSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
        this.handleOptionChange=this.handleOptionChange.bind(this);
        this.handleSort=this.handleSort.bind(this);
    }
    onSubmit(e){
        e.preventDefault();
        var data = {
            price:this.state.price,
            remarks:this.state.remarks,
            saleType:this.state.saleType
        }
        this.setState({errors:{}});
        axios.post(config.server+'/api/user/posts',
            {data:data,
            token:localStorage.jwtToken})
            .then((response)=>{
                let comments = this.state.data;
                let newComments = comments.concat([response.data]);
                this.setState({data:newComments,price:'',saleType:'Vehicle',remarks:''});
            }).catch(
            (errors)=> {
                const {status} = errors.response;
                if(status===500){
                    this.setState(
                        {
                            errors:{error:"Database error ocurred"} , isLoading:false
                        })
                }else if(status===400){
                    this.setState(
                        {
                            errors:errors.response.data , isLoading:false
                        })
                }
                console.log(this.state.errors);
            }
        );
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    handleOptionChange(e){
        this.setState({
            saleType:e.target.value
        });
    }
    handleSort(e){
        e.preventDefault();
        //calling the filter post route
        axios.post(config.server+'/api/user/filterPosts',
            {
                token:localStorage.jwtToken,
                selected:e.target.value
            })
            .then((res)=>{
                this.setState({data:res.data});
            })
            .catch((err)=>{
                //show a message of error
                console.log(err);
            });
        this.setState({selected:e.target.value});
    }
    
    render(){
        let buyerPart,sortOptions;
        if(this.state.userType){
            buyerPart=null;
            sortOptions=<div className="row">
                    <div className="col-md-5">
                        <h3>Sort by :</h3>
                        <select className="selectpicker show-menu-arrow" value={this.state.selected}
                                onChange={this.handleSort}>
                            <option value='0'>Date</option>
                            <option value='1'>Price</option>
                        </select>
                    </div>
                </div>
        }else{
            sortOptions=<div className="row">
                    <div className="col-md-5">
                        <h3>Sort by :</h3>
                        <select className="selectpicker show-menu-arrow" value={this.state.selected}
                                onChange={this.handleSort}>
                            <option value='0'>Date</option>
                            <option value='1'>Vehicles</option>
                            <option value='2'>Electronics</option>
                            <option value='3'>Property</option>
                        </select>
                    </div>
                </div>
            buyerPart=<div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="panel panel-info">
                            <div className="panel-heading">Add Post</div>
                            <div className="panel-body">
                                <form role="form" onSubmit={this.onSubmit}>
                                    <div className={classNames("form-group", {'has-error':this.state.errors.price})}>
                                        <label className="control-label" htmlFor="exampleInputPassword1">Expecting Price</label>
                                        <input type="text"
                                               className="form-control"
                                               id="exampleInputPassword1"
                                               name="price"
                                               placeholder="price"
                                               value={this.state.price}
                                               onChange={this.onChange}
                                        />
                                        {this.state.errors.price && <span className="help-block">{this.state.errors.price}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Sale Type</label>
                                        <div className="radio">
                                            <label>
                                                <input type="radio"
                                                       name="radio"
                                                       value='Electronic'
                                                       checked={this.state.saleType==='Electronic'}
                                                       onChange={this.handleOptionChange}
                                                />
                                                Electronic
                                            </label>
                                        </div>
                                        <div className="radio">
                                            <label>
                                                <input type="radio"
                                                       name="radio"
                                                       value='Vehicle'
                                                       checked={this.state.saleType==='Vehicle'}
                                                       onChange={this.handleOptionChange}
                                                />
                                                Vehicle
                                            </label>
                                        </div>
                                        <div className="radio">
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
                                    <div className={classNames("form-group", {'has-error':this.state.errors.remarks})}>
                                        <label className="control-label" htmlFor="exampleInputEmail1">Remarks</label>
                                            <textarea type="text"
                                                      className="form-control"
                                                      id="exampleInputEmail1"
                                                      placeholder="Remarks"
                                                      name="remarks"
                                                      value={this.state.remarks}
                                                      onChange={this.onChange}
                                            />
                                        {this.state.errors.remarks && <span className="help-block">{this.state.errors.remarks}</span>}
                                    </div>
                                    <button type="submit" className="btn btn-default">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        }
        return(
            <section id="content">
                {buyerPart}
                {sortOptions}
                <div className="container ">
                    <PostsList data={this.state.data} userType={this.state.userType}/>
                </div>
            </section>
        )
    }
}
PostPage.contextTypes= {
    router:React.PropTypes.object.isRequired
}
export default PostPage;