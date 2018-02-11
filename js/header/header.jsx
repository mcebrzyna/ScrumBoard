import React from 'react';
import Menu from './menu.jsx';

class Header extends React.Component{

    render(){
        return (
            <header>
                <div className='main-width'>
                    <div className='logo'>ScrumBoard.</div>
                    <div className='nav-box'>
                        <div><span>John Doe</span><img src="./img/user.svg"/></div>
                        <Menu/>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;