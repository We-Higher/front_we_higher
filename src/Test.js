import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ id: '', pwd: ''});
    const { id, pwd} = inputs;
    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    const login = () => {
        axios.post('http://localhost:8081/login', {},{ params: { id: id, pwd: pwd } })
            .then(function (res) {
                if (res.status === 200) {
                    if(res.data.flag){
                        alert('로그인 성공');
                        sessionStorage.setItem('token', res.data.token);
                        sessionStorage.setItem('loginid', id);
                        navigate("/userhome");
                    }else{
                        alert('로그인 실패');
                    }
                    
                } else {
                    alert('error:' + res.status);
                }
            })
    }
    return (
        <div>
            <h2>Login</h2>
            id:<input type="text" name="id" onChange={onChange} value={id} /><br />
            pwd:<input type="text" name="pwd" onChange={onChange} value={pwd} /><br />
            <button onClick={login}>로그인</button>
        </div>
    );

}
