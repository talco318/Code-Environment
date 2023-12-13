import React, {useState, useEffect} from 'react';

const EnvBar = ({socket, onUserAdded, users}) => {
    useEffect(() => {
        socket.on('newUserResponse', (data) => onUserAdded(data.name));
        // Clean up the event listener when the component unmounts
        return () => {
            socket.off('newUserResponse');
        };
    }, [socket, onUserAdded]);

    return (
        <div className="env__sidebar">
            <div>
                <h4 className="env__header">ACTIVE USERS</h4>
                <div className="env__users">
                    {users.map(({socketID, userName}) => (
                        <p key={socketID}>{userName}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EnvBar;
