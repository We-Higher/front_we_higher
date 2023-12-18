import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function BoardAdd() {
    const myPort = process.env.REACT_APP_MY_PORT;
    const token = sessionStorage.getItem("token");
    const [dto, setDto] = useState({ writer: sessionStorage.getItem('loginid'), content: '' });
    const [mdto, setDto2] = useState({});
    const navigate = useNavigate();
    const { writer, content, f } = dto;

    useEffect(() => {
        axios.get(`http://localhost:${myPort}/auth/dataroom/add`, { headers: { Authorization: token } })
            .then(function (res) {
                if (res.status === 200) {
                    setDto2(res.data.mdto);
                } else {
                    alert('error:' + res.status);
                }
            });
        return () => {
        };
    }, []);

    const onChange = (e) => {
        const { name, value } = e.target;
        setDto({
            ...dto,
            [name]: value
        })
    }

    const save = () => {

        let fdata = new FormData();
        let file = document.getElementById('f');
        fdata.append('content', content);
        fdata.append('f', file.files[0]);
        
        axios.post(`http://localhost:${myPort}/auth/dataroom`, fdata,
            { headers: { Authorization: token }, "Content-Type": "multipart/form-data" })
            .then(function (res) {
                if (res.status === 200) {
                    navigate('/dataroom/list')
                } else {
                    alert('error:' + res.status);
                }
            })
            .catch(error => {
                alert('파일을 선택해야합니다.');
            });
    }
    return (

        <div className="card mb-5 mb-xl-10">
            <div className="card-header cursor-pointer">
                <div className="card-title m-0">
                    <h3 className="fw-bolder m-0">자료 올리기</h3>
                </div>
                <button onClick={save} className="btn btn-primary align-self-center">
                    작 성
                </button>
            </div>
            <div className="card-body p-9">
                <div className="row mb-7">
                    <label className="col-lg-4 fw-bold text-muted">작성자 (Writer)</label>
                    <div className="col-lg-8">
                        <span className="fw-bolder fs-6 text-dark">
                            <div className="input-group input-group-sm mb-3">
                                {mdto.name}
                            </div>
                        </span>
                    </div>
                </div>
                <div className="row mb-7">
                    <label className="col-lg-4 fw-bold text-muted">작성일 (Date)</label>
                    <div className="col-lg-8">
                        <span className="fw-bolder fs-6 text-dark">
                            <div className="input-group input-group-sm mb-3">
                                {new Date().toLocaleDateString()}
                            </div>
                        </span>
                    </div>
                </div>
                <div className="row mb-7">
                    <label className="col-lg-4 fw-bold text-muted">내 용 (Content)</label>
                    <div className="col-lg-8">
                        <span className="fw-bolder fs-6 text-dark">
                            <div className="input-group input-group-sm mb-3">
                                <textarea rows="10" cols="30" name="content" className="form-control" value={content} onChange={onChange}></textarea>
                            </div>
                        </span>
                    </div>
                </div>
                <div className="row mb-7">
                    <label className="col-lg-4 fw-bold text-muted">파 일 (File)</label>
                    <div className="col-lg-8">
                        <span className="fw-bolder fs-6 text-dark">
                            <div className="input-group input-group-sm mb-3">
                                <input type="file" name="f" id="f"
                                    className="form-control" value={f} onChange={onChange} />
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}