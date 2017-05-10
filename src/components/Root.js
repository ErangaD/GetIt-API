import React,{Component} from 'react';
import Header from './Header';
class Root extends Component{
    render(){
        let loggedIn='Log In';
        if(localStorage.jwtToken){
            loggedIn='Log Out';
        }
        return(
            <div className="container">
                <Header logged={loggedIn}/>
                {this.props.children}
            </div>
        );
    }
}
export default Root;