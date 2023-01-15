import React, {useEffect} from 'react';
import axiosInstance from "./api/axios";
import { Routes, Route } from 'react-router-dom';
import LazyLoading from './components/LazyLoading';
import Home from './pages/Home';
import Protected from './components/Protected';
import { fetch } from './features/user/userSlice';
import LineGraph from './components/LineGraph';
import { useAppDispatch, useAppSelector } from './store/hooks';
const Login  = React.lazy(() => import('./pages/Login/Login'));
const SignUp = React.lazy(() => import('./pages/Sign Up/SignUp'));
// const Error404 = React.lazy(() => import('./'));

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
        <Route path = '' element = {<React.Suspense fallback = {<LazyLoading />}>
          <Home />
        </React.Suspense>}>
        </Route>
      </Route>
      
      <Route path = "/auth">
        <Route path = "login" element = {<React.Suspense fallback = {<LazyLoading />}>
          <Login />
        </React.Suspense>} />
        <Route path = "signup" element = {<React.Suspense fallback = {<LazyLoading />}>
          <SignUp />
        </React.Suspense>} />
      </Route>
      
{/* data={[1,5,4,2,3,1,2,3,4,3,2,1,4,5,6,7]} labels={['mon','tue','wed','thurs','fri','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf']} */}
      <Route path = "/chart" element={<LineGraph />}>
      </Route>



      {/* <Route path='*' element={}></Route> */}
    </Routes>
  );
}

export default App;
