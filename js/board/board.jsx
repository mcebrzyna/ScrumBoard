import React from 'react';
import SubBoard from './subBoard.jsx'
import Members from './members.jsx'

class Board extends React.Component{
    url = 'http://localhost:3000/tasks';
    draggedEl = null;
    grabPointX;
    grabPointY;

    state = {
        toDo: [],
        backlog: [],
        inProgress: [],
        inReview: [],
        done: [],
        members: [],
        loaded: false,
        activeCol: null,
    };

    componentDidMount(){
        fetch(this.url)
            .then(resp => resp.json())
            .then(resp => {
                this.changeLists(resp);
            }).catch(err => (console.log(err)))
    }

    changeLists = (resp) => {
        const data = {};
        resp.forEach( i => {
            if(typeof data[i.status] === 'undefined'){
                data[i.status] = []
            }
            data[i.status].push(i)
        });

        this.setState({
            toDo: data.toDo,
            backlog: data.backlog,
            inProgress: data.inProgress,
            inReview: data.inReview,
            done: data.done,
            loaded: true,
        });
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

    onDragEnd = (ev) => {
        this.draggedEl = null;
        this.grabPointX = null;
        this.grabPointY = null;

        ev.target.parentNode.style.display = "none";
    };

    checkActiveCol = (ev) => {
        this.setState({
            activeCol: ev.target.id
        },() => console.log(this.state.activeCol));
    };

    render(){
        let boardProps = {
            checkCol: this.checkActiveCol,
            onDragStart: this.onDragStart,
            onDrag: this.onDrag,
            onDragEnd: this.onDragEnd,
        };

        if(!this.state.loaded){
            return <div>Loading</div>}

        return (
            <section ref = {el => this.board = el} className='board'>
                <div className='main-width'>
                    <Members title='Members'/>
                    <SubBoard id='backLog' title='Backlog' table={this.state.backlog} boardProps={boardProps} />
                    <SubBoard id='toDo' title='To-Do' table={this.state.toDo} boardProps={boardProps}/>
                    <SubBoard id='inProgress' title='In Progress' table={this.state.inProgress} boardProps={boardProps}/>
                    <SubBoard id='inReview' title='In Review' table={this.state.inReview} boardProps={boardProps}/>
                    <SubBoard id='completed' title='Done' table={this.state.done} boardProps={boardProps}/>
                </div>
            </section>
        )
    }
}

export default Board;