import React from 'react';

class Loader extends React.Component{

    render(){
        return (
            <div className='loader'>
                <div className="spinner"/>
                <span style={{color: '#ddd'}}>Loading...</span>
            </div>
        )
    }
}

export default Loader;