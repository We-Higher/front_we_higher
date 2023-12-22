import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import '../../css/dataroom.css';
import { API_BASE_URL } from "../../common/util";

export default function CommuteEdit({ show, onHide, num }) {
    const myPort = process.env.REACT_APP_MY_PORT;
    const token = sessionStorage.getItem("token");
    const loginid = sessionStorage.getItem("loginid");
    const navigate = useNavigate();
    const [list, setList] = useState([]);
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

    const { basicDate, startTime, endTime,
        writer, reason, editStartTime, editEndTime, editBasicDate } = dto;

    const onChange = (e) => {
        const { name, value } = e.target;
        setDto({
            ...dto,
            [name]: value
        })
    }

    useEffect(() => {
        if (num) {
            axios.get(`${API_BASE_URL}/auth/commute/edit/` + num, { headers: { Authorization: token } })
                .then(function (res) {
                    if (res.status === 200) {
                        let b = res.data.dto;
                        setDto((prevDto) => ({
                            ...prevDto,
                            num: b.num,
                            basicDate: b.basicDate,
                            startTime: b.startTime,
                            endTime: b.endTime,
                            writer: b.member.name,
                            reason: b.reason,
                            editStartTime: b.editStartTime,
                            editEndTime: b.editEndTime,
                            editBasicDate: b.editBasicDate
                        }));
                    } else {
                        alert('error:' + res.status);
                    }
                });
        }
    }, [num]);

    const save = () => {

        const editBasicDate = document.querySelector('#editBasicDate').value;
        const editStartTime = document.querySelector('#editStartTime').value;
        const editEndTime = document.querySelector('#editEndTime').value;
        const reason = document.querySelector('#reason').value;

        if (editBasicDate === '') {
            alert('실제 출근일을 입력하세요');
            return;
        } else if (editStartTime === '') {
            alert('출근한 시간을 입력하세요');
            return;
        } else if (editEndTime === '') {
            alert('퇴근한 시간을 입력하세요');
            return;
        } else if (reason === '') {
            alert('사유을 입력하세요');
            return;
        }

        axios.post(`${API_BASE_URL}/auth/commute/edit`,
            {},
            { headers: { Authorization: token }, params: { num: num, reason: reason, editStartTime: editStartTime, editEndTime: editEndTime, editBasicDate: editBasicDate } })
            .then(function (res) {
                if (res.status === 200) {
                    onHide();
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
                                            id='editBasicDate'
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
                                            id='editStartTime'
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
                                            id='editEndTime'
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
                                            id='reason'
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
            </Modal.Body>
        </Modal>
    );
}
