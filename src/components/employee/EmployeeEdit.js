import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, Link, redirect  } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

export default function EmployeeEdit({ show, onHide, username }) {
    const myPort = process.env.REACT_APP_MY_PORT;
    const token = sessionStorage.getItem("token");
    const [dto, setDto] = useState({
        username: '',
        pwd: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        companyName: '',
        deptCode: '',
        companyRank: '',
        newNo: '',
        comCall: '',
        isMaster: '',
        status: ''
    });

    const { pwd, name, email, phone, address, companyName, deptCode, companyRank, newNo, comCall, isMaster, status } = dto;

    const onChange = (e) => {
        const { name, value } = e.target;
        setDto({
            ...dto,
            [name]: value
        });
    };

    useEffect(() => {
        if (username) {
            axios.get(`http://localhost:${myPort}/edit/${username}`, { headers: { Authorization: token }, params: { username: username } })
                .then(function (res) {
                    if (res.status === 200) {
                        let m = res.data.m;
                        setDto((prevDto) => ({
                            ...prevDto,
                            username: m.username,
                            pwd: m.pwd,
                            name: m.name,
                            email: m.email,
                            phone: m.phone,
                            address: m.address,
                            companyName: m.companyName,
                            deptCode: m.deptCode,
                            companyRank: m.companyRank,
                            newNo: m.newNo,
                            comCall: m.comCall,
                            isMaster: m.isMaster,
                            status: m.status
                        }));
                    } else {
                        alert('에러:' + res.status);
                    }
                })
                .catch(function () {
                    alert('사용자 데이터를 가져오는 중 오류가 발생했습니다.');
                });
                
        } 
        console.log("DTO in EmployeeEdit:", dto);
    }, [username]);

    const save = () => {
        axios.put(
            `http://localhost:${myPort}/edit`,
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
            .catch(function () {
                alert('정보수정 실패');
            });
            window.myFunction3();
    };

    const del = () => {
        axios.post('http://localhost:' + myPort + '/del',
            {},
            {
                headers: { Authorization: token },
                params: { username: dto.username }
            }
        )
            .then(function (res) {
                if (res.status === 200) {
                    onHide();
                    window.myFunction3();
                } else {
                    alert(res.status);
                }
            });
     
    }

    return (
        <>
            <Modal show={show} onHide={onHide} size="lg" centered>
                <Modal.Body>
                    <div className="card mb-5 mb-xl-10">
                        <div className="card-header cursor-pointer">
                            <div className="card-title m-0">
                                <h3 className="fw-bolder m-0">{dto.name}님 프로필 수정</h3>
                            </div>
                            <button onClick={save} className="btn btn-primary align-self-center">수정
                            </button>
                        </div>
                        <input type="hidden" name="username" value={dto.username} />
                        <input type="hidden" name="name" value={dto.name} />
                        <input type="hidden" name="pwd" value={dto.pwd} />
                        <input type="hidden" name="phone" value={dto.phone} />
                        <input type="hidden" name="email" value={dto.email} />
                        <input type="hidden" name="address" value={dto.address} />
                        <input type="hidden" name="comCall" value={dto.comCall} />
                        <input type="hidden" name="newMemNo" value={dto.newMemNo} />
                        <input type="hidden" name="newNo" value={dto.newNo} />
                        <input type="hidden" name="originFname" value={dto.originFname} />
                        <input type="hidden" name="status" value={dto.status} />
                        <input type="hidden" name="thumbnailFname" value={dto.thumbnailFname} />
                        <input type="hidden" name="username" value={dto.username} />
                        <input type="hidden" name="cstatus" value={dto.cstatus} />
                        <input type="hidden" name="companyName" value={dto.companyName} />
                        <div className="card-body p-9">
                            <div className="row mb-7">
                                <label className="col-lg-4 fw-bold text-muted">이 름 (Full Name)</label>
                                <div className="col-lg-8">
                                    <span className="fw-bolder fs-6 text-dark">
                                        <div className="input-group input-group-sm mb-3">
                                            {dto.name}
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <div className="row mb-7">
                                <label className="col-lg-4 fw-bold text-muted">아이디(Username)</label>
                                <div className="col-lg-8">
                                    <span className="fw-bolder fs-6 text-dark">
                                        <div className="input-group input-group-sm mb-3">
                                            {dto.username}
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <div className="row mb-7">
                                <label className="col-lg-4 fw-bold text-muted">이메일 (Email)</label>
                                <div className="col-lg-8">
                                    <span className="fw-bolder fs-6 text-dark">
                                        <div className="input-group input-group-sm mb-3">
                                            {dto.email}
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <div className="row mb-7">
                                <label className="col-lg-4 fw-bold text-muted">주 소 (Address)</label>
                                <div className="col-lg-8">
                                    <span className="fw-bolder fs-6 text-dark">
                                        <div className="input-group input-group-sm mb-3">
                                            {dto.address}
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <div className="row mb-7">
                                <label className="col-lg-4 fw-bold text-muted">핸드폰 번호 (Phone)</label>
                                <div className="col-lg-8 fv-row">
                                    <span className="fw-bold fs-6">
                                        <div className="input-group input-group-sm mb-3">
                                            {dto.phone}
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <div className="row mb-7">
                                <label className="col-lg-4 fw-bold text-muted">부 서 (Department)</label>
                                <div className="col-lg-8 fv-row">
                                    <span className="fw-bold fs-6">
                                        <div className="input-group input-group-sm mb-3">
                                            <select className="form-select form-select-sm form-select-solid" name="deptCode" onChange={onChange} style={{ width: '150px' }} value={dto.deptCode}>
                                                <option onSelect={onChange} value={0}>총무팀</option>
                                                <option onSelect={onChange} value={1}>인사팀</option>
                                                <option onSelect={onChange} value={2}>법무팀</option>
                                                <option onSelect={onChange} value={3}>마케팅팀</option>
                                                <option onSelect={onChange} value={4}>인프라 서비스팀</option>
                                                <option onSelect={onChange} value={5}>데이터 서비스팀</option>
                                                <option onSelect={onChange} value={6}>네트워크 서비스팀</option>
                                            </select>
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <div className="row mb-7">
                                <label className="col-lg-4 fw-bold text-muted">직 급(Rank)</label>
                                <div className="col-lg-8 fv-row">
                                    <span className="fw-bold fs-6">
                                        <div className="input-group input-group-sm mb-3">
                                            <select className="form-select form-select-sm form-select-solid" name="companyRank" onChange={onChange} style={{ width: '150px' }} value={dto.companyRank}>
                                                <option onSelect={onChange} value={1}>사원</option>
                                                <option onSelect={onChange} value={2}>대리</option>
                                                <option onSelect={onChange} value={3}>과장</option>
                                                <option onSelect={onChange} value={4}>차장</option>
                                                <option onSelect={onChange} value={5}>부장</option>
                                                <option onSelect={onChange} value={6}>상무</option>
                                                <option onSelect={onChange} value={7}>전무</option>
                                                <option onSelect={onChange} value={8}>대표이사</option>
                                                <option onSelect={onChange} value={9}>회장</option>
                                            </select>
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <div className="row mb-7">
                                <label className="col-lg-4 fw-bold text-muted">권 한(Master)</label>
                                <div className="col-lg-8 fv-row">
                                    <span className="fw-bold fs-6">
                                        <div className="input-group input-group-sm mb-3">
                                            <select className="form-select form-select-sm form-select-solid" name="isMaster" onChange={onChange} style={{ width: '150px' }} value={dto.isMaster}>
                                                <option onSelect={onChange} value={0}>일반회원</option>
                                                <option onSelect={onChange} value={1}>관리자</option>
                                            </select>
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <div className="row mb-7">
                                <label className="col-lg-4 fw-bold text-muted">탈 퇴(Withdraw)</label>
                                <div className="col-lg-8 fv-row">
                                    <span className="fw-bold fs-6">
                                        <div className="input-group input-group-sm mb-3">
                                            <button onClick={() => del(dto.username)} className="btn btn-danger align-self-center">탈 퇴</button>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal >
        </>
    );
}
