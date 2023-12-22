import axios from 'axios';
import { useState } from 'react';
import '../../css/dataroom.css';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { API_BASE_URL } from "../../common/util";

export default function EmployeeJoin({ show, onHide }) {
    const myPort = process.env.REACT_APP_MY_PORT;
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();
    const [dto, setDto] = useState({ username: '', pwd: '', name: '', email: '', phone: '', address: '', companyName: 'We-Higher', deptCode: '0', companyRank: '0', newNo: '', comCall: '', isMaster: '0', status: '' });
    const { username, pwd, name, email, phone, address, companyName, deptCode, companyRank, newNo, comCall, isMaster, status } = dto;
    const onChange = (e) => {
        const { name, value } = e.target;
        setDto({
            ...dto,
            [name]: value
        })
    }

    const save = () => {
        axios.post(`${API_BASE_URL}/join`,
            {
                username: username,
                pwd: pwd,
                name: name,
                email: email,
                phone: phone,
                address: address,
                companyName: companyName,
                deptCode: deptCode,
                companyRank: companyRank,
                newNo: newNo,
                comCall: comCall,
                isMaster: isMaster,
                status: status
            },
            {
                headers: { Authorization: token }
            }
        )
            .then(function (res) {
                if (res.status === 200) {
                    onHide();
                    window.myFunction3();
                } else {
                    alert('error:' + res.status);
                }
            })
            .catch(function (error) {
                alert('회원가입 실패');
            });

    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Body>
                <div className="card mb-5 mb-xl-10">
                    <div className="card-header cursor-pointer">
                        <div className="card-title m-0">
                            <h3 className="fw-bolder m-0">회원가입</h3>
                        </div>
                        <button onClick={save} className="btn btn-primary align-self-center">
                            작 성
                        </button>
                    </div>
                    <div className="card-body p-9">
                        <div className="row mb-5">
                            <label className="col-lg-4 fw-bold text-muted">아이디 (Username)</label>
                            <div className="col-lg-8">
                                <span className="fw-bolder fs-6 text-dark">
                                    <div className="input-group input-group-sm mb-3">
                                        <input type="text" name="username" className="form-control" placeholder="아이디를 입력해주세요." onChange={onChange} value={username} />
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <label className="col-lg-4 fw-bold text-muted">패스워드 (Password)</label>
                            <div className="col-lg-8">
                                <span className="fw-bolder fs-6 text-dark">
                                    <div className="input-group input-group-sm mb-3">
                                        <input type="password" name="pwd" className="form-control" placeholder="패스워드를 입력해주세요." onChange={onChange} value={pwd} />
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <label className="col-lg-4 fw-bold text-muted">이 름 (Full Name)</label>
                            <div className="col-lg-8">
                                <span className="fw-bolder fs-6 text-dark">
                                    <div className="input-group input-group-sm mb-3">
                                        <input type="text" name="name" className="form-control" placeholder="이름을 입력해주세요." onChange={onChange} value={name} />
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <label className="col-lg-4 fw-bold text-muted">회사명 (Username)</label>
                            <div className="col-lg-8">
                                <span className="fw-bolder fs-6 text-dark">
                                    <div className="input-group input-group-sm mb-3">
                                        <input type="text" name="companyName" defaultValue="We-Higher" className="form-control" readOnly onChange={onChange} />
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <label className="col-lg-4 fw-bold text-muted">부 서 (Department)</label>
                            <div className="col-lg-8 fv-row">
                                <span className="fw-bold fs-6">
                                    <div className="input-group input-group-sm mb-3">
                                        <select className="form-select form-select-sm form-select-solid" name="deptCode" onChange={onChange} value={deptCode}>
                                            <option selected="selected" value={0} onSelect={onChange}>총무팀</option>
                                            <option value={1} onSelect={onChange}>인사팀</option>
                                            <option value={2} onSelect={onChange}>법무팀</option>
                                            <option value={3} onSelect={onChange}>마케팅팀</option>
                                            <option value={4} onSelect={onChange}>인프라 서비스팀</option>
                                            <option value={5} onSelect={onChange}>데이터 서비스팀</option>
                                            <option value={6} onSelect={onChange}>네트워크 서비스팀</option>
                                        </select>
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <label className="col-lg-4 fw-bold text-muted">직 급 (CompanyRank)</label>
                            <div className="col-lg-8 fv-row">
                                <span className="fw-bold fs-6">
                                    <div className="input-group input-group-sm mb-3">
                                        <select className="form-select form-select-sm form-select-solid" name="companyRank" onChange={onChange} value={companyRank}>
                                            <option selected="selected" value={1} onSelect={onChange}>사원</option>
                                            <option value={2} onSelect={onChange}>대리</option>
                                            <option value={3} onSelect={onChange}>과장</option>
                                            <option value={4} onSelect={onChange}>차장</option>
                                            <option value={5} onSelect={onChange}>부장</option>
                                            <option value={6} onSelect={onChange}>상무</option>
                                            <option value={7} onSelect={onChange}>전무</option>
                                            <option value={8} onSelect={onChange}>사장</option>
                                            <option value={9} onSelect={onChange}>회장</option>
                                        </select>
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <label className="col-lg-4 fw-bold text-muted">사 번 (Emp_Number)</label>
                            <div className="col-lg-8">
                                <span className="fw-bolder fs-6 text-dark">
                                    <div className="input-group input-group-sm mb-3">
                                        <input type="text" name="newNo" className="form-control" placeholder="사번을 입력해주세요." onChange={onChange} value={newNo} />
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <label className="col-lg-4 fw-bold text-muted">이메일 (Email)</label>
                            <div className="col-lg-8">
                                <span className="fw-bolder fs-6 text-dark">
                                    <div className="input-group input-group-sm mb-3">
                                        <input type="email" name="email" className="form-control" placeholder="이메일을 입력해주세요." onChange={onChange} value={email} />
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <label className="col-lg-4 fw-bold text-muted">주 소 (Address)</label>
                            <div className="col-lg-8">
                                <span className="fw-bolder fs-6 text-dark">
                                    <div className="input-group input-group-sm mb-3">
                                        <input type="text" name="address" className="form-control" placeholder="주소를 입력해주세요." onChange={onChange} value={address} />
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <label className="col-lg-4 fw-bold text-muted">내선전화 (ComCall)</label>
                            <div className="col-lg-8 fv-row">
                                <span className="fw-bold fs-6">
                                    <div className="input-group input-group-sm mb-3">
                                        <input type="text" name="comCall" className="form-control" placeholder="내선전화번호를 입력해주세요." onChange={onChange} value={comCall} />
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <label className="col-lg-4 fw-bold text-muted">핸드폰 번호 (Phone)</label>
                            <div className="col-lg-8 fv-row">
                                <span className="fw-bold fs-6">
                                    <div className="input-group input-group-sm mb-3">
                                        <input type="text" name="phone" className="form-control" placeholder="핸드폰 번호를 입력해주세요." onChange={onChange} value={phone} />
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <label className="col-lg-4 fw-bold text-muted">권 한 (Master)</label>
                            <div className="col-lg-8 fv-row">
                                <span className="fw-bold fs-6">
                                    <div className="input-group input-group-sm mb-3">
                                        <select name="isMaster" className="form-select form-select-sm form-select-solid" onChange={onChange} value={isMaster}>
                                            <option selected="selected" value={0} onSelect={onChange}>일반회원</option>
                                            <option value={1} onSelect={onChange}>관리자</option>
                                        </select>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
