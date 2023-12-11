import axios from "axios";
import { useState } from "react";

export default function Join() {
    const myPort = process.env.REACT_APP_MY_PORT
    const [inputs, setInputs] = useState({ id: '', pwd: '', name: '', email: '' });
    const { id, pwd, name, email } = inputs;
    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    const save = () => {
        axios.post('http://localhost:' + myPort + '/join', {},
            { params: { id: id, pwd: pwd, name: name, email: email } })
            .then(function (res) {
                if (res.status === 200) {
                    alert(res.data.username);
                } else {
                    alert('error:' + res.status);
                }
            })
    }
    return (
        <div>
            <h2>Join</h2>
            id:<input type="text" name="id" onChange={onChange} value={id} /><br />
            pwd:<input type="text" name="pwd" onChange={onChange} value={pwd} /><br />
            name:<input type="text" name="name" onChange={onChange} value={name} /><br />
            email:<input type="text" name="email" onChange={onChange} value={email} /><br />
            <button onClick={save}>가입</button>
        </div>
    );

}
