import React from 'react';
import Message from './ChatMessage'
class ChatBody extends React.Component{
    constructor(props){
        super(props);
        var user = {
            token:localStorage.jwtToken,
            userName:this.props.selectedUser
        }
        this.state={
            socket:window.io.connect('http://localhost:3001'),
            messages:[],
            text:'',
            sendingData:user
        }

        this.state.socket.emit('getMessage',user,function (data) {
            console.log('fdkjfkdjkjf');
            this.setState({messages:data});
        });
        this.state.socket.on('messages',function(data){
            this.setState({messages:this.state.messages.push(data)});
        });
        this.onSubmit=this.onSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
    }
    onSubmit(e){
        e.preventDefault();
        const {token,userName} = this.state.sendingData;
        var newData={
            token,
            userName,
            text:this.state.text
        }
        this.state.socket.emit('send',newData);
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
                        <div className="btn-group pull-right">
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
                        </div>
                    </div>
                    <div className="panel-body chat-box-main">
                        <Message chat={this.state.messages}/>
                    </div>
                    <div className="chat-box-footer">
                        <form className="input-group" onSubmit={this.onSubmit}>
                            <input type="text" className="form-control" placeholder="Enter Text Here..." value={this.state.text} onChange={this.onChange}/>
                            <span className="input-group-btn">
                              <button className="btn btn-info" type="button">SEND</button>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default ChatBody;