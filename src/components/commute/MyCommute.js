import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import '../../css/dataroom.css';

export default function MyCommute() {
    const myPort = process.env.REACT_APP_MY_PORT;
    const token = sessionStorage.getItem("token");
    const loginid = sessionStorage.getItem("loginid");
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [mdto, setDto] = useState({});
    const { ismaster } = mdto;

    useEffect(() => {
        axios.get(`http://localhost:${myPort}/auth/commute/mycommute`, { headers: { Authorization: token } })
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

    /*const del = (num) => {
        axios.post('http://localhost:8081/auth/board/del',
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
                                    <h2 className="card-title">내 출퇴근 이력</h2>
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
                                                    <th>수정신청</th>
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
                                                        <td style={{ padding: '2px' }}>
                                                            <div className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px align-self-center"
                                                                data-kt-menu-trigger="click" data-kt-menu-attach="parent"
                                                                data-kt-menu-placement="bottom-end" data-kt-menu-flip="bottom">
                                                                <Link to={`/commute/edit/${e.num}`}><i className="bi bi-pencil"></i>
                                                                </Link>
                                                            </div>
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
    );

}
