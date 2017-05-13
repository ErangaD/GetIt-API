import React from 'react';
import axios from 'axios';
class Report extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.report._id,
            replies:[],
            userType:this.props.userType
        }
        this.onClicked=this.onClicked.bind(this);
    }
    onClicked(e){
        e.preventDefault();
        axios.get('http://localhost:3001/api/user/reply',
            {
                params:{
                    token:localStorage.jwtToken,
                    commentId:this.state.id
                }
            })
            .then((response)=>{
                this.setState({
                    replies:response.data.replies,
                    userType:response.data.userType
                });
            }).catch(
            (errors)=> {
                //have to inform user try again
            }
        );
    }
    render(){
        return(
            <div className="col-md-4">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <section className="post-body">
                            <div className="pricing-box-alt">
                                <div className="pricing-heading">
                                    {/*<h6>{this.props.report.time.split('T')[0]}</h6>
                                    <h3>{this.props.report.sellerName}</h3>*/}
                                </div>
                                <div className="pricing-content">
                                    <h3>Rs:{this.props.report.price}</h3>
                                </div>
                                <div className="pricing-terms">
                                    <p>
                                        <i className="icon-ok" />{this.props.report.remarks}
                                    </p>
                                </div>
                                <div className="pricing-action">
                                    <p>
                                        {this.props.report.assessment}
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}
export default Report;