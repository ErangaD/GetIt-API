import React from 'react';
import Message from './ChatMessage'
class ChatBody extends React.Component{
    constructor(props){
        super(props);
        this.state={
            socket:window.io.connect('http://localhost:3001'),
            chat:[]
        }
        this.state.socket.emit('getMessage',localStorage.jwtToken);
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
                        <Message chat={this.state.chat}/>
                    </div>
                    <div className="chat-box-footer">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Enter Text Here..." />
                    <span className="input-group-btn">
                      <button className="btn btn-info" type="button">SEND</button>
                    </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ChatBody;