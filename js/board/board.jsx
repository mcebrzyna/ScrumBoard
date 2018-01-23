import React from 'react';
import SubBoard from './subBoard.jsx'
import Members from './members.jsx'

class Board extends React.Component{
    render(){
        return (
            <section className='board'>
                <div className='main-width'>
                    <Members title='Members'/>
                    <SubBoard id='toDo' title='Backlog'/>
                    <SubBoard id='backLog' title='To-Do'/>
                    <SubBoard id='inProgress' title='In Progress'/>
                    <SubBoard id='completed' title='In Review'/>
                    <SubBoard id='completed' title='Done'/>
                </div>
            </section>
        )
    }
}

export default Board;