import React from 'react';

class Members extends React.Component{
    render(){
        return (
            <div className='members' id={this.props.id}>
                <div className='members-title'>{this.props.title}</div>
                <div>Tasks</div>
            </div>
        )
    }
}

export default Members;