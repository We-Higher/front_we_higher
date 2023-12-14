import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import ReactDOM from 'react-dom';
import Report from './Report';
import { Modal, Button } from 'react-bootstrap';

const ApprovalList2 = ({ show, onHide, employeeData, onSelectEmployee }) => {

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

            if (selectedEmployee2) {
                onSelectEmployee(selectedEmployee2);
                onHide(); // Close the modal
              }
    }, [])

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

    const [selectedEmployee2, setSelectedEmployee2] = useState(null);

    const handleSelectEmployee2 = (employee) => {
        setSelectedEmployee2(employee);
        onSelectEmployee(employee);
        onHide(); // Close the modal
    };
  
    return (

        <Modal show={show} onHide={onHide} size="lg" centered> 
 
            <Modal.Body>
                <div className="card-body">
                    <div className="table-responsive" style={{ textAlign: 'center' }}>
                        <h2 className="mb-4">임직원 목록</h2>
                        <table className="table table-striped table-row-bordered gy-5 gs-7">
                            <thead>
                                <tr className="fw-bold fs-6 text-gray-800">
                                    <th style={{ width: '75px' }}>이름</th>
                                    <th style={{ width: '75px' }}>사번</th>
                                    <th style={{ width: '210px' }}>부서</th>
                                    <th style={{ width: '100px' }}>직급</th>
                                    <th style={{ width: '50px' }}>선택</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((e, index) => (
                                    <tr key={index} className="fw-bold fs-6 text-gray-800">
                                        <td className="ename">{e.name}</td>
                                        <td>{e.newNo}</td>
                                        <td>{e.deptName}</td>
                                        <td className="erankname">{e.companyRankName}</td>
                                        <td style={{ display: 'none' }} className="eusername">
                                            {e.username}
                                        </td>
                                        <td>
                                            <Button onClick={() => handleSelectEmployee2(e)}>선택</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
        /*<div className="ApprovalList">
            <div className="card-body">
                <div className="table-responsive" style={{ textAlign: 'center' }}>
                    <h2 className="mb-4">임직원 목록</h2>
                    <table className="table table-striped table-row-bordered gy-5 gs-7">
                        <thead>
                            <tr className="fw-bold fs-6 text-gray-800">
                                <th style={{ width: '75px' }}>이름</th>
                                <th style={{ width: '75px' }}>사번</th>
                                <th style={{ width: '210px' }}>부서</th>
                                <th style={{ width: '100px' }}>직급</th>
                                <th style={{ width: '50px' }}>선택</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((e, index) => (
                                <tr key={index} className="fw-bold fs-6 text-gray-800">
                                    <td className="ename">{e.name}</td>
                                    <td>{e.newNo}</td>
                                    <td>{e.deptName}</td>
                                    <td className="erankname">{e.companyRankName}</td>
                                    <td style={{ display: 'none' }} className="eusername">
                                        {e.username}
                                    </td>
                                    <td>
                                        <button onClick={handleSubmit}>선택</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>*/
    );
}

export default ApprovalList2;
