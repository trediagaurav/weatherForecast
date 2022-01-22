import React from 'react'
import '../css/top.css';
import { Navbar, Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';


export default function Top() {
    return (
        <div>
            <Navbar className='nav'>
                    <Nav className="me-auto">
                            <NavLink to="/" className='link'>Home</NavLink>
                            <NavLink to="/favorite" className='link'>Favorite</NavLink>
                    </Nav>
                    <div className='link' style={{marginRight:"130px"}}>Light/Dark</div>
            </Navbar>
        </div>
    )
}
