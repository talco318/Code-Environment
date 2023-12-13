import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import CodeBlockComponent from './CodeBlockComponent';

const LOCAL_STORAGE_USER_KEY = 'userName';

const Home = ({socket}) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("")
    const [selectedCodeId , setSelectedCodeId] = useState(null)
    const handleSocketEvents = () => {
        socket.emit('join room', selectedCodeId);
        socket.emit('newUser', {userName, selectedCodeId, socketID: socket.id});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, userName);
        handleSocketEvents();
        navigate(`/env?codeId=${selectedCodeId}`);
    };

    return (
        <form className='home__container' onSubmit={handleSubmit}>
            <h2 className='home__header'>Sign in to Open the JavaScript code environment</h2>
            <CodeBlockComponent onSelectCode={setSelectedCodeId}></CodeBlockComponent>
            <label htmlFor="username">Name:</label>
            <input type="text"
                   minLength={2}
                   name="username"
                   id='username'
                   className='username__input'
                   value={userName}
                   onChange={e => setUserName(e.target.value)}
            />
            <button className='home__cta'>GET IN</button>
        </form>
    )
};

export default Home;
