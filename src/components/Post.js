import React from 'react';
import axios from 'axios';
import ReplyList from './ReplyList';
import Comment from './Comment'
class Post extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.comment._id,
            replies:[],
            userType:false
        }
        this.onClicked=this.onClicked.bind(this);
    }
    onClicked(){
        axios.get('http://localhost:3001/api/user/reply',
            {
                params:{
                    token:localStorage.jwtToken,
                    commentId:this.state.id
                }
            })
            .then((response)=>{
                this.setState({
                    replies:response.data.replies,
                    userType:response.data.userType
                });
            }).catch(
            (errors)=> {
                //have to inform user try again
            }
        );
    }
    render(){
        console.log(this.props.comment);
        return(
        <div className="container">
            <div className="col-lg-4">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <section className="post-body">
                                <div className="pricing-box-alt">
                                    <div className="pricing-heading">
                                        <h6>{this.props.comment.time.split('T')[0]}</h6>
                                        <h3>{this.props.comment.saleType}</h3>
                                    </div>
                                    <div className="pricing-content">
                                        <h3>{this.props.comment.price}</h3>
                                    </div>
                                    <div className="pricing-terms">
                                        <p>
                                            <i className="icon-ok" />{this.props.comment.remarks}
                                        </p>
                                    </div>
                                    <div className="pricing-action">
                                        <a href="#" onClick={this.onClicked} className="btn btn-medium"><i className="icon-bolt" /> Show Replies </a>
                                    </div>
                                </div>
                        </section>
                        <section className="post-footer">
                            <div className="post-footer-comment-wrapper">
                                <div className="comment">
                                    <ReplyList reply={this.state.replies}/>
                                </div>
                            </div>
                        </section>
                        <section className="post-body">
                            <Comment userType={this.state.userType} id={this.state.id}/>
                        </section>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default Post;