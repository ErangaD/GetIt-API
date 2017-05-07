import React from 'react';
import MessageList from './ConnectedUsers';
import ChatBody from './ChatBody';
import axios from 'axios';
class ChatPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            connectedUsers:[],
            userType:false,
            selectedUserName:this.props.location.query.userName,
            socket:window.io.connect('http://localhost:3001'),
        }
        //console.log(this.state.selectedUserId);
        //we have the sender id of the previous message
        //getting previously connected users from the server
        axios.get('http://localhost:3001/api/user/connectedUsers',
                    {
                        params:{
                            token:localStorage.jwtToken
                        }
                    }
                    )
                    .then((response)=>{
                        this.setState(
                            {
                                connectedUsers:response.data.connectedUsers,
                                userType:response.data.userType
                            }
                        )
                    }).catch(
                    (errors)=> {
                        console.log(errors);
                        localStorage.removeItem('jwtToken');
                        this.context.router.push({
                            pathname:`/login`,
                            query:{err:'You have to log in'}
                        });
                    }
                );
    }
    render(){
        //console.log(this.state.selectedUserId);
        return(
            <div className="container">
                <div className="row pad-top pad-bottom">
                    <MessageList connectedUsers={this.state.connectedUsers} userType={this.state.userType} socket={this.state.socket}/>
                    <ChatBody selectedUserName={this.state.selectedUserName} socket={this.state.socket}/>
                </div>
            </div>
        )
    }
}

export default ChatPage;
ChatPage.contextTypes= {
    router:React.PropTypes.object.isRequired
}