import React from 'react';
import PostsList from './PostsList';
import axios from 'axios';
class PostPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            price:'',
            remarks:'',
            selectedOption:'vehicle',
            data:[]
        }
        axios.get('http://localhost:3001/api/user/posts',
            {
                params:{
                    token:localStorage.jwtToken
                }
            }
            )
            .then((response)=>{
                this.setState({data:response.data})
            }).catch(
            (errors)=> {

            }
        );
        this.onSubmit=this.onSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
        this.handleOptionChange=this.handleOptionChange.bind(this);
    }
    onSubmit(e){
        e.preventDefault();
        var data = {
            price:this.state.price,
            remarks:this.state.remarks,
            selectedOption:this.state.selectedOption
        }
        axios.post('http://localhost:3001/api/user/posts',
            {data:data,
            token:localStorage.jwtToken})
            .then((response)=>{
                //this.context.router.push('/profile');
            }).catch(
            (errors)=> {
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
            }
        );
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    handleOptionChange(e){
        console.log(e.target.value);
        this.setState({
            selectedOption:e.target.value
        });
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
                                            <label className="control-label" htmlFor="exampleInputPassword1">Expected Price</label>
                                            <input type="text"
                                                   className="form-control"
                                                   id="exampleInputPassword1"
                                                   name="price"
                                                   placeholder="price"
                                                   value={this.state.price}
                                                   onChange={this.onChange}
                                            />
                                            <p className="help-block">Lorem ipsum dolor sit amet</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">Sale Type</label>
                                            <div className="radio">
                                                <label>
                                                    <input type="radio"
                                                           name="radio"
                                                           value='electronic'
                                                           checked={this.state.selectedOption==='electronic'}
                                                           onChange={this.handleOptionChange}
                                                    />
                                                    Electronic
                                                </label>
                                            </div>
                                            <div className="radio">
                                                <label>
                                                    <input type="radio"
                                                           name="radio"
                                                           value='vehicle'
                                                           checked={this.state.selectedOption==='vehicle'}
                                                           onChange={this.handleOptionChange}
                                                    />
                                                    Vehicle
                                                </label>
                                            </div>
                                            <div className="radio">
                                                <label>
                                                    <input type="radio"
                                                           name="radio"
                                                           value="property"
                                                           checked={this.state.selectedOption==='property'}
                                                           onChange={this.handleOptionChange}
                                                    />
                                                    Property
                                                </label>
                                            </div>
                                            <p className="help-block">Lorem ipsum dolor sit amet</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label" htmlFor="exampleInputEmail1">Remarks</label>
                                            <textarea type="text"
                                                      className="form-control"
                                                      id="exampleInputEmail1"
                                                      placeholder="Remarks"
                                                      name="remarks"
                                                      value={this.state.remarks}
                                                      onChange={this.onChange}
                                            />
                                            <p className="help-block">Lorem ipsum dolor sit amet</p>
                                        </div>
                                        <button type="submit" className="btn btn-default">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container ">
                    <div className="row">
                        <PostsList data={this.state.data}/>
                    </div>
                </div>
            </section>
        )
    }
}
export default PostPage;