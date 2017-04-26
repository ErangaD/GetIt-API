import React from 'react';
import MessageList from './MessageList'
class ChatArea extends React.Component{
    render(){
        return(
            <div className="container">
                <div className="row pad-top pad-bottom">
                    <MessageList/>
                    <div className=" col-lg-6 col-md-6 col-sm-6">
                        <div className="chat-box-div">
                            <div className="chat-box-head">
                                GROUP CHAT HISTORY
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
                                <div className="chat-box-left">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </div>
                                <hr className="hr-clas" />
                                <div className="chat-box-right">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </div>
                                <hr className="hr-clas" />
                                <div className="chat-box-left">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </div>
                                <hr className="hr-clas" />
                                <div className="chat-box-right">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </div>
                                <hr className="hr-clas" />
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
                </div>
            </div>
        )
    }
}
export default ChatArea;