import React,{Component} from 'react';
import Header from './Header';
class Root extends Component{
    render(){
        return(
            <div className="container">
                <Header/>
                {this.props.children}
            </div>
        );
    }
}
export default Root;