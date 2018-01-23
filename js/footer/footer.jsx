import React from 'react';
import Socials from './socials.jsx'

class Footer extends React.Component{
    render(){
        return (
            <footer>
                <div className='main-width'>
                    <div className='footerLogo'>ScrumBoard.</div>
                    <Socials />
                    <span className='copyrights'> &copy; 2018 Michał Cębrzyna. All rights reserved. </span>
                </div>
            </footer>
        )
    }
}

export default Footer;