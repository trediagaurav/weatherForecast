import React, { Component } from 'react';
import {Counter}  from './counter';
import Search from './Search';

export class Home extends Component {
    render() {
        return (
            <div className='container text-center mt-5'>
               <Counter />
               <Search />
            </div>
        )
    }
}

export default Home
