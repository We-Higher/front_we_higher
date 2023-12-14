import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';


export default function Main() {
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.clear();
        alert('로그아웃 되셨습니다.');
        navigate("/member/login")
    }
    let menu;

    if (token === null) {
        menu = <div>
            <Link to="/member/join">join</Link> |
            <Link to="/member/login">login</Link> |
        </div>;
    } else {
        menu = <div>
            <Link to="/member/detail">detail</Link> |
            <Link to="/employee/list">임직원</Link> |
            <Link to="/board/list">게시판</Link> |
            <Link to='/imgboardhome'>이미지게시판</Link> |
            <button onClick={logout}>logout</button>
            <Link to='/chat'>Chat</Link>
        </div>;
    }
    return (
        <div>
            {menu}
        </div>
    );

}
