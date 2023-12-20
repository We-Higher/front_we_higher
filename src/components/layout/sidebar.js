import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { NavDropdown, Nav, NavLink } from 'react-bootstrap';
import { useEffect, useState } from "react";

import Employeeicon from '../icons/Employeeicon';
import Boardicon from '../icons/Boardicon';
import Commuteicon from '../icons/Commuteicon';
import Approvalicon from '../icons/Approvalicon';
import Scheduleicon from '../icons/Scheduleicon';

import '../../css/layout.css';
import '../../css/style.bundle.css';
import '../../css/plugins.bundle.css';

export default function Sidebar() {
    const navigate = useNavigate();
    const myPort = process.env.REACT_APP_MY_PORT;
    const token = sessionStorage.getItem("token");
    const [mdto, setDto] = useState({});

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

    const main = (e) => {
        navigate('/main');
    }

    const openInNewWindow = () => {
        const width = 820;
        const height = 760;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        window.open('/approval/report', '_blank', `width=${width}, height=${height}, left=${left}, top=${top}`);
    };

    const openInNewWindow2 = () => {
        const width = 805;
        const height = 550;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        window.open('/approval/expense', '_blank', `width=${width}, height=${height}, left=${left}, top=${top}`);
    };

    const openInNewWindow3 = () => {
        const width = 805;
        const height = 780;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        window.open('/approval/vacation', '_blank', `width=${width}, height=${height}, left=${left}, top=${top}`);
    };

    return (
        <div id="sidebar" fragment="sidebarFragment" style={{ width: '75px' }}>
            <div id="kt_aside" className="aside aside-extended bg-white" data-kt-drawer="true" data-kt-drawer-name="aside"
                data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true"
                data-kt-drawer-width="auto" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_aside_toggle">
            </div>
            <div className="aside-primary d-flex flex-column align-items-lg-center flex-row-auto">
                {/*begin::Logo*/}
                <div className="aside-logo d-none d-lg-flex flex-column align-items-center flex-column-auto pt-10"
                    id="kt_aside_logo">
                    <img alt="Logo" src="/logo3.png" className="h-70px" onClick={main} />
                </div>
                {/*end::Logo*/}
                <div className="aside-nav d-flex flex-column flex-lg-row flex-column-fluid w-100 pt-5 pt-lg-0"
                    id="kt_aside_nav" style={{ marginTop: 150 }}>
                    {/*begin::Primary menu*/}
                    <div id="kt_aside_menu"
                        className="menu menu-column menu-title-gray-600 menu-icon-gray-400 menu-state-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500 fw-bold fs-5"
                        data-kt-menu="true">
                        <div className="menu-item py-2">
                            <a className="menu-link nactive menu-center" title="Main"
                                data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-dismiss="click"
                                data-bs-placement="right">
                                <span className="menu-icon me-0" onClick={main}>
                                    {/*begin::Svg Icon | path: icons/duotone/Home/Home2.svg*/}
                                    <span className="svg-icon svg-icon-1">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor" className="bi bi-house-door-fill"
                                            viewBox="0 0 16 16">
                                            <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
                                        </svg>
                                    </span>
                                    {/*end::Svg Icon*/}
                                </span>
                            </a>
                        </div>

                        {/* 임직원 관리 */}
                        <Nav className="ml-auto justify-content-center">
                            <NavDropdown title={<Employeeicon />} id="nav-dropdown" className="position-static">
                                {/* Submenu with more items */}
                                <NavDropdown title="임직원 관리" id="submenu">
                                    <NavDropdown.Item as={Link} to="/employee/list">
                                        임직원 목록
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="내 정보" id="submenu">
                                    <NavDropdown.Item as={Link} to="/member/mypage">
                                        마이 페이지
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </NavDropdown>
                        </Nav>

                        {/* 전자결재 */}
                        <Nav className="ml-auto justify-content-center">
                            <NavDropdown title={<Approvalicon />} id="nav-dropdown">
                                <NavDropdown title="결재문서 작성" id="submenu">
                                    <NavDropdown.Item as={Link} to="/approval/mydraft" onClick={openInNewWindow}>
                                        품의서
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/approval/mydraft" onClick={openInNewWindow2}>
                                        지출결의서
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/approval/mydraft" onClick={openInNewWindow3}>
                                        휴가신청서
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="결재문서 목록" id="submenu" className="menu-item menu-accordion">
                                    {mdto.isMaster === 1 && (
                                        <NavDropdown.Item as={Link} to="/approval/draft">
                                            전체 결재문서
                                        </NavDropdown.Item>
                                    )}
                                    <NavDropdown.Item as={Link} to="/approval/mydraft">
                                        기안 결재함
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/approval/process">
                                        결재 대기함
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/approval/myrefuse">
                                        반려 결재함
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </NavDropdown>
                        </Nav>

                        {/* 근태관리 */}
                        <Nav className="ml-auto justify-content-center">
                            <NavDropdown title={<Commuteicon />} id="nav-dropdown">
                                <NavDropdown title="근태관리" id="submenu">
                                    <NavDropdown.Item as={Link} to="/commute/list">
                                        임직원 근태관리
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/commute/mycommute">
                                        나의 출퇴근 이력
                                    </NavDropdown.Item>
                                    {mdto.isMaster === 1 && (
                                        <NavDropdown.Item as={Link} to="/commute/editlist">
                                            근태 수정요청
                                        </NavDropdown.Item>
                                    )}
                                </NavDropdown>
                            </NavDropdown>
                        </Nav>

                        {/* 일정 및 예약 */}
                        <Nav className="ml-auto justify-content-center">
                            <NavDropdown title={<Scheduleicon />} id="nav-dropdown">
                                <NavDropdown title="예약 및 일정" id="submenu">
                                    <NavDropdown.Item as={Link} to="/meetingroom/meetingroom">
                                        회의실 예약
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/schedule/calendar">
                                        일정 보기
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </NavDropdown>
                        </Nav>

                        <Nav className="ml-auto justify-content-center">
                            <NavDropdown title={<Boardicon />} id="nav-dropdown">
                                {/* Submenu with more items */}
                                <NavDropdown title="자료실 및 게시판" id="submenu">
                                    <NavDropdown.Item as={Link} to="/dataroom/list">
                                        자료실
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/board/list">
                                        자유게시판
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </NavDropdown>
                        </Nav>
                    </div>
                    {/*end::Primary menu*/}
                </div>
                {/*end::Nav*/}
            </div>
            {/*end::Primary*/}
            {/*begin::Action*/}
            {/*end::Action*/}
        </div>
    )
}