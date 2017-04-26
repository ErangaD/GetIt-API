import React from 'react';
import MessageList from './ConnectedUsers';
import ChatBody from './ChatBody';
import axios from 'axios';
class ChatArea extends React.Component{
    constructor(props){
        super(props);
        axios.get('http://localhost:3001/api/user/users',
            {
                params:{
                    token:localStorage.jwtToken
                }
            }
            )
            .then((response)=>{
                this.setState({data:response.data})
            }).catch(
            (errors)=> {
                console.log(errors);
                this.context.router.push({
                    pathname:`/login`,
                    query:{err:'You have to log in'}
                });
            }
        );
    }
    render(){
        return(
            <div className="container">
                <div className="row pad-top pad-bottom">
                    <MessageList/>
                    <ChatBody/>
                </div>
            </div>
        )
    }
}
export default ChatArea;