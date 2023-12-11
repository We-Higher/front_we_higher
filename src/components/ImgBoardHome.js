import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ImgBoardHome(){
    const myPort = process.env.REACT_APP_MY_PORT
    const token = sessionStorage.getItem("token");
    const [list, setList] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:' + myPort + '/auth/diary', {headers:{Authorization:token}})
        .then(function(res){
            if(res.status===200){
                setList(res.data.list)
            }else{
                alert(res.status)
            }
        })
    },[])
    return(
        <div>
            <Link to="/imgboard/add">글작성</Link><br/>
            <h2>글목록</h2>
            <ul>
            {
                list.map((item)=>(
                    <li key={item.num}>
                        {item.num} / {item.wdate} / {item.writer.id} /
                        {item.title} / {item.content} /
                        <img src={'http://localhost:' + myPort + "/read-img/" + item.fname} className="imgstyle"/>
                    </li>
                ))
            }
            </ul>
        </div>
    );
}