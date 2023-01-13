import {useEffect} from 'react';
import axiosInstance from "./api/axios";
import Login from './pages/Login/Login';
import SignUp from './pages/Sign Up/SignUp';

function App() {
  return (
    <div className="App">
      <SignUp />
    </div>
  );
}

export default App;
