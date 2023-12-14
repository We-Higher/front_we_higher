import { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Login from "./components/member/Login";
import Mypage from "./components/member/Mypage";
import Main from "./components/layout/main";

import BoardList from "./components/board/BoardList";
import BoardAdd from "./components/board/BoardAdd";
import BoardDetail from "./components/board/BoardDetail";
import BoardEdit from "./components/board/BoardEdit";

import EmployeeList from "./components/employee/EmployeeList";
import EmployeeJoin from "./components/employee/EmployeeJoin";

import DataroomList from "./components/dataroom/DataroomList";
import DataroomAdd from "./components/dataroom/DataroomAdd";
import DataroomEdit from "./components/dataroom/DataroomEdit";
import DataroomDetail from "./components/dataroom/DataroomDetail";

import CommuteList from "./components/commute/CommuteList";
import MyCommute from "./components/commute/MyCommute";
import CommuteEdit from "./components/commute/CommuteEdit";
import CommuteEditList from "./components/commute/CommuteEditList";

import Report from "./components/approval/Report";
import MailSend from "./components/mail/MailSend";
import DemoApp from "./components/schedule/Calendar";
import Meetingroom from "./components/meetingroom/meetingroom";
import Schedule from "./components/schedule/Calendar";

let isAuthorized = sessionStorage.getItem("isAuthorized");

class Router extends Component {
  render() {
    return (
      <Routes>

        <Route path="/" element={<Navigate to="/member/login" />} />

        <Route path="/member/login" element={<Login />} />
        {/* <Route path="/edit/:username" element={<EmployeeEdit />} /> */}
        <Route path="/member/mypage" element={<Mypage />} />

        <Route path="/main" element={<Main />} />

        <Route path="/employee/list/" element={<EmployeeList />} />
        <Route path="/employee/join/" element={<EmployeeJoin />} />

        <Route path="/board/list" element={<BoardList />} />
        <Route path="/board/add" element={<BoardAdd />} />
        <Route path="/board/detail/:num" element={<BoardDetail />} />
        <Route path="/board/edit/:num" element={<BoardEdit />} />

        {/* <Route path="/board/notify" element={<NotifyList />} /> */}

        <Route path="/dataroom/list" element={<DataroomList />} />
        <Route path="/dataroom/add" element={<DataroomAdd />} />
        <Route path="/dataroom/edit/:num" element={<DataroomEdit />} />
        <Route path="/dataroom/detail/:num" element={<DataroomDetail />} />

        <Route path="/commute/list" element={<CommuteList />} />
        <Route path="/commute/mycommute" element={<MyCommute />} />
        <Route path="/commute/edit/:num" element={<CommuteEdit />} />
        <Route path="/commute/editlist" element={<CommuteEditList />} />

        <Route path="/approval/report" element={<Report />} />

        <Route path="/mail/send" element={<MailSend />} />

       <Route path="/schedule/calendar" element={<Schedule  />} />
       <Route path="/meetingroom/meetingroom" element={<Meetingroom  />} />
      </Routes>
    );
  }
}

export default Router;

