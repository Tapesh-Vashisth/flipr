import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store/store';
import axiosInterceptor from "./api/axiosInterceptor";
import "./styles/main.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

axiosInterceptor(store);