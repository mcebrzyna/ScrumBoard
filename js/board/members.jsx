import React from 'react';

class Members extends React.Component{
    handleClick = () =>{
        const tab1 = document.querySelectorAll(`.task`);
        tab1.forEach( i => {
            i.style.display = 'block';
        });
    };

    render(){
        const members = this.props.members.map( item => {
            return <div className='member' data-member={item} onClick={this.props.filter} key={item}>{item}</div>
        });

        return (
            <div className='members' id={this.props.id}>
                <div className='members-container'>
                    <div className='member' onClick={this.handleClick}>all</div>
                    {members}
                </div>
            </div>
        )
    }
}

export default Members;