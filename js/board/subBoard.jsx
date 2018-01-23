import React from 'react';

class SubBoard extends React.Component{
    render(){
        return (
            <div className='board-sub' id={this.props.id}>
                <div className='board-sub-title'>{this.props.title}</div>
                <div>Tasks</div>
            </div>
        )
    }
}

export default SubBoard;