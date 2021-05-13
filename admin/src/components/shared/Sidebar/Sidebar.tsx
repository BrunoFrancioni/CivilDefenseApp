import React from 'react';
import { Nav } from 'react-bootstrap';

const Sidebar: React.FC = () => {
    return (
        <Nav className="flex-column">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
        </Nav>
    )
}

export default Sidebar;