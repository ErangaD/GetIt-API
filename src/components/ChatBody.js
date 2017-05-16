import React from 'react';
import Message from './ChatMessage'
class ChatBody extends React.Component{
    constructor(props){
        super(props);
        //console.log(this.props.selectedUserId);
        var user = {
            token:localStorage.jwtToken,
            userName:this.props.selectedUserName
            //contains the id of the other party when the buyer click a comment otherwise null
        }
        //console.log(this.props.selectedUserId);
        this.state={
            socket:this.props.socket,
            messages:[],
            text:'',
            sendingData:user,
            userNameOfOtherParty:this.props.selectedUserName
        }
        //console.log(this.state.sendingData);
        this.state.socket.emit('getMessage',user);
        this.onSubmit=this.onSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
        this.getData=this.getData.bind(this);
        this.setMessages=this.setMessages.bind(this);
        this.state.socket.on('ongoing',this.getData);
        this.state.socket.on('messages',this.setMessages);
    }
    setMessages(data){
        //we get an array of array of messages
        let objDiv;
        objDiv= document.getElementById("panel");
        //console.log(data);
        if(data.messages){
            this.setState({messages:data.messages.messages,userNameOfOtherParty:data.userNameOfOther});
        }
        this.setState({userNameOfOtherParty:data.userNameOfOther});
        objDiv.scrollTop = objDiv.scrollHeight;
    }
    getData(data){
        let objDiv;
        //scrolling effect to the panel
        objDiv= document.getElementById("panel");
        let chat=this.state.messages;
        let newChat = chat.concat([data]);
        this.setState({messages:newChat});
        //scroll.scrollToBottom();
        objDiv.scrollTop = objDiv.scrollHeight;
    }
    onSubmit(e){
        e.preventDefault();
        if(this.state.userNameOfOtherParty){
            //only if the user has selected a user
            const {token} = this.state.sendingData;
            var newData={
                token,
                userName:this.state.userNameOfOtherParty,
                text:this.state.text
            }
            //console.log(newData);
            this.state.socket.emit('send',newData);
        }
        this.setState({text:''})
    }
    onChange(e){
        this.setState({text:e.target.value})
    }
    render(){
        return(
            <div className=" col-lg-6 col-md-6 col-sm-6">
                <div className="chat-box-div">
                    <div className="chat-box-head">
                        Chat History
                        {/*<div className="btn-group pull-right">
                            <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                <span className="fa fa-cogs" />
                                <span className="sr-only">Toggle Dropdown</span>
                            </button>
                            <ul className="dropdown-menu" role="menu">
                                <li><a href="#"><span className="fa fa-map-marker" />&nbsp;Invisible</a></li>
                                <li><a href="#"><span className="fa fa-comments-o" />&nbsp;Online</a></li>
                                <li><a href="#"><span className="fa fa-lock" />&nbsp;Busy</a></li>
                                <li className="divider" />
                                <li><a href="#"><span className="fa fa-circle-o-notch" />&nbsp;Logout</a></li>
                            </ul>
                        </div>*/}
                    </div>
                    <div id="panel" className="panel-body chat-box-main" style={{maxHeight: 400, overflowY: 'scroll'}}>
                        <Message chat={this.state.messages}/>
                    </div>
                    <div className="chat-box-footer">
                        <form className="input-group" onSubmit={this.onSubmit}>
                            <input type="text" className="form-control" placeholder="Enter Text Here..." value={this.state.text} onChange={this.onChange}/>
                            <span className="input-group-btn">
                              <button className="btn btn-info" type="submit">SEND</button>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default ChatBody;