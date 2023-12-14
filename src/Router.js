import {Component} from "react";
import {Route, Routes, Navigate} from "react-router-dom";

import Login from "./components/member/Login";
import Join from "./components/member/Join";
import UserDetail from "./components/member/UserDetail";
import Main from "./components/Main";

import BoardList from "./components//board/BoardList";
import BoardAdd from "./components/board/BoardAdd";
import BoardDetail from "./components/board/BoardDetail";
import BoardEdit from "./components/board/BoardEdit";

import EmployeeList from "./components/employee/EmployeeList";
import EmployeeJoin from "./components/employee/EmployeeJoin";

import ImgBoardHome from "./components/ImgBoardHome";
import ImgAdd from "./components/imgboard/ImgAdd";
import Test from "./Test";

import ChatHome from "./components/chat/ChatHome";
import ChatInvitation from "./components/chat/ChatInvitation";
import ChatRoomList from "./components/chat/ChatRoomList";
import ChatRoomDetail from "./components/chat/ChatRoomDetail";

let isAuthorized = sessionStorage.getItem("isAuthorized");

class Router extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/member/login" />} />
        <Route path="/main" element={<Main />} />

        <Route path="/member/login" element={<Login />} />
        <Route path="/member/join" element={<Join />} />
        <Route path="/member/detail" element={<UserDetail />} />

        <Route path="/board/list" element={<BoardList />} />
        <Route path="/board/add" element={<BoardAdd />} />
        <Route path="/board/detail/:num" element={<BoardDetail />} />
        <Route path="/board/edit/:num" element={<BoardEdit />} />

        <Route path="/employee/list/" element={<EmployeeList />} />
        <Route path="/employee/join/" element={<EmployeeJoin />} />

        <Route path="/imgboardhome" element={<ImgBoardHome />} />
        <Route path="/imgboard/add" element={<ImgAdd />} />

        <Route path="/chat" element={<ChatHome />} />
        <Route path="/chat/invitation" element={<ChatInvitation />} />
        <Route path="/chat/room" element={<ChatRoomList />} />
        <Route path="/chat/room/:id" element={<ChatRoomDetail />} />

        <Route path="/test" element={<Test />} />

      </Routes>
    );
  }
}

export default Router;