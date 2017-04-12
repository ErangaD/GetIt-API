import React,{Component} from 'react';
import Header from './Header';
class Root extends Component{
    render(){
        if(window.location.href.split('/')[3]==="login"){
            console.log('lodin');
        }
        return(
            <div className="container">
                <Header/>
                {this.props.children}
            </div>
        );
    }
}
export default Root;