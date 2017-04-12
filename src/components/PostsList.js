import React from 'react';
import Post from './Post'
class PostsList extends React.Component {
    render() {
        let postsList = this.props.data.map(comment=>{
            console.log(comment);
            return(
                <Post
                    comment={comment}
                    key={comment._id}
                />
            )
        });
        return(<div>
            {postsList}
        </div>)
    }
}
export default PostsList;