import React, {useEffect, useState, useRef} from 'react';
import EnvBar from './EnvBar';
import CodingBody from './CodingBody';


const MainPage = ({socket}) => {
    const [messages, setMessages] = useState('');
    const [typingStatus, setTypingStatus] = useState('');
    const lastMessageRef = useRef(null);
    const [usersList, setUsersList] = useState([])
    const [blockedUsers = '', setBlockedUsers] = useState([])
    const [selectedCodeId, setSelectedCodeId] = useState(null);

    useEffect(() => {


        socket.on('chat message', (msg) => {
            setMessages(msg);
        });

    }, [socket, messages])

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);

    const onUserAdded = (user) => {
        setUsersList(user);
        window.isFirstUser = usersList === 0;
    }
    return (
        <>
            <div className="codeBox">
                <EnvBar socket={socket} onUserAdded={onUserAdded} users={usersList} block={blockedUsers}/>
                <div className="env__main">
                    <CodingBody
                        isFirstUser={window.isFirstUser}
                        messages={messages}
                        typingStatus={typingStatus}
                        lastMessageRef={lastMessageRef}
                        socket={socket}
                        users={usersList}
                        selectedCodeId={selectedCodeId}
                    />
                </div>
            </div>
        </>
    );
}

export default MainPage