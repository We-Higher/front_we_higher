import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BoardDetail() {
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
        axios.get('http://localhost:8081/auth/board/' + n, { headers: { Authorization: token } })
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
                <a href="/board/list" className="btn btn-secondary" style={{ fontSize: '13px' }}>
                    목록
                </a>
            </div>
            <p className="card-text" style={{ fontSize: '20px' }}>
                <strong>[자유게시판]</strong>
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
            <div className="comment-count">
                <strong>댓글 &nbsp;</strong>
                <span id="count">0</span>
            </div>

            <div className="comment-box" id="commentbox"></div>

            <span className="c-icon">
                <i className="fa-solid fa-user"></i>
                <div className="comment-name">
                    <span className="anonym">
                        작성자
                        <input
                            type="hidden"
                            className="form-control"
                            id="com_writer"
                            placeholder="이름"
                            name="com_writer"
                            value={writer}
                            readOnly
                            style={{ width: '250px', border: 'none' }}
                        />
                    </span>
                </div>
                {/* <img src="/익명.jpg" width="50px" alt="My Image" /> */}
            </span>
            <div className="mb-3 comment-sbox">
                <textarea
                    className="form-control comment-input"
                    id="com_content"
                    cols="80"
                    rows="2"
                    name="com_content"
                    placeholder="댓글을 입력하세요."
                ></textarea>
            </div>

            <div className="regBtn text-end">
                <button className="btn btn-primary mb-3" style={{ right: '10%' }} id="Comment_regist">
                    등 록
                </button>
            </div>
        </div>
    );
}