import React from 'react';
import SubBoard from './subBoard.jsx'
import Members from './members.jsx'

class Board extends React.Component{
    url = 'http://localhost:3000/tasks';
    draggedEl = null;
    activeCol = null;
    tableCords = [];
    grabPointX;
    grabPointY;

    state = {
        subBoards: ['toDo', 'backlog', 'inProgress', 'inReview', 'done'],
        toDo: [],
        backlog: [],
        inProgress: [],
        inReview: [],
        done: [],

        members: [],
        loaded: false,
    };

    componentDidMount(){

        // window.addEventListener('resize', ev => {
        //     console.log('resize');
        // });

        fetch(this.url)
            .then(resp => resp.json())
            .then(resp => this.loadTasksAndMembers(resp))
            .catch(err => (console.log(err)));
    }

    switchTask = () => {
        let activeCol = this.activeCol;
        let draggedEl = this.draggedEl;
        let obj;
        let list1;

        //if no change table
        if(draggedEl.dataset.status === activeCol || activeCol === null){
            draggedEl.style.position = 'static';
            return null;
        }

        //assign to 'obj' object from table equal with html active task
        this.state[draggedEl.dataset.status].forEach( item => {
          if(item.id === Number(draggedEl.dataset.id)){
              obj = Object.assign({}, item);
              obj.status = activeCol;
          }
        });

        //check if table undefined and push obj to new table
        typeof this.state[activeCol] !== 'undefined' ?
            list1 = this.state[activeCol].slice() :
            list1 = [];

        list1.push(obj);

        const list2 = this.state[draggedEl.dataset.status].filter( item => {
            return item.id !== Number(draggedEl.dataset.id)
        });

        this.setState({
            [`${activeCol}`]: list1,
            [`${draggedEl.dataset.status}`]: list2,
        }, this.upDateJsonServ(obj));
    };

    upDateJsonServ = (obj) => {
        fetch(`${this.url}/${this.draggedEl.dataset.id}`,
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

    loadTasksAndMembers = (resp) => {
        const data = {};
        const members = [];
        resp.forEach( i => {
            if(typeof data[i.status] === 'undefined'){
                data[i.status] = []
            }
            data[i.status].push(i);

            if(members.indexOf(i.member) === -1){
                members.push(i.member);
            }
        });

        this.setState({
            toDo: data.toDo,
            backlog: data.backlog,
            inProgress: data.inProgress,
            inReview: data.inReview,
            done: data.done,
            members: members,
            loaded: true,
        });
    };

    onDragStart = (ev) => {
        let boundingClientRect;
        this.draggedEl = null;

        //drag title not hole box
        if (ev.target.className.indexOf('task-title') === -1){
            return null;
        }

        this.draggedEl = ev.target.parentNode;
        boundingClientRect = this.draggedEl.getBoundingClientRect();

        this.grabPointY = boundingClientRect.top - ev.clientY;
        this.grabPointX = boundingClientRect.left - ev.clientX;
        this.draggedEl.style.position = 'absolute';
        this.draggedEl.style.width = `${boundingClientRect.width}px`;

        //checking subBoards coordinates
        const subBoards = document.querySelectorAll('.board-sub');
        this.tableCords = [...subBoards].map( item => {
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

        document.addEventListener('mousemove', this.findActiveCol);
    };

    findActiveCol = (ev) => {
        this.tableCords.forEach( item => {
            if(ev.clientX > item.left && ev.clientX < item.right){
                if(this.activeCol !== item.id){
                    this.activeCol = item.id;
                    console.log(this.activeCol)
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
        document.querySelector('.hidden').remove();

        this.switchTask();
    };

    filterMembers = (ev) => {
        ev.target.classList.toggle('active-member');

        const tab1 = this.board.querySelectorAll(`.task`);
        tab1.forEach( i => {
            i.style.display = 'none';
        });

        const tab2 = this.board.querySelectorAll(`.task[data-name="${ev.target.dataset.member}"]`);
        tab2.forEach( i => {
            i.style.display = 'block';
        });
    };

    render(){
        let boardProps = {
            onDragStart: this.onDragStart,
            onDrag: this.onDrag,
            onDragEnd: this.onDragEnd,
        };

        let subBoards = this.state.subBoards.map((item) => {
           return <SubBoard id={item} table={this.state[item]} boardProps={boardProps} key={item}/>
        });

        if(!this.state.loaded){
            return <div>Loading</div>}

        return (
            <section className='board' ref={(rel) => { this.board = rel;}}>
                <div className='main-width'>
                    <Members title='Members' members={this.state.members} filter={this.filterMembers}/>
                    <div className='subBoards-container'>
                        {subBoards}
                    </div>
                </div>
            </section>
        )
    }
}

export default Board;

