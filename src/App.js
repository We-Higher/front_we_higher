import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Login from './components/member/Login';
import EmployeeEdit from './components/employee/EmployeeEdit';
import Report from "./components/approval/Report";
import Expense from "./components/approval/Expense";
import Vacation from "./components/approval/Vacation";
import './css/layout.css';
import './css/style.bundle.css';
import './css/plugins.bundle.css';
import { useSubscription } from "react-stomp-hooks";
import { MY_PORT } from './common/util';
import './css/style.bundle.css';
import './css/plugins.bundle.css';
import axios from "axios";
import MainLayout from "./components/layout/MainLayout";
import ChatAlarm from "./components/alarm/ChatAlarm";

export default function App() {
    const token = sessionStorage.getItem('token');
    const [chatAlarmList, setChatAlarmList] = useState([])
    const [user, setUser] = useState({id: '', username: ''})

    useEffect(() => {
        if (token !== null) {
            axios.get(`http://localhost:${MY_PORT}/member`, { headers: { Authorization: token } })
                .then(res => {
                    setUser(res.data.member)
                })
        }
    }, []);

    useSubscription(`/sub/alarm/${user.id}`, (message) => {
        const recv = JSON.parse(message.body)
        console.log('message', recv)
        if (window.location.pathname === `/chat/room/${recv.room.id}`) {
            return
        }
        setChatAlarmList([...chatAlarmList, recv])
    })

    const handleClose = (i, id) => {
        // chatAlarmList
        console.log('before', chatAlarmList)
        setChatAlarmList(chatAlarmList.filter(chatAlarm => chatAlarm.id !== id))
        console.log('after', chatAlarmList)

    }

  return (
      <BrowserRouter>
        <Routes>
          {token ? (
            <Route path="/*" element={<MainLayout />} />
          ) : (
            <Route path="/" element={<Login />} />
          )}
          <Route path="/edit/:username" element={<EmployeeEdit />} />
          <Route path="/approval/report" element={<Report />} />
          <Route path="/approval/expense" element={<Expense />} />
          <Route path="/approval/vacation" element={<Vacation />} />
        </Routes>
      <ChatAlarm chatAlarmList={chatAlarmList} handleClose={handleClose}></ChatAlarm>
      </BrowserRouter>
  );
}
