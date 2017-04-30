import React from 'react';
import MessageList from './ConnectedUsers';
import ChatBody from './ChatBody';
import axios from 'axios';
class ChatArea extends React.Component{
    constructor(props){
        super(props);
        this.state={
            connectedUsers:[],
            userType:false,
            selectedUser:''
        }
        this.getMessages=this.getMessages.bind(this);
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
                        localStorage.removeItem('jwtToken');
                        this.context.router.push({
                            pathname:`/login`,
                            query:{err:'You have to log in'}
                        });
                    }
                )
        };
    getMessages(userName){
        this.setState({selectedUser:userName});
    }
    render(){
        return(
            <div className="container">
                <div className="row pad-top pad-bottom">
                    <MessageList connectedUsers={this.state.connectedUsers} userType={this.state.userType} getMessages={this.getMessages}/>
                    <ChatBody messages={this.state.selectedUser}/>
                </div>
            </div>
        )
    }
}

export default ChatArea;
ChatArea.contextTypes= {
    router:React.PropTypes.object.isRequired
}