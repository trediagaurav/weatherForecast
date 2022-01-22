import React, { Component } from 'react'
import Search from './Search'

export class Home extends Component {
    render() {
        return (
            <div className='container text-center mt-5'>
               <Search />
            </div>
        )
    }
}

export default Home
