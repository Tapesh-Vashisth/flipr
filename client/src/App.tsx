import React, {useEffect} from 'react';
import axiosInstance from "./api/axios";
import { Routes, Route } from 'react-router-dom';
import LazyLoading from './components/LazyLoading';
import Home from './pages/Home';
const Login  = React.lazy(() => import('./pages/Login/Login'));
const SignUp = React.lazy(() => import('./pages/Sign Up/SignUp'));
// const Error404 = React.lazy(() => import('./'))

function App() {
  return (
    <Routes>
      <Route path = "/" element = {<React.Suspense fallback = {<LazyLoading />} >
        <Home />
      </React.Suspense>} />
      
      <Route path = "/auth">
        <Route path = "login" element = {<React.Suspense fallback = {<LazyLoading />}>
          <Login />
        </React.Suspense>} />
        <Route path = "signup" element = {<React.Suspense fallback = {<LazyLoading />}>
          <SignUp />
        </React.Suspense>} />
      </Route>

      {/* <Route path='*' element={}></Route> */}
    </Routes>
  );
}

export default App;
