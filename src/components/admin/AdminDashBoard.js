import React from 'react'
import Media from 'react-media'
import {Link} from "react-router";
class AdminDashBoard extends React.Component{
    render(){
        return(
            <div className="container">
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
                                                        <td>Name  :</td>
                                                        <td>Eranga Dilkjd</td>
                                                    </tr>
                                                    <tr>
                                                        <td>UserN  ame:</td>
                                                        <td> </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Email</td>
                                                        <td><a href="">er angadulshan10@gmail.conmkgj</a></td>
                                                    </tr>

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
                {/*/.fluid-container*/}
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-3">
                                <Link to='/admin/reports'>
                                    <div className="img-circle text-center" style={{backgroundColor:'#5bc0de',height:200}}>
                                    </div>
                                    <h4 className="text-center">Reported Incidents</h4>
                                </Link>
                            </div>
                            <div className="col-md-3">
                                <Link to='/admin/reports'>
                                    <div className="img-circle text-center" style={{backgroundColor:'#5bc0de',height:200}}>
                                    </div>
                                    <h4 className="text-center">Buyer Details</h4>
                                </Link>
                            </div>
                            <div className="col-md-3">
                                <Link to='/admin/reports'>
                                    <div className="img-circle text-center" style={{backgroundColor:'#5bc0de',height:200}}>
                                    </div>
                                    <h4 className="text-center">Seller Details</h4>
                                </Link>
                            </div>
                            <div className="col-md-3">
                                <Link to='/admin/reports'>
                                    <div className="img-circle text-center" style={{backgroundColor:'#5bc0de',height:200}}>
                                    </div>
                                    <h4 className="text-center">Statistics</h4>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default AdminDashBoard;