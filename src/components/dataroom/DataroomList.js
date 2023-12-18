import axios from 'axios';
import { useEffect, useState } from 'react';
import '../../css/dataroom.css';
import { Link } from 'react-router-dom';

export default function BoardList() {
    const myPort = process.env.REACT_APP_MY_PORT;
    const token = sessionStorage.getItem("token");
    const [list, setList] = useState([]);
    const [mdto, setDto] = useState({});
    const [type, setType] = useState("none");
    const [option, setOption] = useState("");
    const { ismaster } = mdto;
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]); // 현재 페이지가 변경될 때 효과 발생 

    const fetchData = (page) => {
        axios.get(`http://localhost:${myPort}/auth/dataroom?page=${page}`, { headers: { Authorization: token } })
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

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

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
    };

    return (
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
                                            <Link to={`/dataroom/add`}><i className="bi bi-person-plus-fill">자료 올리기</i></Link>
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
                                                    {mdto.ismaster === 1 && (
                                                        <>
                                                            <th>수정</th>
                                                            <th>삭제</th>
                                                        </>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list.map((d) => (
                                                    <tr key={d.num}>
                                                        <td>{d.num}</td>
                                                        <td>
                                                            <Link to={`/dataroom/detail/${d.num}`} className="link">{d.title}</Link>
                                                        </td>
                                                        <td>{d.member.name}</td>
                                                        <td>{d.title}</td>
                                                        <td>{d.wdate}</td>
                                                        <td>{d.cnt}</td>
                                                        <td style={{ padding: '2px' }}>
                                                            {(mdto.ismaster === 1) && (
                                                                <div className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px align-self-center"
                                                                    data-kt-menu-trigger="click" data-kt-menu-attach="parent"
                                                                    data-kt-menu-placement="bottom-end" data-kt-menu-flip="bottom">
                                                                    <Link to={`/dataroom/edit/${d.num}`}><i className="bi bi-pencil"></i></Link>
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td style={{ padding: '2px' }}>
                                                            {(mdto.ismaster === 1) && (
                                                                <div className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px align-self-center"
                                                                    data-kt-menu-trigger="click" data-kt-menu-attach="parent"
                                                                    data-kt-menu-placement="bottom-end" data-kt-menu-flip="bottom">
                                                                    <a onClick={() => del(d.num)}><i className="bi bi-trash-fill del"></i></a>
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
            <div className="card-footer d-flex justify-content-center py-4">
                <nav aria-label="...">
                    <ul className="pagination">
                        <li className={`page-item ${hasPreviousPage ? '' : 'disabled'}`}>
                            <button className="page-link" tabIndex="-1" onClick={() => handlePageChange(currentPage - 1)}>
                                이전
                            </button>
                        </li>
                        {[...Array(totalPages)].map((_, index) => {
                            const page = index + 1;
                            const isCurrentPage = page === currentPage;
                            return (
                                <li key={page} className={`page-item ${isCurrentPage ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(page)}>
                                        {page}
                                    </button>
                                </li>
                            );
                        })}
                        <li className={`page-item ${hasNextPage ? '' : 'disabled'}`}>
                            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                                다음
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
} 
