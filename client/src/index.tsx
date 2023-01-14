import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LazyLoading from './components/LazyLoading';
import axiosInterceptor from "./api/axiosInterceptor";
import "./styles/main.css";
const App = React.lazy(() => import("./App"));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={
            <React.Suspense fallback = {<LazyLoading />}>
              <App />
            </React.Suspense>
          } />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

axiosInterceptor(store);