import React from "react";
import Media from 'react-media'
class ProfileData extends React.Component {
    render(){
        let telNo;
        let address;
        if(this.props.user.telNo) {
            telNo = <tr>
                <td>Phone Number</td>
                <td>{this.props.user.telNo}
                </td>
            </tr>
        }
        else{
            telNo=null;
        }
        //setting the address for the view
        if(this.props.user.address){
            address=<tr>
                <td>Address:</td>
                <td>{this.props.user.address.number}<br/>
                    {this.props.user.address.streetAddress}<br/>
                    {this.props.user.address.ruralAddress}<br/>
                    {this.props.user.address.cityName}
                </td>
            </tr>
        }else{
            address=null;
        }
        return(
            <div className="row">
                {/*/span*/}
                <div className="col-md-12">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h3 className="panel-title text-center">Profile</h3>
                        </div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="text-center">
                                    <img alt="User Pic" src="http://babyinfoforyou.com/wp-content/uploads/2014/10/avatar-300x300.png" style={{width: 200, height: 228}} className="img-circle" />
                                </div>
                                <div className="col-md-12 hidden-xs-down">
                                    <Media query="(max-width: 500px)">
                                        {matches => matches ? (
                                            <p></p>
                                        ) : (
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
                                                {address}
                                                <tr>
                                                    <td>Email</td>
                                                    <td><a href={this.props.user.email}>{this.props.user.email}</a></td>
                                                </tr>
                                                {telNo}
                                                </tbody>
                                            </table>
                                        )}
                                    </Media>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*/span*/}
            </div>
        )
    }
}

export default ProfileData;