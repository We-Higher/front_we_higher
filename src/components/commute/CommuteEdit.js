import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import '../../css/dataroom.css';

export default function CommuteEdit() {
    const token = sessionStorage.getItem("token");
    const loginid = sessionStorage.getItem("loginid");
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const n = useParams().num;
    const [dto, setDto] = useState({

        num: 0,
        basicDate: null,
        startTime: null,
        endTime: null,
        writer: '',
        reason: '',
        editStartTime: null,
        editEndTime: null,
        editBasicDate: null
    });

    const { num, basicDate, startTime, endTime,
        writer, reason, editStartTime, editEndTime, editBasicDate } = dto;

    const onChange = (e) => {
        const { name, value } = e.target;
        setDto({
            ...dto,
            [name]: value
        })
    }

    useEffect(() => {
        axios.get('http://localhost:8081/auth/commute/edit/' + n, { headers: { Authorization: token } })
            .then(function (res) {
                if (res.status === 200) {
                    let b = res.data.dto;
                    setDto({
                        num: b.num,
                        basicDate: b.basicDate,
                        startTime: b.startTime,
                        endTime: b.endTime,
                        writer: b.member.name,
                        reason: b.reason,
                        editStartTime: b.editStartTime,
                        editEndTime: b.editEndTime,
                        editBasicDate: b.editBasicDate
                    })
                } else {
                    alert('error:' + res.status);
                }
            });
    }, []);

    const save = () => {
        axios.post('http://localhost:8081/auth/commute/edit',
            {},
            { headers: { Authorization: token }, params: { num:num, reason:reason, editStartTime:editStartTime, editEndTime:editEndTime, editBasicDate:editBasicDate} })
            .then(function (res) {
                if (res.status === 200) {
                    alert("근태수정 신청이 완료됬습니다.");
                    //navigate('/board/list')
                } else {
                    alert('error:' + res.status);
                }
            })
    }

    return (

            <div className="card mb-5 mb-xl-10">
                <div className="card-header cursor-pointer">
                    <div className="card-title m-0">
                        <h3 className="fw-bolder m-0">
                            {basicDate}일 근태수정 신청
                        </h3>
                    </div>
                    <button onClick={save} className="btn btn-primary align-self-center">
                        신청
                    </button>
                </div>
                <div className="card-body p-9">
                    <div className="row mb-7">
                        <label className="col-lg-4 fw-bold text-muted">기준일 (Date)</label>
                        <div className="col-lg-8">
                            <span className="fw-bolder fs-6 text-dark">
                                <div className="input-group input-group-sm mb-3">
                                    {basicDate}
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className="row mb-7">
                        <label className="col-lg-4 fw-bold text-muted">
                            출근시간 (Attendance)
                        </label>
                        <div className="col-lg-8">
                            <span className="fw-bolder fs-6 text-dark">
                                <div className="input-group input-group-sm mb-3">
                                    {startTime}
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className="row mb-7">
                        <label className="col-lg-4 fw-bold text-muted">퇴근시간 (Quit)</label>
                        <div className="col-lg-8 fv-row">
                            <span className="fw-bold fs-6">
                                <div className="input-group input-group-sm mb-3">
                                    {endTime}
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className="separator my-2" />
                    <div className="row mb-7">
                        <label className="col-lg-4 fw-bold text-muted">
                            수정출근일 (EditDate)
                        </label>
                        <div className="col-lg-8">
                            <span className="fw-bolder fs-6 text-dark">
                                <div className="input-group input-group-sm mb-3">
                                    <input
                                        type="date"
                                        name="editBasicDate"
                                        className="form-control"
                                        onChange={onChange} 
                                    />
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className="row mb-7">
                        <label className="col-lg-4 fw-bold text-muted">
                            수정출근시간 (EditAttendance)
                        </label>
                        <div className="col-lg-8 fv-row">
                            <span className="fw-bold fs-6">
                                <div className="input-group input-group-sm mb-3">
                                    <input
                                        type="text"
                                        name="editStartTime"
                                        className="form-control"
                                        placeholder="실제 출근시간을 입력하세요."
                                        onChange={onChange} 
                                    />
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className="row mb-7">
                        <label className="col-lg-4 fw-bold text-muted">
                            수정퇴근시간 (EditQuit)
                        </label>
                        <div className="col-lg-8 fv-row">
                            <span className="fw-bold fs-6">
                                <div className="input-group input-group-sm mb-3">
                                    <input
                                        type="text"
                                        name="editEndTime"
                                        className="form-control"
                                        placeholder="실제 퇴근시간을 입력하세요."
                                        onChange={onChange} 
                                    />
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className="row mb-7">
                        <label className="col-lg-4 fw-bold text-muted">사 유 (Reason)</label>
                        <div className="col-lg-8 fv-row">
                            <span className="fw-bold fs-6">
                                <div className="input-group input-group-sm mb-3">
                                    <input
                                        type="text"
                                        name="reason"
                                        className="form-control"
                                        placeholder="사유를 입력하세요."
                                        onChange={onChange} 
                                    />
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
    );
}
