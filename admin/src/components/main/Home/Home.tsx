import React from 'react';
import CredentialsStats from './CredentialsStats/CredentialsStats';
import EntitiesStats from './EntitiesStats/EntititesStats';

const Home: React.FC = () => {
    return (
        <>
            <h1>Inicio</h1>

            <hr />

            <CredentialsStats />

            <EntitiesStats />
        </>
    )
}

export default Home;