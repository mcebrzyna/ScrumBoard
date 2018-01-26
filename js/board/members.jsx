import React from 'react';
import Member from './member.jsx';

class Members extends React.Component{
    handleClick = () =>{
        const tab1 = document.querySelectorAll(`.task`);
        tab1.forEach( i => {
            i.style.display = 'block';
        });
    };

    render(){
        const members = this.props.members.map( item => {
           return <Member name={item} key={item} filter={this.props.filter}/>
        });

        return (
            <div className='members' id={this.props.id}>
                <div className='members-title'>{this.props.title}</div>
                <div className='members-container'>
                    <div className='member' onClick={this.handleClick}>all members</div>
                    {members}
                </div>
            </div>
        )
    }
}

export default Members;