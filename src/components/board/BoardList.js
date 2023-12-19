import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import '../../css/dataroom.css';
import BoardEdit from './BoardEdit';
import BoardAdd from './BoardAdd';

const BoardList = () => {
    const myPort = process.env.REACT_APP_MY_PORT;
    const token = sessionStorage.getItem("token");
    const [list, setList] = useState([]);
    const [mdto, setDto] = useState({});
    const [dto, setDto2] = useState({});
    const { ismaster } = mdto;
    const [type, setType] = useState("none");
    const [option, setOption] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const loginid = sessionStorage.getItem("loginid");
    const [mode, setMode] = useState('list')
    const navigate = useNavigate();
    useEffect(() => {
        if (mode === 'list') {
            fetchData(currentPage);
        } else if (mode === 'search') {
            console.log(currentPage);
            search(type, option, currentPage)
        }
    }, [currentPage]); // 현재 페이지가 변경될 때 효과 발생 



    const fetchData = (page) => {
        axios.get(`http://localhost:${myPort}/auth/board?page=${page}`, { headers: { Authorization: token } })
            .then((res) => {
                if (res.status === 200) {
                    setList(res.data.list);
                    setDto({
                        ismaster: res.data.mdto.isMaster
                    });
                    setHasNextPage(res.data.hasNext);
                    setHasPreviousPage(res.data.hasPrevious);
                    setTotalPages(res.data.totalPages);
                } else {
                    alert('에러: ' + res.status);
                }
            })
            .catch((error) => {
                console.error('데이터 가져오기 오류:', error);
            });
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const del = (num) => {
        axios.post(`http://localhost:${myPort}/auth/board/del`,
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

    const search = (type, option, page) => {
        axios.get(`http://localhost:${myPort}/auth/board/search?page=${page}`,
            { headers: { Authorization: token }, params: { type: type, option: option } })
            .then(
                function (res) {
                    if (res.status === 200) {
                        setMode('search')
                        setList(res.data.list);
                        setCurrentPage(page)
                        setHasNextPage(res.data.hasNext);
                        setHasPreviousPage(res.data.hasPrevious);
                        setTotalPages(res.data.totalPages);
                    } else {
                        alert('error:' + res.status);
                    }
                }
            );
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
            <BoardAdd show={showModal2}
                onHide={closeModal2}
            />
            <BoardEdit show={showModal}
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
                                        <h2 className="card-title">자유게시판</h2>
                                        <div className="card-header cursor-pointer d-flex justify-content-between align-items-center">
                                            <Link onClick={() => openModal2()} ><i className="bi bi-person-plus-fill">글 작성</i></Link>
                                        </div>
                                        <div>
                                            <div className="input-group mb-3" style={{ paddingTop: '50px' }}>
                                                <div className="input-group-prepend">
                                                    <select name="type" className="form-select form-select-sm" value={type} onChange={(e) => setType(e.target.value)} >
                                                        <option value="none">전체</option>
                                                        <option value="name">이름</option>
                                                        <option value="title">제목</option>
                                                    </select>
                                                </div>
                                                <input type="text" name="option" className="form-control form-control-sm" value={option} onChange={(e) => setOption(e.target.value)} />
                                                <div className="input-group-append">
                                                    <button
                                                        onClick={() => search(type, option, 1)}
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
                                                        <th>글번호</th>
                                                        <th>이름</th>
                                                        <th>직급</th>
                                                        <th>제목</th>
                                                        <th>작성일</th>
                                                        <th>수정일</th>
                                                        <th>조회수</th>
                                                        <th>수정</th>
                                                        <th>삭제</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {list.map((b) => (
                                                        <tr>
                                                            <td>{b.num}</td>
                                                            <td>{b.member.name}</td>
                                                            <td>{b.member.companyRankName}</td>
                                                            <td>
                                                                <Link to={`/board/detail/${b.num}`} className="link">
                                                                    {b.title}
                                                                </Link>
                                                            </td>
                                                            <td>{b.wdate}</td>
                                                            <td>{b.udate}</td>
                                                            <td>{b.cnt}</td>
                                                            <td style={{ padding: '2px' }}>
                                                                {(loginid === b.member.username || ismaster === 1) && (
                                                                    <div className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px align-self-center"
                                                                        data-kt-menu-trigger="click" data-kt-menu-attach="parent"
                                                                        data-kt-menu-placement="bottom-end" data-kt-menu-flip="bottom">
                                                                        <Link onClick={() => openModal(b.num)}>
                                                                            <i className="bi bi-pencil"></i>
                                                                        </Link>
                                                                    </div>
                                                                )}
                                                            </td>
                                                            <td style={{ padding: '2px' }}>
                                                                {(loginid === b.member.username || ismaster === 1) && (
                                                                    <div className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px align-self-center"
                                                                        data-kt-menu-trigger="click" data-kt-menu-attach="parent"
                                                                        data-kt-menu-placement="bottom-end" data-kt-menu-flip="bottom">
                                                                        <Link onClick={() => del(b.num)}><i className="bi bi-trash-fill del"></i>
                                                                        </Link>
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
            </div>
            <div className="card-footer d-flex justify-content-center py-4">
                <nav aria-label="...">
                    <ul className="pagination">
                        <li className={`page-item ${hasPreviousPage ? '' : 'disabled'}`}>
                            <button className="page-link" tabIndex="-1" onClick={() => setCurrentPage(currentPage - 1)}>
                                이전
                            </button>
                        </li>
                        {[...Array(totalPages)].map((_, index) => {
                            const page = index + 1;
                            const isCurrentPage = page === currentPage;
                            return (
                                <li key={page} className={`page-item ${isCurrentPage ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(page)}>
                                        {page}
                                    </button>
                                </li>
                            );
                        })}
                        <li className={`page-item ${hasNextPage ? '' : 'disabled'}`}>
                            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                                다음
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}


export default BoardList;
