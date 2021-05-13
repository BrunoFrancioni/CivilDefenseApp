import React from 'react';
import { Container } from 'react-bootstrap';

import './styles.css';

const Header: React.FC = () => {
    return (
        <div className="header-container">
            <Container>
                <p>Header</p>
            </Container>
        </div>
    )
}

export default Header;