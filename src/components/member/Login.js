import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../css/login_form.css';
import '../../css/style.bundle.css';

export default function Login() {
    const myPort = process.env.REACT_APP_MY_PORT
    const [inputs, setInputs] = useState({ username: '', password: '' });
    const token = sessionStorage.getItem("token");
    const { username, password } = inputs;
    const navigate = useNavigate();

    useEffect(() => {
        if (token != null) {
            navigate("/main");
        }
    }, []);

    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            login();
        }
    };

    const login = () => {
        axios.post('http://localhost:' + myPort + '/login', {}, { params: { username: username, password: password } })
            .then(function (res) {
                if (res.status === 200) {
                    if (res.data.flag) {
                        sessionStorage.setItem('token', res.data.token);
                        sessionStorage.setItem('loginid', username);
                        window.location.reload(); // 페이지 새로고침
                    } else {
                        alert('로그인 실패');
                    }
                } else {
                    alert('error:' + res.status);
                }
            })
            .catch(function (error) {
                alert('아이디가 존재하지 않거나 비밀번호가 다릅니다.');
            });
    };



    return (
        <>
            <meta charSet="UTF-8" />
            <title>We-Higher</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
            <meta name="description" content="" />
            <link rel="icon" href="/img/favicon.png" />
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                crossOrigin="anonymous"
            ></script>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700" />

            <div className="loginform">
                <body>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }} className={"mx-auto"}>
                        <div className="container px-4 py-5">
                            <div className="card card0">
                                <div className="d-flex flex-lg-row flex-column">
                                    <div className="card card1">
                                        <div className="row justify-content-center my-auto">
                                            <div className="col-md-8 col-9 my-5">
                                                <div className="row justify-content-center mb-3">
                                                    <img id="logo" src="/logo.png" className="img-fluid" alt="Logo" style={{ width: '100%', height: 'auto' }} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-control-label text-muted">username</label>
                                                    <input type="text" name="username" className="form-control" onChange={onChange} onKeyDown={onKeyDown} value={username} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-control-label text-muted">password</label>
                                                    <input type="password" name="password" className="form-control" onChange={onChange} onKeyDown={onKeyDown} value={password} />
                                                </div>
                                                <div className="row justify-content-center my-3 px-3">
                                                    <button onClick={login} className="btn btn-primary" style={{ marginTop: '20px' }}>로그인</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card card2" style={{ columnFill: 'auto' }}>
                                        <div className="my-auto mx-md-20 px-md-20 right">
                                            <h2 className="text-info">For the future of innovation together</h2>
                                            <a className="text-white">We will be partners for a better future with innovative IT solutions.</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
            </div>
        </>
    );
}