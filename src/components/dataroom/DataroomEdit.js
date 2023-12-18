import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';

export default function DataroomEdit({ show, onHide, num }) {
    const myPort = process.env.REACT_APP_MY_PORT;
    const token = sessionStorage.getItem("token");
    const [dto, setDto] = useState({
        num: 0,
        wdate: null,
        writer: '',
        title: '',
        content: '',
        fname: '',
        cnt: 0
    });
    const navigate = useNavigate();
    const { writer, title, content, fname } = dto;

    const onChange = (e) => {
        const { name, value } = e.target;
        setDto({
            ...dto,
            [name]: value
        })
    }

    useEffect(() => {
        if (num) {
            axios.get(`http://localhost:${myPort}/auth/dataroom/edit/` + num, { headers: { Authorization: token } })
                .then(function (res) {
                    if (res.status === 200) {
                        let d = res.data.dto;
                        setDto((prevDto) => ({
                            ...prevDto,
                            num: d.num,
                            wdate: d.wdate,
                            writer: d.member.name,
                            title: d.title,
                            content: d.content,
                            fname: d.fname,
                            cnt: d.cnt
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

        let fdata = new FormData();
        let file = document.getElementById('f');
        fdata.append('f', file.files[0]);
        axios.post(`http://localhost:${myPort}/auth/dataroom`, fdata,
            { headers: { Authorization: token }, "Content-Type": "multipart/form-data", params: { num: num, title: title, content: content } })
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
        window.location.replace("/dataroom/list");
    }


    const down = (fname, num) => {

        axios.post(`http://localhost:${myPort}/auth/dataroom/down`,
            {},
            {
                headers: { Authorization: token },
                responseType: 'blob',
                params: { fname: fname, num: num }
            })
            .then(function (res) {
                if (res.status === 200) {
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', fname);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
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
                            <h3 className="fw-bolder m-0">자료 수정</h3>
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
                                        {writer}
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
                            <label className="col-lg-4 fw-bold text-muted">파일 수정 (New File)</label>
                            <div className="col-lg-8">
                                <span className="fw-bolder fs-6 text-dark">
                                    <div className="input-group input-group-sm mb-3">
                                        <input type="file" id="f" name="f" className="form-control" />
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="row mb-7">
                            <label className="col-lg-4 fw-bold text-muted">파 일 (File)</label>
                            <div className="col-lg-8">
                                <span className="fw-bolder fs-6 text-dark">
                                    <div className="input-group input-group-sm mb-3">
                                        <Link
                                            className="form-control"
                                            onClick={() => down(fname, dto.num)}
                                        >
                                            {fname}
                                        </Link>
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