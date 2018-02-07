import React from 'react';
import Task from "./task.jsx";

class SubBoard extends React.Component{

    generateTasks = (table) => {
        if(typeof table === 'undefined'){
            return null;
        }

        table = table.filter(item => {
            return (this.props.filteredMembers.indexOf(item.member) !== -1)
        });

        return table.map(i => {
            return(
                <Task
                    id={i.id}
                    title={i.title}
                    description={i.description}
                    member={i.member}
                    priority={i.priority}
                    status={i.status}
                    boardProps={this.props.boardProps}
                    key={i.id}
                />
            )
        });
    };

    render(){
        const tasks = this.generateTasks(this.props.table);

        return (
            <div className='board-sub' id={this.props.id}>
                <div className='tasks-container'>
                    {tasks}
                </div>
            </div>
        )
    }
}

export default SubBoard;