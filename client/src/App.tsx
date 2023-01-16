import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import LazyLoading from './components/LazyLoading';
import Protected from './components/Protected';
import { fetch } from './features/user/userSlice';
import LineGraph from './pages/LineGraph';
import { useAppDispatch, useAppSelector } from './store/hooks';
import NavFootLayout from './components/NavFootLayout';
import ForgotPassword from './pages/ForgotPassword';
import Account from './pages/Account';
import AlertDismissable from './components/Alert';
import CompanyData from './components/CompanyData';
const Login  = React.lazy(() => import('./pages/Login'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const ErrorPage = React.lazy(() => import('./pages/Error404'));
const FrontPage = React.lazy(() => import('./pages/FrontPage'));

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  
  useEffect(() => {
      if (!user.loggedIn) {
          dispatch(fetch());
      }
  }, []);

  return (
    <>
      <Routes>
        <Route path = "/" element = {<Protected />} >
          <Route path = '' element = {<NavFootLayout />}>
            <Route path = '' element = {<React.Suspense fallback = {<LazyLoading />}>
              <FrontPage />
            </React.Suspense>} />
            <Route path = '/account' element = {<React.Suspense fallback = {<LazyLoading />}>
              <Account />
            </React.Suspense>} />
            <Route path = '/companies' element = {<React.Suspense fallback = {<LazyLoading />}>
              <LineGraph />
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
    </>
  );
}

export default App;
