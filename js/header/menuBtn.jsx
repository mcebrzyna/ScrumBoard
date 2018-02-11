import React from 'react';

class MenuBtn extends React.Component{
    state = {
        triggerClass: '',
    };

    handleClick = () =>{
        if(this.state.triggerClass.length === 0){
            this.setState( { triggerClass: 'open',} );
        }
        else {
            this.setState( {triggerClass: '',} );
        }

        this.props.slideMenu ();
    };

    render(){
        return (
            <div className={`nav-icon ${this.state.triggerClass}`} onClick={this.handleClick}>
                <span/>
                <span/>
                <span/>
                <span/>
            </div>
        )
    }
}

export default MenuBtn;