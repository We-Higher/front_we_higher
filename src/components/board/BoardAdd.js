import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import { API_BASE_URL } from "../../common/util";

export default function BoardAdd({show, onHide}) {
    const myPort = process.env.REACT_APP_MY_PORT;
    const token = sessionStorage.getItem("token");
    const [dto, setDto] = useState({ writer: sessionStorage.getItem('loginid'), title: '', content: '' });
    const [mdto, setDto2] = useState({});
    const { writer, title, content } = dto;

    useEffect(() => {
        axios.get(`${API_BASE_URL}/auth/board/add`, { headers: { Authorization: token } })
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

        const title = document.querySelector('#title').value;
        const content = document.querySelector('#content').value;

        if (title === '') {
            alert('제목을 입력하세요');
            return;
        } else if (content === '') {
            alert('내용을 입력하세요');
            return;
        } 
        
        axios.post(`${API_BASE_URL}/auth/board`,
            {},
            { headers: { Authorization: token }, params: { title: title, content: content } })
            .then(function (res) {
                if (res.status === 200) {
                    onHide();
                    window.myFunction();
                } else {
                    alert('error:' + res.status);
                }
            })   
    }

    return (

        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Body>
                <div className="card mb-5 mb-xl-10">
                    <div className="card-header cursor-pointer">
                        <div className="card-title m-0">
                            <h3 className="fw-bolder m-0">게시글 작성</h3>
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
                            <label className="col-lg-4 fw-bold text-muted">제 목 (Title)</label>
                            <div className="col-lg-8">
                                <span className="fw-bolder fs-6 text-dark">
                                    <div className="input-group input-group-sm mb-3">
                                        <input type="text" id="title" name="title" className="form-control" onChange={onChange} />
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="row mb-7">
                            <label className="col-lg-4 fw-bold text-muted">내 용 (Content)</label>
                            <div className="col-lg-8">
                                <span className="fw-bolder fs-6 text-dark">
                                    <div className="input-group input-group-sm mb-3">
                                        <textarea rows="10" cols="30" id="content" name="content" className="form-control" onChange={onChange}></textarea>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )

}