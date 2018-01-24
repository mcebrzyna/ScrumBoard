import React from 'react';
import Task from "./task.jsx";

class SubBoard extends React.Component{

    mapList = list => {
        if(typeof list === 'undefined'){
            return null;
        }

        return list.map(i => {
            return(
                <Task
                    id={i.id}
                    title={i.title}
                    description={i.description}
                    member={i.member}
                    priority={i.priority}
                    status={i.status}
                    boardProps={this.props.boardProps}
                />
            )
        });
    };

    render(){
        const tasks = this.mapList(this.props.table);

        return (
            <div className='board-sub' id={this.props.id} onMouseEnter={this.props.boardProps.checkCol}>
                <div className='board-sub-title'>{this.props.title}</div>
                {tasks}
            </div>
        )
    }
}

export default SubBoard;