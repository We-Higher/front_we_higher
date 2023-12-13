import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../layout/sidebar2';

export default function Main() {
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.clear();
        alert('로그아웃 되셨습니다.');
        navigate("/member/login")
    }

    const insert = () => {
        
        axios.post('http://localhost:8081/auth/commute/attendance',
        {},
        { headers: { Authorization: token }})
        .then(function (res) {
            if (res.status === 200) {
                if(res.data.flag){
                    alert('출근이 정상적으로 처리되었습니다.');
                    navigate('/main')
                }  
                else{
                    alert('이미 출근처리가 완료되었습니다.');
                    navigate('/main')
                }
            } else {
                alert('error:' + res.status);
            }
        })
    }

    const out = () => {
        
        axios.post('http://localhost:8081/auth/commute/quit',
        {},
        { headers: { Authorization: token }})
        .then(function (res) {
            if (res.status === 200) {
                if(res.data.flag){
                    alert('퇴근이 정상적으로 처리되었습니다.');
                    navigate('/main')
                }  
                else{
                    alert('이미 퇴근처리가 완료되었습니다.');
                    navigate('/main')
                }
            } else {
                alert('error:' + res.status);
            }
        })
        .catch(error => {
            alert('출근을 먼저 해야합니다.');
          });
      
    }

    let menu;

    if (token === null) {
        menu = <div><Link to="/member/join">join</Link>  |
            <Link to="/member/login">login</Link>  |  </div>;
    } else {
        menu = <div><Link to="/member/detail">detail</Link> |
        <Link to="/member/mypage">마이페이지</Link>   |
        <Link to="/employee/list">임직원</Link>  |   
        <Link to="/board/list">게시판</Link>  |
        <Link to="/dataroom/list">자료실</Link>   |  
        <Link to="/commute/list">임직원 근태관리</Link>   |  
        <Link to="/commute/mycommute">출퇴근 이력</Link>   | 
        <Link to="/commute/editlist">근태 수정요청</Link>   | 
        <Link to="/schedule/add">캘린더</Link>   |  
        <Link to="/approval/report">품의서</Link>  |  
            <button onClick={logout}>logout</button>
            <button onClick={insert}>출근</button>
            <button onClick={out}>퇴근</button></div>;
    }
    return (
        <div>
            {menu}
           
        </div>
    );

}
