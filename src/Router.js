import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/main";
import Join from "./components/member/Join";
import Login from "./components/member/Login";
import UserDetail from './components/member/UserDetail';
import BoardList from './components/board/BoardList';
import BoardAdd from './components/board/BoardAdd';
import BoardEdit from './components/board/BoardDetail';
import BoardDetail from "./components/board/BoardDetail";
import EmployeeList from "./components/employee/EmployeeList";
import EmployeeJoin from './components/employee/EmployeeJoin';
import { Navigate } from "react-router-dom";

function Router() {
  return (
    <Routes>
      {/* <Route exact path='/' element={<App />} />
      <Route path='/main' element={<Main />} />
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
      <Route path="/test" element={<Test />} /> */}

      <Route path="/" element={<Navigate to="/member/login" />} />
      <Route path="/member/login" element={<Login />} />
      <Route path="/member/join" element={<Join />} />
      <Route path="/member/detail" element={<UserDetail />} />
      <Route path="/main" element={<Main />} />
      <Route path="/board/list" element={<BoardList />} />
      <Route path="/board/add" element={<BoardAdd />} />
      <Route path="/board/detail/:num" element={<BoardDetail />} />
      <Route path="/board/edit/:num" element={<BoardEdit />} />
      <Route path="/employee/list/" element={<EmployeeList />} />
      <Route path="/employee/join/" element={<EmployeeJoin />} />
    </Routes>
  );
}

export default Router;
