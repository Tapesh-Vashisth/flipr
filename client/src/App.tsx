import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import LazyLoading from './components/LazyLoading';
import Protected from './components/Protected';
import { fetch } from './features/user/userSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';
import NavFootLayout from './components/NavFootLayout';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
const Login  = React.lazy(() => import('./pages/Login/Login'));
const SignUp = React.lazy(() => import('./pages/Sign Up/SignUp'));
const ErrorPage = React.lazy(() => import('./pages/ErrorPage/Error404'));
const FrontPage = React.lazy(() => import('./pages/FrontPage/FrontPage'));

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  
  useEffect(() => {
      if (!user.loggedIn) {
          dispatch(fetch());
      }
  }, []);

  return (
    <Routes>
      <Route path = "/" element = {<Protected />} >
        <Route path = '' element = {<NavFootLayout />}>
          <Route path = '' element = {<React.Suspense fallback = {<LazyLoading />}>
            <FrontPage />
          </React.Suspense>} />
        </Route>
      </Route>
      
      <Route path = "/auth">
        <Route path = "login" element = {<React.Suspense fallback = {<LazyLoading />}>
          <Login />
        </React.Suspense>} />
        <Route path = "signup" element = {<React.Suspense fallback = {<LazyLoading />}>
          <SignUp />
        </React.Suspense>} />
        <Route path = "forgotpassword" element = {<React.Suspense fallback = {<LazyLoading />}>
          <ForgotPassword />
        </React.Suspense>} />
      </Route>

      <Route path='*' element={<React.Suspense fallback = {<LazyLoading />}>
        <ErrorPage />
      </React.Suspense>} />
    </Routes>
  );
}

export default App;
