import React from 'react';

class Member extends React.Component{
    render(){
        return (
            <div className='member' onClick={this.props.filter}>
                <div className="member-color"/>
                <div className="member-name" data-member={this.props.name}>{this.props.name}</div>
            </div>
        )
    }
}

export default Member;