import React from 'react';
import axios from 'axios'
class Comment extends React.Component{
    constructor(props){
        super(props);
        this.state={
            price:'',
            remarks:'',
            negotiable:true,
            id:this.props.id,
            isLoading:false
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
        this.handleOptionChange=this.handleOptionChange.bind(this);
    }
    handleSubmit(e){
        this.setState({isLoading:true});
        e.preventDefault();
        axios.post('http://localhost:3001/api/user/reply',
            {data:this.state,
                token:localStorage.jwtToken
            })
            .then((response)=>{
                //can load comments or redirect to another page
                //have to disable submit button
                this.setState({isLoading:false});
            }).catch(
            (errors)=> {
                //if errors ensure resubmission
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
        this.setState({[e.target.name]:e.target.value});
    }
    render(){
        return(
            <div className="form-group">
                <form onSubmit={ this.handleSubmit }>
                    {this.props.userType &&
                        < div className="form-group">
                            <input type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            name="price"
                            placeholder="Your Price"
                            value={this.state.price}
                            onChange={this.onChange}
                            />
                        </div> &&
                        <div className="form-group">
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