import React from 'react';
import axios from 'axios'
import classNames from 'classnames';
class Comment extends React.Component{
    constructor(props){
        super(props);
        this.state={
            price:'',
            remarks:'',
            negotiable:true,
            id:this.props.id,
            isLoading:false,
            errors:{}
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
        this.handleOptionChange=this.handleOptionChange.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        this.setState({isLoading:true,errors:{}});
        axios.post('http://localhost:3001/api/user/reply',
            {data:this.state,
                token:localStorage.jwtToken
            })
            .then((response)=>{
                //can load comments or redirect to another page
                //have to disable submit button
                //console.log(response.data);
                this.setState({isLoading:false,price:'',remarks:'',negotiable:true});
                this.props.fn(response.data);
            }).catch(
            (errors)=> {
                //if errors ensure resubmission
                this.setState({isLoading:false,errors:errors.response.data});
            }
        );
    }
    handleOptionChange(e){
        if(this.state.negotiable){
            this.setState({negotiable:false});
        }else{
            this.setState({negotiable:true});
        }
    }
    onChange(e){
        if(this.state.errors.price){
            this.setState({errors:{}})
        }

        this.setState({[e.target.name]:e.target.value});
    }
    render(){
        let sellerRelatedForm=null;
            if(this.props.userType){
                sellerRelatedForm=<div className="form-group">
                        <input type="text"
                               className="form-control"
                               name="price"
                               placeholder="Your Price"
                               value={(this.state.errors.price)?('Price is a number'):(this.state.price)}
                               onChange={this.onChange}
                        />
                        <div className="checkbox">
                            <label>
                                <input type="checkbox"
                                       name="radio"
                                       checked={this.state.negotiable}
                                       onChange={this.handleOptionChange}
                                />
                                Negotiable
                            </label>
                        </div>
                    </div>
            }
        return(
            <div className={classNames("form-group", {'has-error':this.state.errors.price})}>
                <form onSubmit={ this.handleSubmit }>
                    {sellerRelatedForm}
                    <div className="form-group">
                        <textarea type="text"
                                  className="form-control"
                                  id="exampleInputEmail1"
                                  placeholder={(this.props.userType)?('Remarks'):'Comment'}
                                  name="remarks"
                                  value={this.state.remarks}
                                  onChange={this.onChange}
                        />
                    </div>
                    <button disabled={this.state.isLoading} type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        )
    }
}
export default Comment;