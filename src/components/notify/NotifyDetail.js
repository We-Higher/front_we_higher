import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function NotifyDetail() {
    const myPort = process.env.REACT_APP_MY_PORT;
    const token = sessionStorage.getItem("token");
    const n = useParams().num;

    const [dto, setDto] = useState({
        num: 0,
        wdate: null,
        udate: null,
        writer: '',
        title: '',
        content: '',
        cnt: 0
    });

    useEffect(() => {
        axios.get(`http://localhost:${myPort}/auth/notify/` + n, { headers: { Authorization: token } })
            .then(function (res) {
                if (res.status === 200) {
                    let d = res.data.dto;
                    setDto({
                        num: d.num,
                        wdate: d.wdate,
                        udate: d.udate,
                        writer: d.member.name,
                        title: d.title,
                        content: d.content,
                        cnt: d.cnt
                    })
                } else {
                    alert('error:' + res.status);
                }
            });
    }, []);

    const { num, writer, wdate, udate, title, content, cnt } = dto;

    return (
        <div className="container py-4">
            <div className="text-end mt-5">
                <Link to={`/notify/list`} className="btn btn-secondary" style={{ fontSize: '13px' }} >
                    목록
                </Link>
            </div>
            <p className="card-text" style={{ fontSize: '20px' }}>
                <strong>[공지사항]</strong>
            </p>
            <div className="card mt-5 mb-3">
                <div className="card-header">
                    <h2 className="card-title" id="title">
                        {title}<span className="badge badge-pro badge-light-danger fw-bold fs-9 px-2 py-1 ms-1">중 요!</span>
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
                        <small className="text-muted">게시자: </small>
                        <small className="text-muted" id="writer">
                            {writer}
                        </small>
                        <small className="text-muted"> | 게시일: </small>
                        <small className="text-muted" id="wdate">
                            {wdate}
                        </small>
                        <input type="hidden" id="bnum" name="bnum" value={num} />
                        <input
                            type="hidden"
                            id="mname"
                            name="mname"
                            value={writer}
                        />
                    </p>
                </div>
            </div>
        </div>
    );
}