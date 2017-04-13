import React from 'react';
class Post extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.comment._id
        }
        this.onClicked=this.onClicked.bind(this);
    }
    onClicked(){
        console.log(this.state);
    }
    render(){
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
                                <div className="comment-form">
                                </div>
                                <div className="comment">
                                    <div className="media">
                                        <div className="media-left">
                                            <a href="#">
                                                <img className="media-object photo-profile" src="http://0.gravatar.com/avatar/38d618563e55e6082adf4c8f8c13f3e4?s=40&d=mm&r=g" width={32} height={32} alt="..." />
                                            </a>
                                        </div>
                                        <div className="media-body">
                                            <a href="#" className="anchor-username"><h4 className="media-heading">Media heading</h4></a>
                                            <a href="#" className="anchor-time">51 mins</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>

        )
    }
}
export default Post;