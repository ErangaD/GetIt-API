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
            selectedUserId:this.props.location.query.id
        }
        //console.log(this.state.selectedUserId);
        //we have the sender id of the previous message
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
                );
    }
    getMessages(userName){
        this.setState({selectedUserId:userName});
    }
    render(){
        //console.log(this.state.selectedUserId);
        return(
            <div className="container">
                <div className="row pad-top pad-bottom">
                    <MessageList connectedUsers={this.state.connectedUsers} userType={this.state.userType} getMessages={this.getMessages}/>
                    <ChatBody selectedUserId={this.state.selectedUserId}/>
                </div>
            </div>
        )
    }
}

export default ChatPage;
ChatPage.contextTypes= {
    router:React.PropTypes.object.isRequired
}