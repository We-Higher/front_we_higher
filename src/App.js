import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/layout/navbar';
import Sidebar from './components/layout/sidebar';
import Footer from './components/layout/footer';
import React from 'react';
import Router from './Router';
import Login from './components/member/Login';
import EmployeeEdit from './components/employee/EmployeeEdit';
import './css/layout.css';
import './css/style.bundle.css';
import './css/plugins.bundle.css';
import { StompSessionProvider } from "react-stomp-hooks";

export default function App() {
  const token = sessionStorage.getItem('token');
  const myPort = process.env.REACT_APP_MY_PORT;

  return (
    <StompSessionProvider
      url={`http://localhost:${myPort}/ws-stomp`}>
      <BrowserRouter>
        <Routes>
          {token ? (
            <Route
              path="/*"
              element={
                <div className="d-flex flex-column flex-root">
                  <div className="page d-flex flex-row flex-column-fluid">
                    <div className="sidebar">
                      <Sidebar />
                    </div>
                    <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
                      <div className="navbar">
                        <Navbar />
                      </div>
                      <div className="content">
                        <Router />
                      </div>
                      <div className="footer">
                        <Footer />
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
          ) : (
            <Route path="/" element={<Login />} />
          )}
          <Route path="/edit/:username" element={<EmployeeEdit />} />
        </Routes>
      </BrowserRouter>
    </StompSessionProvider>
  );
}
