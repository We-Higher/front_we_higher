import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import '../../css/dataroom.css';
import { API_BASE_URL } from "../../common/util";

export default function CommuteList() {
    const myPort = process.env.REACT_APP_MY_PORT;
    const token = sessionStorage.getItem("token");
    const loginid = sessionStorage.getItem("loginid");
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [mdto, setDto] = useState({});
    const { ismaster } = mdto;
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]); // 현재 페이지가 변경될 때 효과 발생 


    const fetchData = (page) => {
        axios.get(`${API_BASE_URL}/auth/commute?page=${page}`, { headers: { Authorization: token } })
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
    /*const del = (num) => {
        axios.post(`${API_BASE_URL}/auth/board/del`,
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
    }*/

    return (
        <div className="dataroom">
            <div className="main-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header card-header-danger">
                                    <h2 className="card-title">근태관리</h2>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table id="kt_datatable_example_2" className="table table-striped table-row-bordered gy-5 gs-7">
                                            <thead>
                                                <tr className="fw-bold fs-6 text-gray-800">
                                                    <th>이름</th>
                                                    <th>부서</th>
                                                    <th>직급</th>
                                                    <th>기준일</th>
                                                    <th>출근시간</th>
                                                    <th>퇴근시간</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list.map((e) => (
                                                    <tr>
                                                        <td>{e.member.name}</td>
                                                        <td>{e.member.deptName}</td>
                                                        <td>{e.member.companyRankName}</td>
                                                        <td>{e.basicDate}</td>
                                                        <td>{e.startTime}</td>
                                                        <td>{e.endTime}</td>
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