import React from 'react';
class Reply extends React.Component{
    constructor(props){
        super(props);
        this.loadMessage=this.loadMessage.bind(this);
    }
    loadMessage(){
        //loading the message stream with current user and user from this reply
        this.context.router.push({
            pathname:`/user/message`,
            query:{senderId:this.props.reply.senderId}
        });
    }
    render(){
        let property={
            cursor:'pointer'
        }
        return(
            <a style={property} onClick={this.loadMessage}><div className="container panel">
                <h4 className="media-heading">{this.props.reply.price}</h4>
                <p>{this.props.reply.remarks}</p>
            </div>
            </a>
        )
    }
}
Reply.contextTypes= {
    router:React.PropTypes.object.isRequired
}
export default Reply;