import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

export default function ApprovalList1() {
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

    const selectEmployee = (name, rankname, username) => {
        alert('Selected employee:', name, rankname, username);
    };

    /*const search = (type, option) => {
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
    }*/

    return (

        <div className="ApprovalList">
            <div className="card-body">
                <div className="table-responsive" style={{ textAlign: 'center' }}>
                    <h2 className="mb-4">임직원 목록</h2>
                    <table className="table table-striped table-row-bordered gy-5 gs-7">
                        <thead>
                            <tr className="fw-bold fs-6 text-gray-800">
                                <th style={{ width: 75 }}>이름</th>
                                <th style={{ width: 75 }}>사번</th>
                                <th style={{ width: 210 }}>부서</th>
                                <th style={{ width: 100 }}>직급</th>
                                <th style={{ width: 50 }}>선택</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((e) => (
                                <tr key={e.newNo} className="fw-bold fs-6 text-gray-800">
                                    <td className="ename">{e.name}</td>
                                    <td>{e.newNo}</td>
                                    <td>{e.deptName}</td>
                                    <td className="erankname">{e.companyRankName}</td>
                                    <td style={{ display: 'none' }} className="eusername">{e.username}</td>
                                    <td>
                                        <button onClick={() => selectEmployee(e.name, e.companyRankName, e.username)}>선택</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
