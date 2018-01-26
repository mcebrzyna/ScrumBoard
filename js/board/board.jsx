import React from 'react';
import SubBoard from './subBoard.jsx'
import Members from './members.jsx'

class Board extends React.Component{
    url = 'http://localhost:3000/tasks';
    draggedEl = null;
    activeCol = null;
    grabPointX;
    grabPointY;

    state = {
        toDo: [],
        backlog: [],
        inProgress: [],
        inReview: [],
        done: [],
        members: [],
        tablesCords: [],
        loaded: false,
        activeCol: null,
        activeTask: null,
    };

    componentDidMount(){
        fetch(this.url)
            .then(resp => resp.json())
            .then(resp => {
                this.loadTasks(resp);
            }).catch(err => (console.log(err)))
    }

    switchTask = () => {
        let activeTask = this.state.activeTask;
        let activeCol = this.state.activeCol;
        let obj;
        let list1;

        //if no change table
        if(activeTask.dataset.status === activeCol){

            activeTask.style.position = 'static';
            return null;
        }

        //assign to 'obj' object from table equal with html active task
        this.state[activeTask.dataset.status].forEach( i => {
          if(i.id === Number(activeTask.dataset.id)){
              obj = Object.assign({}, i);
              obj.status = activeCol;
          }
        });

        //check if table undefined and push obj to new table
        typeof this.state[activeCol] !== 'undefined' ?
            list1 = this.state[activeCol].slice() :
            list1 = [];

        list1.push(obj);

        const list2 = this.state[activeTask.dataset.status].filter( i => {
            return i.id !== Number(activeTask.dataset.id)
        });

        this.setState({
            [`${activeCol}`]: list1,
            [`${activeTask.dataset.status}`]: list2,
        }/*, this.upDateJsonServ(obj)*/);
    };

    upDateJsonServ = (obj) => {
        fetch(`${this.url}/${this.state.activeTask.dataset.id}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify(obj)
            }).then( resp => resp.json())
            .then( data	=> {
                console.log(data);
            });
    };

    loadTasks = (resp) => {
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
        this.draggedEl.style.position = 'absolute';

        //checking subBoards coordinates
        const subBoards = document.querySelectorAll('.board-sub');
        const subsCords = [...subBoards].map( item => {
            return {right: item.getBoundingClientRect().right,
                left: item.getBoundingClientRect().left,
                id: item.id,}
        });

        //no colapse task box efect
        const newBox = document.createElement('div');
        newBox.classList.add('hidden');
        this.draggedEl.parentNode.insertBefore(newBox, this.draggedEl.nextSibling);

        //better drag experience
        this.draggedEl.classList.add('dragged');

        this.setState({
            activeTask: this.draggedEl,
            tablesCords: subsCords,
        }, () => {
            document.addEventListener('mousemove', this.findActiveCol);
        });

    };

    findActiveCol = (ev) => {
        let cords = this.state.tablesCords;

        cords.forEach( item => {
            if(ev.clientX > item.left && ev.clientX < item.right){
                if(this.activeCol !== item.id){
                    this.activeCol = item.id;
                }
            }
        });
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

        this.draggedEl.style.left = `${posX}px`;
        this.draggedEl.style.top = `${posY}px`;
    };

    onDragEnd = (ev) => {
        if (ev.target.className.indexOf('task-title') === -1){
            return null;
        }
        this.grabPointX = null;
        this.grabPointY = null;
        this.draggedEl.classList.remove('dragged');
        this.draggedEl = null;
        document.removeEventListener('mousemove', this.findActiveCol);
        document.querySelector('.hidden').remove();


        this.setState({
            activeCol: this.activeCol
        },() => {
            this.switchTask();
        })
    };

    render(){
        let boardProps = {
            onDragStart: this.onDragStart,
            onDrag: this.onDrag,
            onDragEnd: this.onDragEnd,
        };

        if(!this.state.loaded){
            return <div>Loading</div>}

        return (
            <section className='board'>
                <div className='main-width'>
                    <Members title='Members'/>
                    <div className='subBoards-container'>
                        <SubBoard id='backlog' title='Backlog' table={this.state.backlog} boardProps={boardProps} />
                        <SubBoard id='toDo' title='To-Do' table={this.state.toDo} boardProps={boardProps}/>
                        <SubBoard id='inProgress' title='In Progress' table={this.state.inProgress} boardProps={boardProps}/>
                        <SubBoard id='inReview' title='In Review' table={this.state.inReview} boardProps={boardProps}/>
                        <SubBoard id='done' title='Done' table={this.state.done} boardProps={boardProps}/>
                    </div>
                </div>
            </section>
        )
    }
}

export default Board;

