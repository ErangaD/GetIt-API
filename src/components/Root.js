import React,{Component} from 'react';
import Header from './Header';
class Root extends Component{
    render(){
        let loggedIn='Log In';
        let home;
        if(localStorage.jwtToken){
            loggedIn='Log Out';
            home='Home';
        }
        return(
            <div className="container">
                <Header logged={loggedIn} home={home}/>
                {this.props.children}
            </div>
        );
    }
}
export default Root;