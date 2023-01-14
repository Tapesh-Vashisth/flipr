import React, {useEffect} from 'react';
import axiosInstance from "./api/axios";
import { Routes, Route } from 'react-router-dom';
import LazyLoading from './components/LazyLoading';
const Login  = React.lazy(() => import('./pages/Login/Login'));
const SignUp = React.lazy(() => import('./pages/Sign Up/SignUp'));

function App() {
  return (
    <Routes>
      <Route path = "/auth">
        <Route path = "login" element = {<React.Suspense fallback = {<LazyLoading />}>
          <Login />
        </React.Suspense>} />
        <Route path = "signup" element = {<React.Suspense fallback = {<LazyLoading />}>
          <SignUp />
        </React.Suspense>} />
      </Route>
    </Routes>
  );
}

export default App;
