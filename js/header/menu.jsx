import React from 'react';

class Menu extends React.Component{
    menuActive = false;

    slideMenu = ev => {
        const width = this.menu.getBoundingClientRect().width;
        this.menuActive = !this.menuActive;

        if(this.menuActive){
            let px = 0;
            const interval = setInterval(() => {
                if(px === width){
                    clearInterval(interval);
                } else{
                    this.menu.style.transform = `translateX(-${px+=20}px)`;
                }
            }, 6);
        }
        else{
            let px = width;
            const interval = setInterval(() => {
                if(px === 0){
                    clearInterval(interval);
                } else{
                    this.menu.style.transform = `translateX(-${px-=20}px)`;
                }
            }, 6);
        }
    };

    render(){
        return (
            <nav className='menu'>
                <div className='menu-btn' onClick={this.slideMenu}>
                    <span className="icon-bar"/>
                    <span className="icon-bar"/>
                    <span className="icon-bar"/>
                </div>
                <div className='menu-box' ref={(rel) => { this.menu = rel;}}>
                    <img src="./img/user.svg"/>
                    <h2>Welcome John!</h2>
                </div>
            </nav>
        )
    }
}

export default Menu;