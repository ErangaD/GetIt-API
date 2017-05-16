import React from 'react';
import Post from './Post'
class PostsList extends React.Component {
    render() {
        let postsList = this.props.data.map(comment=>{
            return(
                <Post
                    comment={comment}
                    key={comment._id}
                    userType={this.props.userType}
                />
            )
        });
        //returning the posts list
        return(
            <div>
                {postsList}
            </div>
        );
    }
}
export default PostsList;