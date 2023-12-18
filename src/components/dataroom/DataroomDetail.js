import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function DataroomDetail() {
    const myPort = process.env.REACT_APP_MY_PORT;
    const token = sessionStorage.getItem("token");
    const n = useParams().num;
    const navigate = useNavigate();

    const [dto, setDto] = useState({
        num: 0,
        wdate: null,
        writer: '',
        title: '',
        content: '',
        fname: '',
        cnt: 0
    });

    useEffect(() => {
        axios.get(`http://localhost:${myPort}/auth/dataroom/` + n, { headers: { Authorization: token } })
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
    }, [])


    const { num, writer, wdate, title, content, fname, cnt } = dto;

    const down = (fname, num) => {

            axios.post(`http://localhost:${myPort}/auth/dataroom/down`,
            {},
            {
                headers: { Authorization: token },
                responseType: 'blob',
                params: { fname: fname, num:num}
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

        <div className="container py-4">
            <div className="text-end mt-5">
                <Link to="/dataroom/list" className="btn btn-secondary" style={{ fontSize: '13px' }}>
                    목록
                </Link>
            </div>
            <p className="card-text" style={{ fontSize: '20px' }}>
                <strong>[자료실]</strong>
            </p>
            <div className="card mt-5 mb-3">
                <div className="card-header">
                    <h2 className="card-title" id="title">
                        {title}
                    </h2>
                </div>
                <div className="card-body">
                    <p
                        className="card-text"
                        id="content"
                        style={{
                            fontSize: '15px',
                            marginBottom: '50px',
                            whiteSpace: 'pre-line',
                        }}
                    >
                        {content}
                    </p>
                    <p className="card-text">
                        <div className="row">
                            <div className="col-md-3">
                                <span>첨부파일: </span>
                                <Link className="ml-3" style={{ display: 'inline-block', width: 'auto' }} onClick={() => down(fname, num)}>
                                    {fname}
                                </Link>
                            </div>
                        </div>
                        <small className="text-muted">게시자: </small>
                        <small className="text-muted" id="writer">
                            {writer}
                        </small>
                        <small className="text-muted"> | 게시일: </small>
                        <small className="text-muted" id="wdate">
                            {wdate}
                        </small>
                    </p>
                </div>
            </div>
        </div>
    );
}