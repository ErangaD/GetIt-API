import React from 'react';
import Report from './Report'
class ReportList extends React.Component {
    render() { 
        let reportList = this.props.data.map(report=>{
            return(
                <Report
                    report={report}
                    key={report._id}
                    fn={this.props.fn}
                />
            )
        });
        return(
            <div>
                {reportList}
            </div>
        );
    }
}
export default ReportList;