import React, { Component } from 'react';
import {Link} from 'react-router'
class Header extends Component{
    constructor(){
        super();
        this.loggedIn=this.loggedIn.bind(this);
    }
    loggedIn(){
        if(localStorage.jwtToken){
            localStorage.removeItem('jwtToken');
        }
        this.context.router.push('/login');
    }
    render(){
        return(
            <header>
                <div className="navbar navbar-default navbar-static-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                            </button>
                            <a className="navbar-brand" href="index.html"><span>G</span>etIt.lk</a>
                        </div>
                        <div className="navbar-collapse collapse ">
                            <ul className="nav navbar-nav">
                                <li><Link to="/profile">{this.props.home}</Link></li>
                                <li><a href="portfolio.html">About</a></li>
                                <li><a href="blog.html">Contact Us</a></li>
                                <li><a href="#" onClick={this.loggedIn}>{this.props.logged}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
Header.contextTypes= {
    router:React.PropTypes.object.isRequired
}
export default Header;