import React from "react";
import ProfileData from './ProfileData';
import axios from 'axios';
class Profile extends React.Component {
    constructor(props){
        super(props);

        axios.get('http://localhost:3001/api/user/profile',
            {
                params:{
                    token:localStorage.jwtToken
                }
            }
            )
            .then((response)=>{
                console.log(response.data);
            }).catch(
            (errors)=> {
                localStorage.removeItem('jwtToken');
            }
        );
    }
    render(){
        return(
            <div className="container">
                <div className="container">
                    <ProfileData/>
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
                                                <a href="/posts">
                                                    <div className="icon">
                                                        <i className="glyphicon glyphicon-align-justify" />
                                                    </div>
                                                </a>
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
                                                <a href="/user/editProfile">
                                                    <div className="icon">
                                                        <i className="glyphicon glyphicon-list-alt" />
                                                    </div>
                                                </a>
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
                                                <a href="/user/chat">
                                                    <div className="icon">
                                                        <i className="glyphicon glyphicon-user" />
                                                    </div>
                                                </a>
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
                        {/* end divider */}
                        {/* Portfolio Projects */}
                    </div>
                </section>
            </div>
        )
    }
}

export default Profile;