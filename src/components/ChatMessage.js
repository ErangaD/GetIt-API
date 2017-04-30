import React from 'react';
class Message extends React.Component{
    render(){
        let chat = this.props.chat.map(message=>{
            return (
                <div className="chat-box-left">
                    <div>
                        {message.time}
                    </div>
                    <div>
                        {message.text}
                    </div>
                    <hr className="hr-clas"/>
                </div>
            )
        });
        return(
            <div>
                {chat}
            </div>

        )

    }
}
export default Message;