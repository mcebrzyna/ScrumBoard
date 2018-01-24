import React from 'react';

class Task extends React.Component{
    draggedEl = null;
    grabPointX;
    grabPointY;

    componentDidMount(){
        document.addEventListener('mousemove', this.onDrag);
        document.addEventListener('mouseup', this.onDragEnd);
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

    onDragStart = (ev) => {
        let boundingClientRect;

        if (ev.target.className.indexOf('task-title') === -1){
            return null;
        }

        this.draggedEl = ev.target.parentNode;
        boundingClientRect = this.draggedEl.getBoundingClientRect();

        this.grabPointY = boundingClientRect.top - ev.clientY;
        this.grabPointX = boundingClientRect.left - ev.clientX;
    };

    onDrag = (ev) => {
        let posX, posY;

        if(!this.draggedEl) {
            return null;
        }

        posX = ev.clientX + this.grabPointX;
        posY = ev.clientY + this.grabPointY;

        if(posX < 0){
            posX = 0;
        }
        if(posY < 0){
            posY = 0;
        }


        this.draggedEl.style.position = 'absolute';
        this.draggedEl.style.left = `${posX}px`;
        this.draggedEl.style.top = `${posY}px`;
    };

    onDragEnd = () => {
        this.draggedEl = null;
        this.grabPointX = null;
        this.grabPointY = null;

    };

    render(){
        const style ={
            backgroundColor: this.colorPicker(this.props.priority)
        };

        return (
            <div className="task" style={style} onMouseDown={this.onDragStart} key={this.props.id}>
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