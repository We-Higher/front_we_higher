import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';

export default function MypageEdit({show, onHide}) {
    const myPort = process.env.REACT_APP_MY_PORT;
    const token = sessionStorage.getItem("token");
    const loginid = sessionStorage.getItem("loginid");
    const navigate = useNavigate();

    const [mdto, setDto] = useState({
        username: '',
        pwd: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        companyName: '',
        deptCode: 0,
        companyRank: '',
        newNo: 0,
        comCall: 0,
        isMaster: 0,
        status: 0,
        originFname: ''
    });

    const { username, pwd, name, email, phone, address, companyName, deptCode, companyRank, newNo, comCall, isMaster, status, originFname } = mdto;

    const onChange = (e) => {
        const { name, value } = e.target;
        setDto({
            ...mdto,
            [name]: value
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:${myPort}/auth/mypage`, { headers: { Authorization: token } })
            .then(
                function (res) {
                    if (res.status === 200) {
                        if (res.data.flag) {
                            setDto(res.data.mdto);
                        } else {
                            alert('검색안됨');
                        }
                    } else {
                        alert('error:' + res.status);
                    }
                }
            );
    }, []);

    const redirect = (url) => {
        window.location.href = url;
    };

    const edit = () => {

        let fdata = new FormData();
        let fileInput = document.getElementById('f');
        let selectedFile = fileInput.files[0];

        if (selectedFile) {
            fdata.append('f', selectedFile);
        } else {
            console.log('No file selected.');
        }
        axios.put(`http://localhost:${myPort}/auth/pwdedit`, fdata,
            {
                headers: { Authorization: token }, "Content-Type": "multipart/form-data", params: {
                    username: username, pwd: pwd, name: name, email: email,
                    phone: phone, address: address, companyName: companyName, deptCode: deptCode, companyRank: companyRank,
                    newNo: newNo, comCall: comCall, isMaster: isMaster, status: status, originFname: originFname
                }
            })
            .then(function (res) {
                if (res.status === 200) {
                    alert("내 정보가 변경되었습니다. 다시 로그인해주세요.")
                    sessionStorage.clear();
                    redirect('/');
                } else {
                    alert('error:' + res.status);
                }
            })
    }

    return (

        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Body>
                <div className="card mb-5 mb-xl-10">
                    <div className="card-header cursor-pointer">
                        <div className="card-title m-0">
                            <h3 className="fw-bolder m-0">프로필 수정</h3>
                        </div>
                        <button onClick={edit} className="btn btn-primary align-self-center">
                            수정
                        </button>
                    </div>
                    <input type="hidden" name="name" value={mdto.name} />
                    <input type="hidden" name="comCall" value={mdto.comCall} />
                    <input type="hidden" name="companyRank" value={mdto.companyRank} />
                    <input type="hidden" name="deptCode" value={mdto.deptCode} />
                    <input type="hidden" name="isMaster" value={mdto.isMaster} />
                    <input type="hidden" name="newMemNo" value={mdto.newMemNo} />
                    <input type="hidden" name="newNo" value={mdto.newNo} />
                    <input type="hidden" name="originFname" value={mdto.originFname} />
                    <input type="hidden" name="status" value={mdto.status} />
                    <input
                        type="hidden"
                        name="thumbnailFname"
                        value={mdto.thumbnailFname}
                    />
                    <input type="hidden" name="username" value={mdto.username} />
                    <input type="hidden" name="cstatus" value={mdto.cstatus} />
                    <input type="hidden" name="companyName" value={mdto.companyName} />
                    <div className="card-body p-9">
                        <div className="row mb-7">
                            <label className="col-lg-4 fw-bold text-muted">
                                이 름 (Full Name)
                            </label>
                            <div className="col-lg-8">
                                <span className="fw-bolder fs-6 text-dark">
                                    <div className="input-group input-group-sm mb-3">
                                        {mdto.name}
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="row mb-7">
                            <label className="col-lg-4 fw-bold text-muted">
                                패스워드 (Password)
                            </label>
                            <div className="col-lg-8">
                                <span className="fw-bolder fs-6 text-dark">
                                    <div className="input-group input-group-sm mb-3">
                                        <input
                                            type="password"
                                            name="pwd"
                                            placeholder="비밀번호를 입력해주세요.."
                                            className="form-control"
                                            aria-label="Password"
                                            aria-describedby="basic-addon1"
                                            onChange={onChange}
                                        />
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="row mb-7">
                            <label className="col-lg-4 fw-bold text-muted">
                                이메일 (Email)
                            </label>
                            <div className="col-lg-8">
                                <span className="fw-bolder fs-6 text-dark">
                                    <div className="input-group input-group-sm mb-3">
                                        <input
                                            type="email"
                                            name="email"
                                            value={mdto.email}
                                            className="form-control"
                                            placeholder="Email"
                                            aria-label="Email"
                                            aria-describedby="basic-addon1"
                                        />
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="row mb-7">
                            <label className="col-lg-4 fw-bold text-muted">
                                주 소 (Address)
                            </label>
                            <div className="col-lg-8">
                                <span className="fw-bolder fs-6 text-dark">
                                    <div className="input-group input-group-sm mb-3">
                                        <input
                                            type="text"
                                            name="address"
                                            value={mdto.address}
                                            className="form-control"
                                            placeholder="Address"
                                            aria-label="Address"
                                            aria-describedby="basic-addon1"
                                        />
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="row mb-7">
                            <label className="col-lg-4 fw-bold text-muted">
                                핸드폰 번호 (Phone)
                            </label>
                            <div className="col-lg-8 fv-row">
                                <span className="fw-bold fs-6">
                                    <div className="input-group input-group-sm mb-3">
                                        <input
                                            type="text"
                                            name="phone"
                                            value={mdto.phone}
                                            className="form-control"
                                            placeholder="Phone"
                                            aria-label="Phone"
                                            aria-describedby="basic-addon1"
                                        />
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="row mb-7">
                            <label className="col-lg-4 fw-bold text-muted">프로필사진</label>
                            <div className="col-lg-8 fv-row">
                                <span className="fw-bold fs-6">
                                    <div className="input-group input-group-sm mb-3">
                                        <input type="file" id="f" name="f" className="form-control" onChange={onChange} />
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
