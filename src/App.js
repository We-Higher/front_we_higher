import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/layout/navbar';
import Sidebar from './components/layout/sidebar';
import Footer from './components/layout/footer';
import React from 'react';
import Router from './Router';
import Login from './components/member/Login';

export default function App() {
  const token = sessionStorage.getItem('token');

  return (
    <BrowserRouter>
      {token ? (
        <div className="d-flex flex-column flex-root">
          <div className="page d-flex flex-row flex-column-fluid">
            <div className="sidebar">
              <Sidebar />
            </div>
            <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
              <div className="navbar">
                <Navbar />
              </div>
              <div>
                <Router />
              </div>
              <div className="footer">
                <Footer />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </BrowserRouter>
  );
  
}
