import axios from "axios";
import { useEffect, useState } from "react";
export default function UserDetail(){

    const token = sessionStorage.getItem("token");
    const [dto, setDto] = useState({});
    
    useEffect(()=>{
        axios.get('http://localhost:8081/auth/info', {headers:{Authorization:token}})
        .then(
            function(res){
                if(res.status===200){
                    if(res.data.flag){
                        setDto(res.data.m);
                    }else{
                        alert('검색안됨');
                    }
                }else{
                    alert('error:'+res.status);
                }
            }
        );
    }, []);


    return (
        <div>
            <h2>user detail</h2>
            {dto.id}<br/>
            {dto.pwd}<br/>
            {dto.name}<br/>
            {dto.email}<br/>
        </div>
    );

}
