import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import '../../css/dataroom.css';

export default function EmployeeJoin() {
    const token = sessionStorage.getItem("token");
    const loginid = sessionStorage.getItem("loginid");
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [mdto, setDto] = useState({});
    const { ismaster } = mdto;

    useEffect(() => {
        axios.get('http://localhost:8081/auth/employee/join', { headers: { Authorization: token } })
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

    return (

        <div class="card-body p-9">
            <div class="row mb-5">
                <label class="col-lg-4 fw-bold text-muted">아이디 (Username)</label>
                <div class="col-lg-8">
                    <span class="fw-bolder fs-6 text-dark">
                        <div class="input-group input-group-sm mb-3">
                            <input type="text" name="username"
                                class="form-control"
                                placeholder="아이디를 입력해주세요." />
                        </div>
                    </span>
                </div>
            </div>
            <div class="row mb-4">
                <label class="col-lg-4 fw-bold text-muted">패스워드 (Password)</label>
                <div class="col-lg-8">
                    <span class="fw-bolder fs-6 text-dark">
                        <div class="input-group input-group-sm mb-3">
                            <input type="password" name="pwd"
                                class="form-control"
                                placeholder="패스워드를 입력해주세요." />
                        </div>
                    </span>
                </div>
            </div>
            <div class="row mb-4">
                <label class="col-lg-4 fw-bold text-muted">이 름 (Full Name)</label>
                <div class="col-lg-8">
                    <span class="fw-bolder fs-6 text-dark">
                        <div class="input-group input-group-sm mb-3">
                            <input type="text" name="name"
                                class="form-control"
                                placeholder="이름을 입력해주세요." />
                        </div>
                    </span>
                </div>
            </div>
            <div class="row mb-4">
                <label class="col-lg-4 fw-bold text-muted">회사명 (Username)</label>
                <div class="col-lg-8">
                    <span class="fw-bolder fs-6 text-dark">
                        <div class="input-group input-group-sm mb-3">
                            <input type="text" name="companyName"
                                value="We-Higher"
                                class="form-control" readonly />
                        </div>
                    </span>
                </div>
            </div>
            <div class="row mb-4">
                <label class="col-lg-4 fw-bold text-muted">부 서 (Department)</label>
                <div class="col-lg-8 fv-row">
                    <span class="fw-bold fs-6">
                        <div class="input-group input-group-sm mb-3">
                            <select class="form-select form-select-sm form-select-solid"
                                name="deptCode">
                                <option selected="selected"
                                    value="0">총무팀</option>
                                <option value="1">인사팀</option>
                                <option value="2">법무팀</option>
                                <option value="3">마케팅팀</option>
                                <option value="4">인프라 서비스팀</option>
                                <option value="5">데이터 서비스팀</option>
                                <option value="6">네트워크 서비스팀</option>
                            </select>
                        </div>
                    </span>
                </div>
            </div>
            <div class="row mb-4">
                <label class="col-lg-4 fw-bold text-muted">직 급 (CompanyRank)</label>
                <div class="col-lg-8 fv-row">
                    <span class="fw-bold fs-6">
                        <div class="input-group input-group-sm mb-3">
                            <select class="form-select form-select-sm form-select-solid"
                                name="companyRank">
                                <option selected="selected"
                                    value="1">사원</option>
                                <option value="2">대리</option>
                                <option value="3">과장</option>
                                <option value="4">차장</option>
                                <option value="5">부장</option>
                                <option value="6">상무</option>
                                <option value="7">전무</option>
                                <option value="8">사장</option>
                                <option value="9">회장</option>
                            </select>
                        </div>
                    </span>
                </div>
            </div>
            <div class="row mb-4">
                <label class="col-lg-4 fw-bold text-muted">사 번 (Emp_Number)</label>
                <div class="col-lg-8">
                    <span class="fw-bolder fs-6 text-dark">
                        <div class="input-group input-group-sm mb-3">
                            <input type="text" name="newNo"
                                class="form-control"
                                placeholder="사번을 입력해주세요." />
                        </div>
                    </span>
                </div>
            </div>
            <div class="row mb-4">
                <label class="col-lg-4 fw-bold text-muted">이메일 (Email)</label>
                <div class="col-lg-8">
                    <span class="fw-bolder fs-6 text-dark">
                        <div class="input-group input-group-sm mb-3">
                            <input type="email" name="email"
                                class="form-control"
                                placeholder="이메일을 입력해주세요." />
                        </div>
                    </span>
                </div>
            </div>
            <div class="row mb-4">
                <label class="col-lg-4 fw-bold text-muted">주 소 (Address)</label>
                <div class="col-lg-8">
                    <span class="fw-bolder fs-6 text-dark">
                        <div class="input-group input-group-sm mb-3">
                            <input type="text" name="address"
                                class="form-control"
                                placeholder="주소를 입력해주세요." />
                        </div>
                    </span>
                </div>
            </div>
            <div class="row mb-4">
                <label class="col-lg-4 fw-bold text-muted">내선전화 (ComCall)</label>
                <div class="col-lg-8 fv-row">
                    <span class="fw-bold fs-6">
                        <div class="input-group input-group-sm mb-3">
                            <input type="text" name="comCall"
                                class="form-control"
                                placeholder="내선전화번호를 입력해주세요." />
                        </div>
                    </span>
                </div>
            </div>
            <div class="row mb-4">
                <label class="col-lg-4 fw-bold text-muted">핸드폰 번호 (Phone)</label>
                <div class="col-lg-8 fv-row">
                    <span class="fw-bold fs-6">
                        <div class="input-group input-group-sm mb-3">
                            <input type="text" name="phone"
                                class="form-control"
                                placeholder="핸드폰 번호를 입력해주세요." />
                        </div>
                    </span>
                </div>
            </div>
            <div class="row mb-4">
                <label class="col-lg-4 fw-bold text-muted">권 한 (Master)</label>
                <div class="col-lg-8 fv-row">
                    <span class="fw-bold fs-6">
                        <div class="input-group input-group-sm mb-3">
                            <select name="isMaster"
                                class="form-select form-select-sm form-select-solid">
                                <option selected="selected"
                                    value="0">일반회원</option>
                                <option value="1">관리자</option>
                            </select>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    );
}
