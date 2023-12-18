import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import '../../css/dataroom.css';
import DataroomEdit from './DataroomEdit';
import DataroomAdd from './DataroomAdd';

export default function BoardList() {
    const myPort = process.env.REACT_APP_MY_PORT;
    const token = sessionStorage.getItem("token");
    const loginid = sessionStorage.getItem("loginid");
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [mdto, setDto] = useState({});
    const [dto, setDto2] = useState({});
    const [type, setType] = useState("none");
    const [option, setOption] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const { ismaster } = mdto;

    useEffect(() => {
        axios.get(`http://localhost:${myPort}/auth/dataroom`, { headers: { Authorization: token } })
            .then(
                function (res) {
                    if (res.status === 200) {
                        setList(res.data.list);
                        let m = res.data.mdto;
                        setDto({
                            ismaster: m.isMaster
                        })
                    } else {
                        alert('error:' + res.status);
                    }
                }
            );
    }, [])

    const search = (type, option) => {
        axios.get(`http://localhost:${myPort}/auth/dataroom/search`,
            { headers: { Authorization: token }, params: { type: type, option: option } })
            .then(
                function (res) {
                    if (res.status === 200) {
                        setList(res.data.list);
                    } else {
                        alert('error:' + res.status);
                    }
                }
            );
    }

    const del = (num) => {
        axios.post(`http://localhost:${myPort}/auth/dataroom/del`,
            {},
            {
                headers: { Authorization: token },
                params: { num: num }
            }
        )
            .then(function (res) {
                if (res.status === 200) {
                    setList(res.data.list);
                } else {
                    alert(res.status);
                }
            });
    }

    const openModal = (num) => {
        setDto2((prevDto) => ({
            ...prevDto,
            num: num
        }));
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const openModal2 = () => {
        setShowModal2(true);
    };

    const closeModal2 = () => {
        setShowModal2(false);
    };

    return (
        <div>
            <DataroomAdd show={showModal2}
                onHide={closeModal2}
            />
            <DataroomEdit show={showModal}
                onHide={closeModal}
                num={dto.num}
            />

            <div className="dataroom">
                <div className="main-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header card-header-danger">
                                        <h2 className="card-title">자료실</h2>
                                        <div className="card-header cursor-pointer d-flex justify-content-between align-items-center">
                                            {ismaster === 1 && (
                                                <Link onClick={() => openModal2()} ><i className="bi bi-person-plus-fill">자료 올리기</i></Link>
                                            )}
                                        </div>
                                        <div>
                                            <div className="input-group mb-3" style={{ paddingTop: '50px' }}>
                                                <div className="input-group-prepend">
                                                    <select name="type" className="form-select form-select-sm" value={type} onChange={(e) => setType(e.target.value)} >
                                                        <option value="none">전체</option>
                                                        <option value="name">작성자</option>
                                                        <option value="title">제목</option>
                                                    </select>
                                                </div>
                                                <input type="text" name="option" className="form-control form-control-sm" value={option} onChange={(e) => setOption(e.target.value)} />
                                                <div className="input-group-append">
                                                    <button
                                                        onClick={() => search(type, option)}
                                                        value="검색"
                                                        name="search"
                                                        className="btn btn-success btn-sm"
                                                        style={{ zIndex: 0 }}
                                                    >
                                                        검색
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table id="kt_datatable_example_2" className="table table-striped table-row-bordered gy-5 gs-7">
                                                <thead>
                                                    <tr className="fw-bold fs-6 text-gray-800">
                                                        <th>번호</th>
                                                        <th>제목</th>
                                                        <th>작성자</th>
                                                        <th>제목</th>
                                                        <th>등록일</th>
                                                        <th>다운로드수</th>
                                                        {ismaster === 1 && (
                                                            <>
                                                                <th>수정</th>
                                                                <th>삭제</th>
                                                            </>
                                                        )}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {list.map((d) => (
                                                        <tr>
                                                            <td>{d.num}</td>
                                                            <td>
                                                                <Link to={`/dataroom/detail/${d.num}`} className="link">{d.title}</Link>
                                                            </td>
                                                            <td>{d.member.name}</td>
                                                            <td>{d.title}</td>
                                                            <td>{d.wdate}</td>
                                                            <td>{d.cnt}</td>
                                                            <td style={{ padding: '2px' }}>
                                                                {(ismaster === 1) && (
                                                                    <div className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px align-self-center"
                                                                        data-kt-menu-trigger="click" data-kt-menu-attach="parent"
                                                                        data-kt-menu-placement="bottom-end" data-kt-menu-flip="bottom">
                                                                        <Link onClick={() => openModal(d.num)}><i className="bi bi-pencil"></i></Link>
                                                                    </div>
                                                                )}
                                                            </td>
                                                            <td style={{ padding: '2px' }}>
                                                                {(ismaster === 1) && (
                                                                    <div className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px align-self-center"
                                                                        data-kt-menu-trigger="click" data-kt-menu-attach="parent"
                                                                        data-kt-menu-placement="bottom-end" data-kt-menu-flip="bottom">
                                                                        <a onClick={() => del(d.num)}><i className="bi bi-trash-fill del"></i>
                                                                        </a>
                                                                    </div>

                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    );

}
