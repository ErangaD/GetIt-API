import React from 'react';
class Reply extends React.Component{
    render(){
        let time=this.props.message.time;
        let showTime=time.split('T')[0]+"  @  "+time.split('T')[1].split('.')[0];
        return(
            <div className="chat-box-left">
                <div>
                    {showTime}
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