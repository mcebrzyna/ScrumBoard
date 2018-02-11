import React from 'react';

class Footer extends React.Component{
    render(){
        return (
            <footer>
                <div className='main-width'>
                    <div className='footerLogo'>ScrumBoard.</div>
                    <a className='socials' href='https://github.com/mcebrzyna/ScrumBoard' target='_blank'>
                        <img src='img/github-logo.svg'/>
                        <div>
                            <span className='github'>View on GitHub</span>
                            <span className='underline'/>
                        </div>
                    </a>
                    <span className='copyrights'> &copy; 2018 Michał Cębrzyna. All rights reserved. </span>
                </div>
            </footer>
        )
    }
}

export default Footer;