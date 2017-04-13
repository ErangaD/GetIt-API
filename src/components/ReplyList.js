import React from 'react';
import Reply from './Reply'
class ReplyList extends React.Component {
    render() {
        let replYList = this.props.data.map(comment=>{
            return(
                <Reply
                    comment={comment}
                    key={comment._id}
                />
            )
        });
        return(
            <div>
                {postsList}
            </div>
        );
    }
}
export default ReplyList;