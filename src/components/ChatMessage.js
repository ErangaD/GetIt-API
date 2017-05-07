import React from 'react';
import Message from './Message'
class ChatMessage extends React.Component{
    render(){
        let chat = this.props.chat.map(message=>{
            return(
                <Message
                    message={message}
                    key={message._id}
                />
                )
        });
        return(
            <div>
                {chat}
            </div>

        )

    }
}
export default ChatMessage;