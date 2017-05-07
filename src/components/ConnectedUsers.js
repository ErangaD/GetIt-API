import React from 'react';
class ConnectedUsers extends React.Component{
    constructor(props){
        super(props);
        this.state={
            socket:this.props.socket
        }
        this.getMessages=this.getMessages.bind(this);
    }
    getMessages(userName){
        var user = {
            token:localStorage.jwtToken,
            userName:userName
            //contains the userName of the other party when the buyer click a comment otherwise null
        }
        this.state.socket.emit('getMessage',user);
    }
    render(){
        let property={
            cursor:'pointer'
        }
        let users = this.props.connectedUsers.map(users=>{
            if(this.props.userType){
                return (
                    <div style={property} className="chat-box-online-left" onClick={() => this.getMessages(users.buyerUserName)} key={users.buyerUserName}>
                        -  {users.buyerUserName}
                        <br />
                        <hr className="hr-clas-low" />
                    </div>
                )
            }else{
                return (
                    <div style={property} className="chat-box-online-left" onClick={() => this.getMessages(users.sellerUserName)} key={users.sellerUserName}>
                        -  {users.sellerUserName}
                        <br />
                        <hr className="hr-clas-low" />
                    </div>
                )
            }

        });
        return(
            <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="chat-box-online-div">
                    <div className="chat-box-online-head">
                        Connected Users
                    </div>
                    <div className="panel-body chat-box-online">
                        {users}
                        {/*<div className="chat-box-online-left" onClick={() => this.props.getMessages("fucker")}>
                            -  Justine Goliyad
                            <br />
                            ( <small>Active from 3 hours</small> )
                            <hr className="hr-clas-low" />
                        </div>

                        <div className="chat-box-online-right">
                            -  Romin Royeelin
                            <br />
                            ( <small>Active from 10 hours</small> )
                        </div>
                        <hr className="hr-clas-low" />
                        <div className="chat-box-online-left">
                            -  Justine Goliyad
                            <br />
                            ( <small>Active from 3 hours</small> )
                        </div>
                        <hr className="hr-clas-low" />
                        <div className="chat-box-online-right">
                            -  Romin Royeelin
                            <br />
                            ( <small>Active from 10 hours</small> )
                        </div>
                        <hr className="hr-clas-low" />
                        <div className="chat-box-online-left">
                            -  Justine Goliyad
                            <br />
                            ( <small>Active from 3 hours</small> )
                        </div>*/}
                    </div>
                </div>
            </div>
        )
    }
}
export default ConnectedUsers;