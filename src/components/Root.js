import React,{Component} from 'react';
import Header from './Header';
class Root extends Component{
    render(){
        let loggedIn='Log In';
        let home,message,complaints,posts;
        if(localStorage.jwtToken){
            loggedIn='Log Out';
            home='Home';
            message="Message";
            complaints="Complaints";
            posts="Posts";
        }
        return(
            <div className="container">
                <Header logged={loggedIn} home={home} message={message} complaints={complaints} posts={posts}/>
                {this.props.children}
            </div>
        );
    }
}
export default Root;