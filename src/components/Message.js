import React from 'react';
class Reply extends React.Component{
    render(){
        return(
            <div className="chat-box-left">
                <div>
                    {this.props.message.time}
                </div>
                <div>
                    {this.props.message.text}
                </div>
                <hr className="hr-clas"/>
            </div>
        )
    }
}
export default Reply;