import React from 'react';
import {Navbar} from 'react-bootstrap';
function Header(){
return(
    <div className="header">
            <Navbar expand="lg">
            <Navbar.Brand href="#home">COVID-19 Cases Visualization</Navbar.Brand>
            
            </Navbar>
        </div>
)
}
export default Header;