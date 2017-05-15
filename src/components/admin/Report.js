import React from 'react';
class Report extends React.Component{
    constructor(props){
        super(props);
        this.state={
            reply:this.props.report.reply
        }
        this.onSubmit=this.onSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
    }
    onSubmit(e){
        e.preventDefault();
        //calling the function of the parent component
        this.props.fn({id:this.props.report._id,reply:this.state.reply});
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    render(){
        return(
            <div className="col-md-6">
                <div className="card" style={{width:'30rem',borderColor:'#ff0000'}}>
                    <div className="card-block">
                        <h4 className="card-title">From: {this.props.report.buyerUserName}</h4>
                        <h3 className="card-title">{this.props.report.sellerUserName}</h3>
                        <p className="card-text">{this.props.report.remarks}</p>
                        <form onSubmit={ this.onSubmit }>
                            <div className="form-group">
                            <textarea type="text"
                                      className="form-control"
                                      id="reply"
                                      placeholder="Reply"
                                      name="reply"
                                      value={this.state.reply}
                                      onChange={this.onChange}
                            />
                            </div>
                            <button disabled={this.state.isLoading} type="submit" className="btn btn-default">Submit</button>
                        </form>
                        <div className="card-link">{this.props.report.date}</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Report;