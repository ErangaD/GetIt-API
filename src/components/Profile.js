import React from "react";
import ProfileData from './ProfileData';
import axios from 'axios';
import {Link} from "react-router";
class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            name:'',
            telNo:'',
            userName:'',
            saleType:[],
            userType:false
            //address is to set later
        }
        axios.get('http://localhost:3001/api/user/profile',
            {
                params:{
                    token:localStorage.jwtToken
                }
            }
            )
            .then((response)=>{
                const {email,name,userName,userType,saleTypes,telNo} = response.data.user;
                localStorage.setItem('userId',response.data.user.id);
                localStorage.setItem('userType',userType);
                this.setState({email,name,userName,userType,telNo,saleTypes});
                if(userType){
                    this.setState({address:response.data.address});
                }
            }).catch(
            (errors)=> {
                localStorage.removeItem('jwtToken');
                this.context.router.push({
                    pathname:`/login`,
                    query:{err:'You have to log in'}
                });
            }
        );
        this.onPost=this.onPost.bind(this);
    }
    onPost(){
        console.log("ON post");
    }
    render(){
        return(
            <div className="container">
                <div className="container">
                    <ProfileData user={this.state}/>
                </div>
                <section id="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="box">
                                            <div className="box-gray aligncenter">
                                                <h4>Posts</h4>
                                                <Link to="/posts">
                                                    <div className="icon">
                                                        <i className="glyphicon glyphicon-align-justify" />
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="box-bottom">
                                                <spann><br/></spann>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-lg-4">
                                        <div className="box">
                                            <div className="box-gray aligncenter">
                                                <h4>Edit Profile</h4>
                                                <Link to="/posts">
                                                    <div className="icon">
                                                        <i className="glyphicon glyphicon-list-alt" />
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="box-bottom">
                                                <spann><br/></spann>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="box">
                                            <div className="box-gray aligncenter">
                                                <h4>Messages</h4>
                                                <Link to="/posts">
                                                    <div className="icon">
                                                        <i className="glyphicon glyphicon-user" />
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="box-bottom">
                                                <spann><br/></spann>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* divider */}
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="solidline">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
Profile.contextTypes= {
    router:React.PropTypes.object.isRequired
}
export default Profile;