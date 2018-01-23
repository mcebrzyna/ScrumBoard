import React from 'react';

class UserBtn extends React.Component{
    render(){
        return (
            <div className='user-btn'>
                <span>{'User'}</span>
                <i className="fa fa-user-o user-logo" aria-hidden="true"/>
            </div>
        )
    }
}

export default UserBtn;