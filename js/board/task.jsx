import React from 'react';

class Task extends React.Component{
    componentDidMount(){
        document.addEventListener('mousemove', this.props.boardProps.onDrag);
    }

    priorityLevel = (priority) => {
        if(priority === 'low'){
            return 'prior-low'
        } else if(priority === 'mid'){
            return 'prior-mid'
        } else if(priority === 'high') {
            return 'prior-high'
        }else {
            return 'prior-unDef'
        }
    };

    render(){
        const priorityLevel = this.priorityLevel(this.props.priority);

        return (
            <div className={`task ${priorityLevel}`}
                 data-id={this.props.id}
                 data-status={this.props.status}
                 data-name={this.props.member}
                 onMouseDown={this.props.boardProps.onDragStart}
                 onMouseUp={this.props.boardProps.onDragEnd}>
                <div className="task-title">
                    <span>#{this.props.id}</span>
                    <span>{this.props.member}</span>
                </div>
                <div className="task-info">
                    <div className='prior-level'/>
                    <div className="task-description">
                        <p>{this.props.title}</p>
                    </div>

                </div>
            </div>
        )
    }
}

export default Task;