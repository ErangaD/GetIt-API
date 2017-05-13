import React from 'react';
class Reply extends React.Component{
    constructor(props){
        super(props);
        this.loadMessage=this.loadMessage.bind(this);
    }
    loadMessage(){
        //loading the message stream with current user and user from this reply
        if(localStorage.userType){
            if(localStorage.userType==="false"){
                if(this.props.reply.senderUserName!==localStorage.userName){
                    this.context.router.push({
                        pathname:`/message`,
                        query:{userName:this.props.reply.senderUserName}
                    });
                }
            }
        }
    }
    render(){
        let property={
            cursor:'pointer'
        }
        return(
            <div style={property} onClick={this.loadMessage}>
                <div className="container">
                    <h5 className="media-heading right">{this.props.reply.senderUserName}</h5>
                    <h5 className="media-heading">{this.props.reply.price}</h5>
                    <p>{this.props.reply.remarks}</p>
                </div>
            </div>
        )
    }
}
Reply.contextTypes= {
    router:React.PropTypes.object.isRequired
}
export default Reply;