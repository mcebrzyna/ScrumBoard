import React from 'react';

class Task extends React.Component{
    componentDidMount(){
        document.addEventListener('mousemove', this.props.boardProps.onDrag);
    }

    colorPicker = (priority) => {
        if(priority === 'low'){
            return '#bae19a'
        } else if(priority === 'mid'){
            return '#ffeead'
        } else if(priority === 'high'){
            return '#ff857d'
        } else return 'grey'
    };

    render(){
        const style ={
            backgroundColor: this.colorPicker(this.props.priority)
        };

        return (
            <div className="task"
                 style={style}
                 onMouseDown={this.props.boardProps.onDragStart}
                 onMouseUp={this.props.boardProps.onDragEnd}>
                <h2 className="task-title" >{this.props.title}</h2>
                <p className="task-description">{this.props.description}</p>
                <div className="task-info">
                    <span>ID #{this.props.id}</span>
                    <span>user: {this.props.member}</span>
                </div>
            </div>
        )
    }
}

export default Task;