import axios from 'axios'; 
import { useEffect, useState } from 'react'; 
import { Modal, Button } from 'react-bootstrap'; 
 
const ApprovalList2 = ({ show, onHide, onSelectEmployee }) => { 
    const myPort = process.env.REACT_APP_MY_PORT
    const token = sessionStorage.getItem("token"); 
    const [list, setList] = useState([]); 
    const [mdto, setDto] = useState({}); 
    const { ismaster } = mdto; 
    // const [type, setType] = useState("none"); 
    // const [option, setOption] = useState(""); 
 
    useEffect(() => { 
         
        axios.get(`http://localhost:${myPort}/auth/employee/list`, { headers: { Authorization: token } }) 
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
 
    const [selectedEmployee2, setSelectedEmployee2] = useState(null); 
 
    const handleSelectEmployee2 = (employee) => { 
        setSelectedEmployee2(employee); 
        onSelectEmployee(employee); 
        onHide();
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
    ); 
} 
 
export default ApprovalList2; 
