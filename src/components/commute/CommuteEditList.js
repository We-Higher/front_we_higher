import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import '../../css/dataroom.css';
import { API_BASE_URL } from "../../common/util";

export default function CommuteEditList() {
    const myPort = process.env.REACT_APP_MY_PORT;
    const token = sessionStorage.getItem("token");
    const loginid = sessionStorage.getItem("loginid");
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [refresh, setRefresh] = useState(1);
    // const [mdto, setDto] = useState({});
    // const { ismaster } = mdto;

    useEffect(() => {
        axios.get(`${API_BASE_URL}/auth/commute/editlist`, { headers: { Authorization: token } })
            .then(
                function (res) {
                    if (res.status === 200) {
                        setList(res.data.list);
                        let m = res.data.mdto;
                        // setDto({
                        //     ismaster: m.isMaster
                        // })
                    } else {
                        alert('error:' + res.status);
                    }
                }
            );
    }, [refresh])

    const edit = (num) => {
        axios.post(`${API_BASE_URL}/auth/commute/approve`,
            {},
            {
                headers: { Authorization: token },
                params: { num: num }
            }
        )
            .then(function (res) {
                if (res.status === 200) {   
                     window.comref();
                } else {
                    alert(res.status);
                }
            });
    }

    const del = (num) => {
        axios.post(`${API_BASE_URL}/auth/commute/cancel`,
            {},
            {
                headers: { Authorization: token },
                params: { num: num }
            }
        )
            .then(function (res) {
                if (res.status === 200) {
                    window.comref();
                } else {
                    alert(res.status);
                }
            });
    }

    window.comref = () => {
        setRefresh(refresh => refresh * -1);
      };

    return (
        <div className="dataroom">
            <div className="main-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header card-header-danger">
                                    <h2 className="card-title">근태수정 요청목록</h2>
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
                                                    <th>수정내용</th>
                                                    <th>요청사유</th>
                                                    <th>승인 / 취소</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list.map((e) => (
                                                    <tr>
                                                        <td>{e.member.name}</td>
                                                        <td>{e.member.deptName}</td>
                                                        <td>{e.member.companyRankName}</td>
                                                        <td>{e.basicDate} → {e.editBasicDate}</td>
                                                        <td>[출근] {e.startTime}→ {e.editStartTime}<br />
                                                            [퇴근] {e.endTime} → {e.editEndTime}</td>
                                                        <td>{e.reason}</td>
                                                        <td>
                                                        <Link onClick={() => edit(e.num)}>
                                                            <i className="bi bi-check-lg" style={{ color: "blue" }} />
                                                        </Link>
                                                        &emsp; &emsp;
                                                        <Link onClick={() => del(e.num)}>
                                                            <i className="bi bi-x-octagon-fill" style={{ color: "red" }} />
                                                        </Link>
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
