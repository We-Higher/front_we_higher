import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function DataroomEdit() {

    const token = sessionStorage.getItem("token");
    const n = useParams().num;
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
        axios.get('http://localhost:8081/auth/dataroom/edit/' + n, { headers: { Authorization: token } })
            .then(function (res) {
                if (res.status === 200) {
                    let d = res.data.dto;
                    setDto({
                        num: d.num,
                        wdate: d.wdate,
                        writer: d.member.name,
                        title: d.title,
                        content: d.content,
                        fname: d.fname,
                        cnt: d.cnt
                    })
                } else {
                    alert('error:' + res.status);
                }
            });
    }, []);

    const edit = () => {

        let fdata = new FormData();
        let file = document.getElementById('f');
        fdata.append('content', content);
        fdata.append('f', file.files[0]);
        axios.post('http://localhost:8081/auth/dataroom', fdata,
            { headers: { Authorization: token }, "Content-Type": "multipart/form-data" , params: { num:n, title:title, content:content }})
            .then(function (res) {
                if (res.status === 200) {
                    navigate('/dataroom/list')
                } else {
                    alert('error:' + res.status);
                }
            })
    }

    return (

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
                                {/* Assuming you are using React Router for navigation */}
                                {/* Replace your Thymeleaf syntax with the appropriate React Router link */}
                                <a
                                    className="form-control"
                                    href={`/dataroom/down?fname=${fname}&num=${dto.num}`}
                                >
                                    {fname}
                                </a>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}