import React from 'react';
class ConnectedUsers extends React.Component{
    constructor(props){
        super(props);
        this.state={
            users:[]
        }
        
    }

    render(){
        return(
            <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="chat-box-online-div">
                    <div className="chat-box-online-head">
                        ONLINE USERS (120)
                    </div>
                    <div className="panel-body chat-box-online">
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
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ConnectedUsers;