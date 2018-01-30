import React from 'react';

class Titles extends React.Component{
    state = {
        subBoards: ['To Do', 'Backlog', 'In Progress', 'In Review', 'Done'],
    };

    render(){
        const titles = this.state.subBoards.map( (item) => <div key={item} className='title'>{item}</div>);

        return (
            <section className='titles'>
                <div className='main-width'>
                    <div className='title first'>Members</div>
                    <div className='title-container'>
                        {titles}
                    </div>
                </div>
            </section>
        )
    }
}

export default Titles;