import React from "react";

class ProfileData extends React.Component {
    render(props){
        return(
                <section id="featured">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad">
                                <div className="panel panel-info">
                                    <div className="panel-heading">
                                        <h3 className="panel-title text-center">Profile</h3>
                                    </div>
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-md-3 col-lg-9 img-responsive center-block">
                                                <img alt="User Pic" src="http://babyinfoforyou.com/wp-content/uploads/2014/10/avatar-300x300.png" className="img-circle img-responsive" />
                                            </div>
                                            <div className=" col-md-9 col-lg-9 ">
                                                <table className="table table-user-information">
                                                    <tbody>
                                                    <tr>
                                                        <td>Name:</td>
                                                        <td>{this.props.user.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>UserName:</td>
                                                        <td>{this.props.user.userName}</td>
                                                    </tr>
                                                    {this.props.user.address &&
                                                        <tr>
                                                            <td>Address:</td>
                                                            <td></td>
                                                        </tr>
                                                    }
                                                    <tr>
                                                    </tr>
                                                    <tr>
                                                        <td>Email</td>
                                                        <td><a href={this.props.user.email}>{this.props.user.email}</a></td>
                                                    </tr>
                                                    <tr><td>Phone Number</td>
                                                        <td>{this.props.user.tpNumber}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        )
    }
}

export default ProfileData;