import React from 'react';
import Menu from './menu.jsx';

class Header extends React.Component{

    render(){
        return (
            <header>
                <div className='main-width'>
                    <div className='logo'>ScrumBoard.</div>
                    <div className='nav-box'>
                        <div>User <i className="fa fa-user-o" aria-hidden="true"/></div>
                        <Menu/>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;