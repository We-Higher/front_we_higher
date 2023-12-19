import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../css/dataroom.css';
import EmployeeEdit from './EmployeeEdit';
import EmployeeJoin from './EmployeeJoin';

export default function EmployeeList() {
    const myPort = process.env.REACT_APP_MY_PORT;
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [mdto, setDto] = useState({});
    const { ismaster } = mdto;
    const [type, setType] = useState("none");
    const [option, setOption] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [mode, setMode] = useState('list')

    useEffect(() => {
        if (mode === 'list') { 
            fetchData(currentPage); 
        } else if (mode === 'search') { 
            console.log(currentPage); 
            search(type, option, currentPage) 
        } 
    }, [currentPage]);

    const fetchData = (page) => {
        axios.get(`http://localhost:${myPort}/auth/employee?page=${page}`, { headers: { Authorization: token } })
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

    const search = (type, option, page) => {
        axios.get(`http://localhost:${myPort}/auth/employee/search?page=${page}`,
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

    const [showModal, setShowModal] = useState();
    const [showModal2, setShowModal2] = useState(false);

    const openModal = (username) => {
        // alert(username);
        setShowModal(true);
        setDto((prevDto) => ({
            ...prevDto,
            username: username
        }));
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

    // 회원가입 폼으로 이동
    const join = () => {
        navigate('/employee/join');
    }

    return (
        <div className="dataroom">
            <EmployeeEdit
                show={showModal}
                onHide={closeModal}
                username={mdto.username}
            />
            <EmployeeJoin
                show={showModal2}
                onHide={closeModal2}
            />
            <div className="main-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header card-header-danger">
                                    <h2 className="card-title">임직원 목록</h2>
                                    {ismaster === 1 && (
                                    <div className="card-header cursor-pointer d-flex justify-content-between align-items-center">                                     
                                            <Link onClick={() => openModal2()} ><i className="bi bi-person-plus-fill">회원가입</i></Link>
                                    </div>
                                     )}
                                    <div>
                                        <div className="input-group mb-3" style={{ paddingTop: '50px' }}>
                                            <div className="input-group-prepend">
                                                <select name="type" className="form-select form-select-sm" value={type} onChange={(e) => setType(e.target.value)} >
                                                    <option value="none">전체</option>
                                                    <option value="name">이름</option>
                                                    <option value="newNo">사번</option>
                                                    <option value="companyRankName">직급</option>
                                                    <option value="deptName">부서</option>
                                                </select>
                                            </div>
                                            <input type="text" name="option" className="form-control form-control-sm" value={option} onChange={(e) => setOption(e.target.value)} />
                                            <div className="input-group-append">
                                                <button
                                                    onClick={() => search(type, option,1)}
                                                    value="검색"
                                                    name="search"
                                                    className="btn btn-success btn-sm"
                                                    style={{ zIndex: 0 }}
                                                >
                                                    검색
                                                </button>
                                            </div>
                                        </div>
                                        <div class="menu menu-sub menu-sub-dropdown menu-column w-400px w-lg-500px e_box"
                                            data-kt-menu="true">
                                            <div class="card mb-5 mb-xl-8">
                                                <div class="card-header cursor-pointer">
                                                    <div class="card-title m-0">
                                                        <h3 class="fw-bolder m-0">회원가입</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table id="kt_datatable_example_2" className="table table-striped table-row-bordered gy-5 gs-7">
                                            <thead>
                                                <tr className="fw-bold fs-6 text-gray-800">
                                                    <th>사번</th>
                                                    <th>이름</th>
                                                    <th>직급</th>
                                                    <th>부서</th>
                                                    <th>휴대전화</th>
                                                    <th>이메일</th>
                                                    <th>내선전화</th>
                                                    {(ismaster === 1) && (
                                                    <th>수정</th>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list.map((e) => (
                                                    <tr key={e.newNo}>
                                                        <td>{e.newNo}</td>
                                                        <td>{e.name}</td>
                                                        <td>{e.companyRankName}</td>
                                                        <td>{e.deptName}</td>
                                                        <td>{e.phone}</td>
                                                        <td>{e.email}</td>
                                                        <td>{e.comCall}</td>
                                                        {(ismaster === 1) && (
                                                        <td style={{ padding: '2px' }}>
                                                            
                                                                <div className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px align-self-center"
                                                                    data-kt-menu-trigger="click" data-kt-menu-attach="parent"
                                                                    data-kt-menu-placement="bottom-end" data-kt-menu-flip="bottom">
                                                                    <i className="bi bi-pencil" onClick={() => openModal(e.username)}></i>
                                                                </div>
                                                          
                                                        </td>
                                                          )}
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
