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
        //setting the onclick such that it loads the required chat
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
                    <div className="chat-box-online bg-success text-white">
                        {users}
                    </div>
                </div>
            </div>
        )
    }
}
export default ConnectedUsers;