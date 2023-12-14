import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import '../../css/dataroom.css';

export default function Draft() {
    const token = sessionStorage.getItem("token");
    const loginid = sessionStorage.getItem("loginid");
    const myPort = process.env.REACT_APP_MY_PORT;
    const navigate = useNavigate();
    const [elist, setList1] = useState([]);
    const [rlist, setList2] = useState([]);
    const [vlist, setList3] = useState([]);
    const [mdto, setDto] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:${myPort}/auth/approval/draft`, { headers: { Authorization: token } })
            .then(
                function (res) {
                    if (res.status === 200) {
                        setList1(res.data.elist);
                        setList2(res.data.rlist);
                        setList3(res.data.vlist);
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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-danger">
                                <h4 className="card-title">기안된 결재문서</h4>
                            </div>
                            <div className="card-body">
                                <table id="kt_datatable_example_2" className="table table-striped table-row-bordered gy-5 gs-7">
                                    <thead>
                                        <tr className="fw-bold fs-6 text-gray-800">
                                            <th>문서종류</th>
                                            <th>기안자</th>
                                            <th>제목</th>
                                            <th>작성일</th>
                                            <th>결재여부</th>
                                        </tr>
                                    </thead>
                                    {<tbody>
                                        {elist.map((e) => (
                                            <tr key={e.expenseNum}>
                                                <td>지출결의서</td>
                                                <td>{e.member.name}</td>
                                                <td>
                                                    <a href={`/approval/expense/editread?expenseNum=${e.expenseNum}`}>{e.title}</a>
                                                </td>
                                                <td>{e.wdate}</td>
                                                <td>{e.rstatus === -1 ? '반려' : e.status >= 0 && e.status < 2 && e.rstatus === 0 ? '결재중' : e.status === 2 ? '결재완료' : ''}</td>
                                            </tr>
                                        ))}
                                        {rlist.map((r) => (
                                            <tr key={r.reportNum}>
                                                <td>품의서</td>
                                                <td>{r.member.name}</td>
                                                <td>
                                                    <a href={`/approval/report/editread?reportNum=${r.reportNum}`}>{r.title}</a>
                                                </td>
                                                <td>{r.wdate}</td>
                                                <td>{r.rstatus === -1 ? '반려' : r.status >= 0 && r.status < 2 && r.rstatus === 0 ? '결재중' : r.status === 2 && r.rstatus === 0 ? '결재완료' : ''}</td>
                                            </tr>
                                        ))}
                                        {vlist.map((v) => (
                                            <tr key={v.vacationNum}>
                                                <td>휴가신청서</td>
                                                <td>{v.member.name}</td>
                                                <td>
                                                    <a href={`/approval/vacation/editread?vacationNum=${v.vacationNum}`}>{v.member.name} 휴가신청</a>
                                                </td>
                                                <td>{v.wdate}</td>
                                                <td>{v.rstatus === -1 ? '반려' : v.status >= 0 && v.status < 2 && v.rstatus === 0 ? '결재중' : v.status === 2 ? '결재완료' : ''}</td>
                                            </tr>
                                        ))}
                                    </tbody>}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );

}
