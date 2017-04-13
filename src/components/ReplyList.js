import React from 'react';
import Reply from './Reply'
class ReplyList extends React.Component {
    render() {
        let replyList = this.props.reply.map(reply=>{
            return(
                <Reply
                    reply={reply}
                    key={reply._id}
                />
            )
        });
        return(
            <div>
                {replyList}
            </div>
        );
    }
}
export default ReplyList;