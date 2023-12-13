import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import CodeHighlighter from './highlighter/CodeHighligher';
import {getParamFromUrl} from '../utils';

const CodingBody = ({messages, typingStatus, lastMessageRef, socket, users, selectedCodeId}) => {
    const navigate = useNavigate();
    const currentCodeContextId = getParamFromUrl('codeId');

    // Component Mount and Unmount
    useEffect(() => {
        return () => {
            localStorage.removeItem('userName');
        };
    }, []);

    const handleLeaveEnv = () => {
        localStorage.removeItem('userName');
        navigate('/');
        // Consider using state to trigger a re-render instead of forcing a full page reload
        // window.location.reload();
    };

    const sendMessage = (text) => {
        socket.emit('chat message', {room: currentCodeContextId, msg: text});
        console.log(text);
    };

    return (
        <>
            <header className="env__mainHeader">
                <p>Code Environment</p>
                <button className="leaveEnv__btn" onClick={handleLeaveEnv}>
                    LEAVE ENVIRONMENT
                </button>
            </header>

            <div className="message__container">
                <CodeHighlighter language="javascript" initialCode={''} value={messages}
                                 onChange={(e) => sendMessage(e) }/>
                <div className="message__status">{/* <p>{typingStatus}</p> */}</div>
                <div ref={lastMessageRef}/>
            </div>
        </>
    );
};

export default CodingBody;
