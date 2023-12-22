import axios from 'axios'; 
import { useEffect, useState } from 'react'; 
import { Modal, Button } from 'react-bootstrap';
import { API_BASE_URL } from "../../common/util";
 
const ApprovalList2 = ({ show, onHide, onSelectEmployee }) => { 
    const myPort = process.env.REACT_APP_MY_PORT
    const token = sessionStorage.getItem("token"); 
    const [list, setList] = useState([]); 
    const [mdto, setDto] = useState({}); 
    const { ismaster } = mdto; 
    const [type, setType] = useState("none"); 
    const [option, setOption] = useState(""); 
 
    useEffect(() => { 
         
        axios.get(`${API_BASE_URL}/auth/employee/list`, { headers: { Authorization: token } })
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
                onHide();
              } 
    }, [])
    
    const search = (type, option) => {
        axios.get(`${API_BASE_URL}/auth/employee/search`,
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
 
    const [selectedEmployee2, setSelectedEmployee2] = useState(null); 
 
    const handleSelectEmployee2 = (employee) => { 
        setSelectedEmployee2(employee); 
        onSelectEmployee(employee); 
        onHide();
    }; 
   
    return ( 
        <Modal show={show} onHide={onHide} size="xl" centered>  
            <Modal.Body> 
                <div className="card-body"> 
                    <div className="table-responsive" style={{ textAlign: 'center' }}> 
                        <h2 className="mb-4">임직원 목록</h2> 
                        <div className="input-group mb-3" style={{ paddingLeft: '200px' }}>
                            <div className="input-group-prepend">
                                <select name="type" className="form-select form-select-sm" value={type} onChange={(e) => setType(e.target.value)} >
                                    <option value="none">전체</option>
                                    <option value="name">이름</option>
                                    <option value="newNo">사번</option>
                                    <option value="companyRankName">직급</option>
                                    <option value="deptName">부서</option>
                                </select>
                            </div>
                            <input type="text" name="option" className="form-control form-control-sm" value={option} onChange={(e) => setOption(e.target.value)}  />
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
                        <table className="table table-striped table-row-bordered gy-5 gs-7"> 
                            <thead> 
                                <tr className="fw-bold fs-6 text-gray-800"> 
                                    <th style={{ width: '150px' }}>이름</th> 
                                    <th style={{ width: '75px' }}>사번</th> 
                                    <th style={{ width: '200px' }}>부서</th> 
                                    <th style={{ width: '250px' }}>직급</th> 
                                    <th style={{ width: '180px' }}>선택</th> 
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
    ); 
} 
 
export default ApprovalList2; 
