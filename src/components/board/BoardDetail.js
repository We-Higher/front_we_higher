import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_BASE_URL } from "../../common/util";

export default function BoardDetail() {
    const myPort = process.env.REACT_APP_MY_PORT;
    const token = sessionStorage.getItem("token");
    const [mdto, setDto2] = useState({});
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
        axios.get(`${API_BASE_URL}/auth/board/` + n, { headers: { Authorization: token } })
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

    useEffect(() => {
        axios.get(`${API_BASE_URL}/auth/mypage`, { headers: { Authorization: token } })
            .then(
                function (res) {
                    if (res.status === 200) {
                        if (res.data.flag) {
                            setDto2(res.data.mdto);
                        } else {
                            alert('검색안됨');
                        }
                    } else {
                        alert('error:' + res.status);
                    }
                }
            );
    }, []);

    const { num, writer, wdate, udate, title, content, cnt } = dto;
    const [comments, setComments] = useState([]);
    const [totalComments, setTotalComments] = useState(0);

    useEffect(() => {
        fetchData();
    }, [num]);

    const fetchData = async () => {
        const com_bno = document.querySelector('#bnum').value;
        axios.get(`${API_BASE_URL}/auth/reply/list/${com_bno}`, { headers: { Authorization: token } })
            .then(
                function (res) {
                    if (res.status === 200) {
                        const data = res.data;
                        if (data.total > 0) {
                            setTotalComments(data.total);
                            setComments(data.list);
                        } else {
                            setTotalComments(0);
                            setComments([]);
                        }
                    } else {
                        alert('error:' + res.status);
                    }
                }
            );
    };

    const handleDelete = (num) => {
        axios.post(`${API_BASE_URL}/auth/reply/del`,
            {},
            {
                headers: { Authorization: token },
                params: { num: num }
            }
        )
            .then(function (res) {
                if (res.status === 200) {
                    fetchData();
                } else {
                    alert(res.status);
                }
            });
            fetchData();
    }

    const handleCommentRegist = async () => {

        const com_bno = document.querySelector('#bnum').value;
        const com_writer = document.querySelector('#com_writer').value;
        const com_content = document.querySelector('#com_content').value;

        if (com_content === '') {
            alert('내용을 입력하세요');
            return;
        }

        axios.post(
            `${API_BASE_URL}/auth/reply/add`,
            [
                {
                    com_bno: com_bno,
                    com_writer: com_writer,
                    com_content: com_content,
                },
            ],
            {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            }
        )
            .then(function (res) {
                if (res.status === 200) {
                    document.querySelector('#com_writer').value = com_writer;
                    document.querySelector('#com_content').value = '';
                    fetchData();
                } else {
                    alert('error:' + res.status);
                }
            })
            .catch(function (error) {
                console.error('Axios Error:', error);
            });
    };

    return (
        <div className="container py-4">
            <div className="text-end mt-5">
                <Link to="/board/list" className="btn btn-secondary" style={{ fontSize: '13px' }}>
                    목록
                </Link>
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
            <div>
                <div className="comment-count">
                    <strong>댓글 &nbsp;</strong>
                    <span id="count">{totalComments}</span>
                </div>

                <div className="comment-box" id="commentbox">
                    {comments.map((comment) => (
                        <div key={comment.num} className="card mb-3">
                            <div className="card-body">
                                {comment.member.originFname === null ? (
                                    <img src="/default.png" alt="image" style={{ width: '40px', height: '40px', borderRadius: '100px', marginRight: '10px', marginBottom: '10px' }} />
                                ) : (
                                    <img src={`${API_BASE_URL}/image/${comment.member.originFname}`}
                                        style={{ width: '40px', height: '40px', borderRadius: '100px', marginRight: '10px', marginBottom: '10px' }}
                                        alt="image" />
                                )}
                                <span id="com_writer">
                                    <strong>{comment.member.name}</strong>
                                </span>
                                <br />
                                <span id="com-content">{comment.content}</span>

                                {comment.member.username === mdto.username && (
                                    <button
                                        className="delete"
                                        style={{
                                            cursor: 'pointer',
                                            position: 'absolute',
                                            border: 'none',
                                            backgroundColor: 'white',
                                            top: '10%',
                                            right: '1%',
                                        }}
                                        onClick={() => handleDelete(comment.num)}
                                    >
                                        <i className="bi bi-x-square" style={{ color: 'red' }}></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="comment-name">
                    <input
                        type="hidden"
                        className="form-control"
                        id="com_writer"
                        placeholder="이름"
                        name="com_writer"
                        defaultValue={mdto.name}
                        readOnly
                        style={{ width: '250px', border: 'none' }}
                    />
                </div>
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
                    <button onClick={handleCommentRegist} className="btn btn-primary mb-3" style={{ right: '10%' }} id="Comment_regist">
                        등 록
                    </button>
                </div>
            </div>
        </div>
    );
}