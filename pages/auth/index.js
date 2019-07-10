import React from 'react';
import User from '../../componunt/User';     

const authIndexPage = () => (
    <div>
        <h1>The Auth Page</h1>
        <User name="Max" age={28}/>
    </div>
);

export default authIndexPage;