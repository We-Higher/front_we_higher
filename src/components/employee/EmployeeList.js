import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import '../../css/dataroom.css';

export default function EmployeeList() {
    const token = sessionStorage.getItem("token");
    const loginid = sessionStorage.getItem("loginid");
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [mdto, setDto] = useState({});
    const { ismaster } = mdto;
    const [type, setType] = useState("none"); 
    const [option, setOption] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8081/auth/employee/list', { headers: { Authorization: token } })
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
        axios.get('http://localhost:8081/auth/employee/search',
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

    return (

        <div className="dataroom">
            <div className="main-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header card-header-danger">
                                    <h2 className="card-title">임직원 목록</h2>
                                    <div className="card-header cursor-pointer d-flex justify-content-between align-items-center">
                                        <div className="btn btn-icon btn-active-light-primary w-60px h-60px w-md-60px h-md-60px align-self-center"
                                            data-kt-menu-trigger="click" data-kt-menu-attach="parent"
                                            data-kt-menu-placement="bottom-end" data-kt-menu-flip="bottom">
                                            <a href='/employee/join'><i className="bi bi-person-plus-fill">회원가입</i></a>
                                        </div>
                                        <div className="input-group mb-3" style={{ paddingTop: '50px' }}>
                                            <div className="input-group-prepend">
                                                <select
                                                    name="type"
                                                    className="form-select form-select-sm"
                                                    value={type}
                                                    onChange={(e) => setType(e.target.value)}
                                                >
                                                    <option value="none">전체</option>
                                                    <option value="name">이름</option>
                                                    <option value="newNo">사번</option>
                                                    <option value="companyRankName">직급</option>
                                                    <option value="deptName">부서</option>
                                                </select>
                                            </div>
                                            <input
                                                type="text"
                                                name="option"
                                                className="form-control form-control-sm"
                                                value={option}
                                                onChange={(e) => setOption(e.target.value)}
                                            />
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
                                                    <th>수정</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list.map((e) => (
                                                    <tr>
                                                        <td>{e.newNo}</td>
                                                        <td>{e.name}</td>
                                                        <td>{e.companyRankName}</td>
                                                        <td>{e.deptName}</td>
                                                        <td>{e.phone}</td>
                                                        <td>{e.email}</td>
                                                        <td>{e.comCall}</td>
                                                        <td style={{ padding: '2px' }}>
                                                            {(ismaster === 1) && (
                                                                <div className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px align-self-center"
                                                                    data-kt-menu-trigger="click" data-kt-menu-attach="parent"
                                                                    data-kt-menu-placement="bottom-end" data-kt-menu-flip="bottom">
                                                                    <a href={`/employee/edit/${e.num}`}><i className="bi bi-pencil"></i>
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
    );
}
