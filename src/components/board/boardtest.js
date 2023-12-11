import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function BoardHome() {
    const myPort = process.env.REACT_APP_MY_PORT
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();
    const [list, setList] = useState([]);

   useEffect(()=>{
    axios.get('http://localhost:' + myPort + '/auth/board', {headers:{Authorization:token}})
    .then(
        function(res){
            if(res.status===200){
                setList(res.data.list);
            }else{
                alert('error:'+res.status);
            }
        }
    );
   },[])
    
    return (
        <div>
            <h2>게시판</h2>
            <Link to="/board/add">글작성</Link>  |  
            <h4>글목록</h4>
            <ul>
                {
                    list.map((item)=>(
                        <li key={item.num}>
                          <Link to={`/board/detail/${item.num}`}>{item.num}</Link>  
                         / {item.writer.id} / {item.wdate}
                         / {item.title} / {item.content} 
                         </li>
                    ))
                }
            </ul>
        </div>
    );

}
