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
            userType:this.props.userType
        }
        this.onClicked=this.onClicked.bind(this);
        this.updateArray=this.updateArray.bind(this);
    }
    onClicked(e){
        let objDiv; 
        e.preventDefault();
        if(this.state.replies.length>0){
            this.setState({replies:[]});
        }else{
            //receiving comments from the server
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
                    objDiv= document.getElementById("maxHeight");
                    //scroll.scrollToBottom();
                    objDiv.scrollTop = objDiv.scrollHeight;
                }).catch(
                (errors)=> {
                    //error in submitting the form
                }
            );
        }

    }
    updateArray(data){
        //update the view when a new post is added
        let comments = this.state.replies;
        let newComments = comments.concat([data]);
        this.setState({replies:newComments});
    }
    render(){
        return(
            <div className="col-md-4">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <section className="post-body">
                                <div className="pricing-box-alt">
                                    <div className="pricing-heading">
                                        <h6>{this.props.comment.time.split('T')[0]}</h6>
                                        <h3>{this.props.comment.saleType}</h3>
                                    </div>
                                    <div className="pricing-content">
                                        <h3 className="text-danger">Rs:{this.props.comment.price}</h3>
                                    </div>
                                    <div className="bg-info text-white text-center">
                                        <p>
                                            <i className="icon-ok" />{this.props.comment.remarks}
                                        </p>
                                    </div>
                                    <div className="pricing-action">
                                        <a href="#" onClick={this.onClicked} className="btn btn-medium"><i className="icon-bolt" /> Comments </a>
                                    </div>
                                </div>
                        </section>
                        <div id="maxHeight" className="panel" style={{maxHeight: 300, overflowY: 'scroll'}}>
                            <ReplyList reply={this.state.replies} userId={this.state.userId}/>
                        </div>
                        <section className="post-body">
                            <Comment userType={this.state.userType} id={this.state.id} fn={this.updateArray}/>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}
export default Post;