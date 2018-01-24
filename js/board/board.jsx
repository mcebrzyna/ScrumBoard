import React from 'react';
import SubBoard from './subBoard.jsx'
import Members from './members.jsx'

class Board extends React.Component{
    url = 'http://localhost:3000/tasks';

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

    render(){

        if(!this.state.loaded){
            return <div>Loading</div>}

        return (
            <section ref = {el => this.board = el} className='board'>
                <div className='main-width'>
                    <Members title='Members'/>
                    <SubBoard id='backLog' title='Backlog' table={this.state.backlog}/>
                    <SubBoard id='toDo' title='To-Do' table={this.state.toDo}/>
                    <SubBoard id='inProgress' title='In Progress' table={this.state.inProgress}/>
                    <SubBoard id='inReview' title='In Review' table={this.state.inReview}/>
                    <SubBoard id='completed' title='Done' table={this.state.done}/>
                </div>
            </section>
        )
    }
}

export default Board;