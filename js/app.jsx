import '../scss/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    Route,
    Link,
    IndexLink,
    IndexRoute,
    hashHistory
} from 'react-router';

import Board from './board/board.jsx'
import Header from './header/header.jsx'
import Footer from './footer/footer.jsx'

document.addEventListener('DOMContentLoaded', function () {

    class App extends React.Component{
        render(){
            return (
                <div className='main-container'>
                    <Header />
                    <Board />
                    <Footer />
                </div>
            )
        }
    }

    ReactDOM.render(
        <App />,
        document.getElementById('app')
    )
});