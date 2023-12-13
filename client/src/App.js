import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./components/Home"
import MainPage from "./components/MainPage";
import socketIO from "socket.io-client"
import CodeBlockComponent from "./components/CodeBlockComponent";
import 'bootstrap/dist/css/bootstrap.min.css';


const socket = socketIO.connect("http://localhost:4000")
function App() {
  return (
    <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home socket={socket}/>}></Route>
            <Route path="/env" element={<MainPage socket={socket}/>}></Route>
            <Route path="/codeSelector" element={<CodeBlockComponent/>}></Route>
          </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
