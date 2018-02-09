import React from 'react';
import SubBoard from './subBoard.jsx'
import Members from './members.jsx'


class Board extends React.Component{
    url = 'http://cebrzyna.ayz.pl/db.json';
    draggedEl = null;
    activeCol = null;
    tableCords = [];
    membersBtnOn = [];
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
        filteredMembers: [],
        loaded: false,
    };

    componentDidMount() {
        fetch(this.url)
            .then(resp => resp.json())
            .then(resp => this.loadTasksAndMembers(resp))
            .catch(err => (console.log(err)));

        window.addEventListener('resize', this.checkCoordinates);
        document.addEventListener('mousemove', this.findActiveCol);
    }

    checkCoordinates = () => {
        const subBoards = document.querySelectorAll('.board-sub');
        this.tableCords = [...subBoards].map( item => {

            return {right: item.getBoundingClientRect().right,
                left: item.getBoundingClientRect().left,
                id: item.id,}
        });
    };

    updateJsonServ = (obj) => {
        fetch(`${this.url}/${this.draggedEl.dataset.id}`,
            {
                // headers: {
                //     'Accept': 'application/json',
                //     'Content-Type': 'application/json'
                // },
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
            filteredMembers: members,
            loaded: true,
        }, () => this.checkCoordinates());
    };

    onDragStart = (ev) => {
        this.draggedEl = null;
        let boundingClientRect;

        // drag title not hole box
        if (ev.target.className.indexOf('task-title') === -1){
            return null;
        }

        this.draggedEl = ev.target.parentNode;
        boundingClientRect = this.draggedEl.getBoundingClientRect();

        this.grabPointY = boundingClientRect.top - ev.clientY;
        this.grabPointX = boundingClientRect.left - ev.clientX;

        this.draggedEl.style.position = 'absolute';
        this.draggedEl.style.width = `${boundingClientRect.width}px`;

        //no colapse task box efect
        const newBox = document.createElement('div');
        newBox.classList.add('hidden');
        this.draggedEl.parentNode.insertBefore(newBox, this.draggedEl.nextSibling);

        //better drag experience
        this.draggedEl.classList.add('dragged');
        document.addEventListener('mousemove', this.onDrag);
    };

    findActiveCol = (ev) => {
        this.tableCords.forEach( item => {
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
        document.querySelector('.hidden').remove();

        document.removeEventListener('mousemove', this.onDrag);

        this.switchTask();
    };

    switchTask = () => {
        let activeCol = this.activeCol;
        let draggedEl = this.draggedEl;
        let obj;
        let list1, list2;

        //if table is not changed
        if(draggedEl.dataset.status === activeCol || activeCol === null){
            draggedEl.style.position = 'static';
            this.draggedEl.style.left = 'auto';
            this.draggedEl.style.top = 'auto';
            this.draggedEl.style.width = 'auto';
            return null;
        }

        //assign to 'obj' object from table equal with html active task
        this.state[draggedEl.dataset.status].forEach( item => {
            if(item.id === Number(draggedEl.dataset.id)){
                obj = Object.assign({}, item);
                obj.status = activeCol;
            }
        });

        list1 = this.state[draggedEl.dataset.status].filter( item => {
            return item.id !== Number(draggedEl.dataset.id)
        });

        //check if table undefined and push obj to new table
        typeof this.state[activeCol] !== 'undefined' ?
            list2 = this.state[activeCol].slice() :
            list2 = [];

        list2.push(obj);

        this.setState({
            [`${draggedEl.dataset.status}`]: list1,
            [`${activeCol}`]: list2,
        }, this.updateJsonServ(obj));
    };

    filterMembers = (ev) => {

        //all button
        if(ev.target.className.indexOf('all') !== -1){
            this.boards.querySelectorAll('.active-member').forEach(item =>{
               item.classList.remove('active-member');
            });

            this.membersBtnOn = [];
            this.setState( {filteredMembers: this.state.members,} );
            return null;
        }

        //member button
        ev.target.classList.toggle('active-member');

        if(ev.target.className.indexOf('active-member') !== -1){
            this.membersBtnOn.push(ev.target.dataset.member);

            this.setState( {filteredMembers: this.membersBtnOn,} );
        }
        else{

            this.membersBtnOn = [...this.membersBtnOn].filter( item => {
                return item !== ev.target.dataset.member;
            });

            if(this.membersBtnOn.length === 0){
                this.setState( {filteredMembers: this.state.members,} );
            }
            else{
                this.setState( {filteredMembers: this.membersBtnOn,} );
            }
        }
    };

    render(){
        let boardProps = {
            onDragStart: this.onDragStart,
            onDrag: this.onDrag,
            onDragEnd: this.onDragEnd,
        };

        let subBoards = this.state.subBoards.map((item) => {
           return <SubBoard id={item}
                            table={this.state[item]}
                            boardProps={boardProps}
                            key={item}
                            filteredMembers={this.state.filteredMembers}/>
        });

        if(!this.state.loaded){
            return <div>Loading</div>}

        return (
            <section className='board' ref={(rel) => { this.boards = rel;}}>
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

