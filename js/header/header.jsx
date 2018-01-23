import React from 'react';
import UserBtn from './userBtn.jsx'
import MenuBtn from './menuBtn.jsx'

class Header extends React.Component{
    render(){
        return (
            <header>
                <div className='main-width'>
                    <div className='logo'>ScrumBoard.</div>
                    <div className='nav-box'>
                        <UserBtn/>
                        <MenuBtn/>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;