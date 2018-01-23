import React from 'react';

class MenuBtn extends React.Component{
    render(){
        return (
            <a className='menu-btn'>
                <span className="icon-bar"/>
                <span className="icon-bar"/>
                <span className="icon-bar"/>
            </a>
        )
    }
}

export default MenuBtn;