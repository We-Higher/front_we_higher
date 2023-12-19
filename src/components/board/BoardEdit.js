import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';

const BoardEdit = ({ show, onHide, num }) => {
    const myPort = process.env.REACT_APP_MY_PORT;
    const token = sessionStorage.getItem("token");
    const [dto, setDto] = useState({
        num: 0,
        wdate: null,
        udate: null,
        writer: '',
        title: '',
        content: '',
        cnt: 0
    });
    const navigate = useNavigate();
    const { writer, title, content } = dto;

    const onChange = (e) => {
        const { name, value } = e.target;
        setDto({
            ...dto,
            [name]: value
        })
    }

    useEffect(() => {
        if (num) {
            axios.get(`http://localhost:${myPort}/auth/board/edit/` + num, { headers: { Authorization: token } })
                .then(function (res) {
                    if (res.status === 200) {
                        let b = res.data.dto;
                        setDto((prevDto) => ({
                            ...prevDto,
                            num: b.num,
                            wdate: b.wdate,
                            udate: b.udate,
                            writer: b.member.name,
                            title: b.title,
                            content: b.content,
                            cnt: b.cnt
                        }));
                    } else {
                        alert('error:' + res.status);
                    }
                })
                .catch(function () {
                    alert('사용자 데이터를 가져오는 중 오류가 발생했습니다.');
                });
        }
    }, [num]);

    const edit = () => {
        axios.put(`http://localhost:${myPort}/auth/board/edit`,
            {},
            { headers: { Authorization: token }, params: { num: num, title: title, content: content } })
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
                            <h3 className="fw-bolder m-0">게시글 수정</h3>
                        </div>
                        <button onClick={edit} className="btn btn-primary align-self-center">
                            수 정
                        </button>
                    </div>
                    <div className="card-body p-9">
                        <div className="row mb-7">
                            <label className="col-lg-4 fw-bold text-muted">작성자 (Writer)</label>
                            <div className="col-lg-8">
                                <span className="fw-bolder fs-6 text-dark">
                                    <div className="input-group input-group-sm mb-3">
                                        {dto.writer}
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
                                        <input type="text" name="title" className="form-control" value={dto.title} onChange={onChange} />
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="row mb-7">
                            <label className="col-lg-4 fw-bold text-muted">내 용 (Content)</label>
                            <div className="col-lg-8">
                                <span className="fw-bolder fs-6 text-dark">
                                    <div className="input-group input-group-sm mb-3">
                                        <textarea rows="10" cols="30" name="content" className="form-control" value={dto.content} onChange={onChange}></textarea>
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

export default BoardEdit;