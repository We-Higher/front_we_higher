import axios from "axios";
import { useEffect, useState } from "react";

export default function Mypage() {

    const token = sessionStorage.getItem("token");
    const [mdto, setDto] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8081/auth/mypage', { headers: { Authorization: token } })
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

    return (

            <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                <div className="container" id="kt_content_container">
                    <div className="card mb-5 mb-xl-10">
                        <div className="card-body pt-9 pb-0">
                            <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
                                <div className="me-7 mb-4">
                                    <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                                        {/* <img th: if="${#strings.isEmpty(m.originFname)}" src="/img/default.png" alt="image" />
                                    <img th: if="${!#strings.isEmpty(m.originFname)}" th: src="@{'/profile/' + ${#authentication.principal.originFname}}" alt="image" /> */}
                                        <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex-grow-1">
                                <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                                    <div className="d-flex flex-column">
                                        <div className="d-flex align-items-center mb-5 mt-2">
                                            <a href="#" className="text-gray-800 text-hover-primary fs-1 fw-bolder me-1">{mdto.name}</a>
                                            <a href="#">
                                                <span className="svg-icon svg-icon-1 svg-icon-primary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                        <path d="M10.0813 3.7242C10.8849 2.16438 13.1151 2.16438 13.9187 3.7242V3.7242C14.4016 4.66147 15.4909 5.1127 16.4951 4.79139V4.79139C18.1663 4.25668 19.7433 5.83365 19.2086 7.50485V7.50485C18.8873 8.50905 19.3385 9.59842 20.2758 10.0813V10.0813C21.8356 10.8849 21.8356 13.1151 20.2758 13.9187V13.9187C19.3385 14.4016 18.8873 15.491 19.2086 16.4951V16.4951C19.7433 18.1663 18.1663 19.7433 16.4951 19.2086V19.2086C15.491 18.8873 14.4016 19.3385 13.9187 20.2758V20.2758C13.1151 21.8356 10.8849 21.8356 10.0813 20.2758V20.2758C9.59842 19.3385 8.50905 18.8873 7.50485 19.2086V19.2086C5.83365 19.7433 4.25668 18.1663 4.79139 16.4951V16.4951C5.1127 15.491 4.66147 14.4016 3.7242 13.9187V13.9187C2.16438 13.1151 2.16438 10.8849 3.7242 10.0813V10.0813C4.66147 9.59842 5.1127 8.50905 4.79139 7.50485V7.50485C4.25668 5.83365 5.83365 4.25668 7.50485 4.79139V4.79139C8.50905 5.1127 9.59842 4.66147 10.0813 3.7242V3.7242Z" fill="#00A3FF" />
                                                        <path className="permanent" d="M14.8563 9.1903C15.0606 8.94984 15.3771 8.9385 15.6175 9.14289C15.858 9.34728 15.8229 9.66433 15.6185 9.9048L11.863 14.6558C11.6554 14.9001 11.2876 14.9258 11.048 14.7128L8.47656 12.4271C8.24068 12.2174 8.21944 11.8563 8.42911 11.6204C8.63877 11.3845 8.99996 11.3633 9.23583 11.5729L11.3706 13.4705L14.8563 9.1903Z" fill="white" />
                                                    </svg>
                                                </span>
                                            </a>
                                            <a href="#" className="btn btn-sm btn-light-success fw-bolder ms-2 fs-8 py-1 px-3" data-bs-toggle="modal" data-bs-target="#kt_modal_upgrade_plan">{mdto.companyRankName}</a>
                                        </div>
                                        <div className="d-flex flex-wrap fw-bold fs-6 mb-2 pe-2">
                                            <a href="#" className="d-flex align-items-center text-gray-600 text-hover-primary me-5 mb-2" style={{ fontSize: '130%' }}>
                                                <span className="svg-icon svg-icon-2 svg-icon-4 me-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                        <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                            <polygon points="0 0 24 0 24 24 0 24" />
                                                            <path d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z" fill="#000000" fillRule="nonzero" opacity="0.3" />
                                                            <path d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z" fill="#000000" fillRule="nonzero" />
                                                        </g>
                                                    </svg>
                                                </span>{mdto.deptName}</a>
                                        </div>
                                        <div className="d-flex flex-wrap fw-bold fs-6 mb-2 pe-2">
                                            <a href="#" className="d-flex align-items-center text-gray-600 text-hover-primary me-5 mb-2" style={{ fontSize: '130%' }}>
                                                <span className="svg-icon svg-icon-2 svg-icon-4 me-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                        <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                            <rect x={0} y={0} width={24} height={24} />
                                                            <path d="M5,10.5 C5,6 8,3 12.5,3 C17,3 20,6.75 20,10.5 C20,12.8325623 17.8236613,16.03566 13.470984,20.1092932 C12.9154018,20.6292577 12.0585054,20.6508331 11.4774555,20.1594925 C7.15915182,16.5078313 5,13.2880005 5,10.5 Z M12.5,12 C13.8807119,12 15,10.8807119 15,9.5 C15,8.11928813 13.8807119,7 12.5,7 C11.1192881,7 10,8.11928813 10,9.5 C10,10.8807119 11.1192881,12 12.5,12 Z" fill="#000000" fillRule="nonzero" />
                                                        </g>
                                                    </svg>
                                                </span>{mdto.address}</a>
                                        </div>
                                        <div className="d-flex flex-wrap fw-bold fs-6 mb-2 pe-2">
                                            <a href="#" className="d-flex align-items-center text-gray-600 text-hover-primary me-5 mb-2" style={{ fontSize: '130%' }}>
                                                <span className="svg-icon svg-icon-2 svg-icon-4 me-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                        <path d="M11.575,21.2 C6.175,21.2 2.85,17.4 2.85,12.575 C2.85,6.875 7.375,3.05 12.525,3.05 C17.45,3.05 21.125,6.075 21.125,10.85 C21.125,15.2 18.825,16.925 16.525,16.925 C15.4,16.925 14.475,16.4 14.075,15.65 C13.3,16.4 12.125,16.875 11,16.875 C8.25,16.875 6.85,14.925 6.85,12.575 C6.85,9.55 9.05,7.1 12.275,7.1 C13.2,7.1 13.95,7.35 14.525,7.775 L14.625,7.35 L17,7.35 L15.825,12.85 C15.6,13.95 15.85,14.825 16.925,14.825 C18.25,14.825 19.025,13.725 19.025,10.8 C19.025,6.9 15.95,5.075 12.5,5.075 C8.625,5.075 5.05,7.75 5.05,12.575 C5.05,16.525 7.575,19.1 11.575,19.1 C13.075,19.1 14.625,18.775 15.975,18.075 L16.8,20.1 C15.25,20.8 13.2,21.2 11.575,21.2 Z M11.4,14.525 C12.05,14.525 12.7,14.35 13.225,13.825 L14.025,10.125 C13.575,9.65 12.925,9.425 12.3,9.425 C10.65,9.425 9.45,10.7 9.45,12.375 C9.45,13.675 10.075,14.525 11.4,14.525 Z" fill="#000000" />
                                                    </svg>
                                                </span>{mdto.email}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-header cursor-pointer">
                                <div className="card-title m-0">
                                    <h3 className="fw-bolder m-0">상세 프로필</h3>
                                </div>
                                <div className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px  align-self-center" data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end" data-kt-menu-flip="bottom">
                                    <i className="bi bi-pencil" />
                                </div>
                            </div>

                            <div className="card-body p-9">
                                <div className="row mb-7">
                                    <label className="col-lg-4 fw-bold text-muted">이 름 (Full Name)</label>
                                    <div className="col-lg-8">
                                        <span className="fw-bolder fs-6 text-dark">{mdto.name}</span>
                                    </div>
                                </div>
                                <div className="row mb-7">
                                    <label className="col-lg-4 fw-bold text-muted">직 급 (Rank)</label>
                                    <div className="col-lg-8 fv-row">
                                        <span className="fw-bold fs-6">{mdto.companyRankName}</span>
                                    </div>
                                </div>
                                <div className="row mb-7">
                                    <label className="col-lg-4 fw-bold text-muted">부 서 (Department)</label>
                                    <div className="col-lg-8 fv-row">
                                        <span className="fw-bold fs-6">{mdto.deptName}</span>
                                    </div>
                                </div>
                                <div className="row mb-7">
                                    <label className="col-lg-4 fw-bold text-muted">회 사 (Company)</label>
                                    <div className="col-lg-8 fv-row">
                                        <span className="fw-bold fs-6">{mdto.companyName}</span>
                                    </div>
                                </div>
                                <div className="row mb-7">
                                    <label className="col-lg-4 fw-bold text-muted">사 번 (Emp_Number)</label>
                                    <div className="col-lg-8 fv-row">
                                        <span className="fw-bold fs-6">{mdto.newNo}</span>
                                    </div>
                                </div>
                                <div className="row mb-7">
                                    <label className="col-lg-4 fw-bold text-muted">핸드폰 번호 (Phone)</label>
                                    <div className="col-lg-8 fv-row">
                                        <span className="fw-bold fs-6">{mdto.phone}</span>
                                    </div>
                                </div>
                                <div className="row mb-7">
                                    <label className="col-lg-4 fw-bold text-muted">사내전화 (Contact Phone)</label>
                                    <div className="col-lg-8 d-flex align-items-center">
                                        <span className="fw-bolder fs-6 me-2">{mdto.comCall}</span>
                                    </div>
                                </div>
                                <div className="row mb-7">
                                    <label className="col-lg-4 fw-bold text-muted">국 가 (Country)</label>
                                    <div className="col-lg-8">
                                        <span className="fw-bolder fs-6 text-dark">대한민국</span>
                                    </div>
                                </div>
                                <div className="row mb-10">
                                    <label className="col-lg-4 fw-bold text-muted">잔여 연차일(Remain Vacation)</label>
                                    <div className="col-lg-8">
                                        <span className="fw-bold fs-6">{mdto.remain}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
    );
}
