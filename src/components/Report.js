import React from 'react';
class Report extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.report._id,
            replies:[],
            userType:this.props.userType
        }
    }
    render(){
        let time = this.props.report.date;
        //taking the date and time
        let showTime=time.split('T')[0]+"  @  "+time.split('T')[1].split('.')[0];
        return(
            <div className="col-md-4">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <section className="post-body">
                            <div className="pricing-box-alt">
                                <div className="pricing-heading">
                                    <h5>{showTime}</h5>
                                </div>
                                <div className="pricing-content">
                                    <h3>
                                        <span className="text-primary">Seller:</span>{this.props.report.sellerUserName}
                                    </h3>
                                </div>
                                <div className="pricing-terms">
                                    <p>
                                        <i className="icon-ok" />{this.props.report.remarks}
                                    </p>
                                </div>
                                <div className="pricing-action">
                                    <p>
                                        {this.props.report.reply}
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