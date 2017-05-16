import React from 'react';
import Modal from 'react-modal';
import axios from 'axios'
class Reply extends React.Component{
    constructor(props){
        super(props);
        this.loadMessage=this.loadMessage.bind(this);
        this.state={
            activeModal:false,
            Name:'',
            cityName:'',
            Number:'',
            ruralAddress:'',
            streetAddress:'',
            telNo:'',
            email:''
        }
        //this.closeModal=this.closeModal.bind(this);
        this.sendMessage=this.sendMessage.bind(this);
    }
    loadMessage(){

        if (localStorage.userType) {
            if (localStorage.userType === "false") {
                if (this.props.reply.senderUserName !== localStorage.userName) {

                    axios.post('http://localhost:3001/api/user/getUser',
                        {userName:this.props.reply.senderUserName,
                            token:localStorage.jwtToken})
                        .then((response)=>{
                            console.log(response);
                            this.setState({
                                Name:response.data.name,
                                cityName:response.data.address.cityName,
                                Number:response.data.address.number,
                                ruralAddress:response.data.address.ruralAddress,
                                streetAddress:response.data.address.streetAddress,
                                telNo:response.data.telNo,
                                email:response.data.email
                            })
                        }).catch(
                        (errors)=> {
                            console.log(errors);
                        }
                    );
                    this.setState({activeModal: true});
                }
            }
        }
    }
    closeModal = () => {
        this.setState({activeModal: false});
    }
    sendMessage() {
        this.context.router.push({
            pathname: `/message`,
            query: {userName: this.props.reply.senderUserName}
        });
    }



    render(){
        let property={
            cursor:'pointer'
        }
        return(
            <div style={property} onClick={this.loadMessage}>
                <div className="container">
                    <h5 className="media-heading right">{this.props.reply.senderUserName}</h5>
                    <h5 className="media-heading">{this.props.reply.price}</h5>
                    <p>{this.props.reply.remarks}</p>
                </div>
                <Modal
                    isOpen={this.state.activeModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Modal"
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad">
                                <div className="panel panel-info">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">{this.state.Name}</h3>
                                    </div>
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-md-3 col-lg-3"> <img alt="User Pic" src="http://babyinfoforyou.com/wp-content/uploads/2014/10/avatar-300x300.png" className="img-circle img-responsive" /> </div>
                                            <div className=" col-md-9 col-lg-9 ">
                                                <table className="table table-user-information">
                                                    <tbody>
                                                    <tr>
                                                        <td>Name:</td>
                                                        <td>{this.state.Name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Email:</td>
                                                        <td>{this.state.email}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Telephone:</td>
                                                        <td>{this.state.telNo}</td>
                                                    </tr>
                                                    <tr>
                                                    </tr>
                                                    <tr>
                                                        <td>Address:
                                                        </td>
                                                        <td>
                                                            <ul>
                                                                <li>{this.state.Number}</li>
                                                                <li>{this.state.streetAddress}</li>
                                                                <li>{this.state.ruralAddress}</li>
                                                                <li>{this.state.cityName}</li>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <a href="#" onClick={this.sendMessage} className="btn btn-primary">Send a Message</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel-footer">
                                        <i className="glyphicon glyphicon-envelope" />
                                        <span className="pull-right">
                                            <a onClick={this.closeModal} data-original-title="Remove this user" data-toggle="tooltip" type="button" className="btn btn-sm btn-danger">
                                                <i className="glyphicon glyphicon-remove" />
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}
Reply.contextTypes= {
    router:React.PropTypes.object.isRequired
}
export default Reply;