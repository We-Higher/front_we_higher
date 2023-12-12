import { useNavigate } from 'react-router-dom';
export default function Sidebar() {
    const navigate = useNavigate();

    const main = (e) => {
        navigate('/');
    }

    const employee = (e) => {
        navigate('/employee/list');
    }

    return (
        <div id="sidebar" fragment="sidebarFragment">
            <div id="kt_aside" className="aside aside-extended bg-white" data-kt-drawer="true" data-kt-drawer-name="aside"
                data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true"
                data-kt-drawer-width="auto" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_aside_toggle">
            </div>
            <div className="aside-primary d-flex flex-column align-items-lg-center flex-row-auto">
                {/*begin::Logo*/}
                <div className="aside-logo d-none d-lg-flex flex-column align-items-center flex-column-auto pt-10"
                    id="kt_aside_logo">
                    <img alt="Logo" src="/logo3.png" className="h-55px" onClick={main} />
                </div>
                {/*end::Logo*/}
                <div className="aside-nav d-flex flex-column flex-lg-center flex-column-fluid w-100 pt-5 pt-lg-0"
                    id="kt_aside_nav">
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
                        <div data-kt-menu-trigger="click" data-kt-menu-placement="right-start"
                            data-kt-menu-flip="bottom" className="menu-item py-2" >
                            <span className="menu-link menu-center" title="회원"
                                data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-dismiss="click"
                                data-bs-placement="right" onClick={employee}>
                                <span className="menu-icon me-0">
                                    {/*begin::Svg Icon | path: icons/duotone/General/User.svg*/}
                                    <span className="svg-icon svg-icon-1">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            width="16" height="16"
                                            fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16"
                                            color="#ADB5BD">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                            <path fill-rule="evenodd"
                                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                        </svg>
                                    </span>
                                    {/*end::Svg Icon*/}
                                </span>
                            </span>
                            <div className="menu-sub menu-sub-dropdown w-225px px-1 py-4">
                                <div className="menu-item">
                                    <div className="menu-content">
                                        <span className="menu-section fs-5 fw-bolder ps-1 py-1">회원정보</span>
                                    </div>
                                </div>
                                <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                    <span className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">내 정보</span>
                                        <span className="menu-arrow"></span>
                                    </span>
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <a className="menu-link"
                                                href="@{/member/mypage(name=${#authentication.principal.username})}">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">마이페이지</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                    <span className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">임직원 관리</span>
                                        <span className="menu-arrow"></span>
                                    </span>
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <a className="menu-link" href="/employee/list">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">임직원 목록</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-kt-menu-trigger="click" data-kt-menu-placement="right-start"
                            data-kt-menu-flip="bottom" className="menu-item py-2">
                            <span className="menu-link menu-center" title="전자결재" data-bs-toggle="tooltip"
                                data-bs-trigger="hover" data-bs-dismiss="click" data-bs-placement="right">
                                <span className="menu-icon me-0">
                                    {/*begin::Svg Icon | path: icons/duotone/Shopping/Chart.svg*/}
                                    <span className="svg-icon svg-icon-1">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor" className="bi bi-layout-text-sidebar"
                                            viewBox="0 0 16 16" color="#ADB5BD">
                                            <path d="M3.5 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM3 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z" />
                                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm12-1v14h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zm-1 0H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h9V1z" />
                                        </svg>
                                    </span>
                                    {/*end::Svg Icon*/}
                                </span>
                            </span>
                            <div className="menu-sub menu-sub-dropdown w-225px px-1 py-4">
                                <div className="menu-item">
                                    <div className="menu-content">
                                        <span className="menu-section fs-5 fw-bolder ps-1 py-1">전자결재</span>
                                    </div>
                                </div>
                                <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                    <span className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">결재서류 작성</span>
                                        <span className="menu-arrow"></span>
                                    </span>
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item">
                                            <a className="menu-link" id="report">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">품의서</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" id="expense">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">지출결의서</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" id="vacation">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">휴가신청서</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                    <span className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">결재문서 목록</span>
                                        <span className="menu-arrow"></span>
                                    </span>
                                    <div className="menu-sub menu-sub-accordion">
                                        <div className="menu-item" if="${#authentication.principal.isMaster == 1}">
                                            <a className="menu-link" href="/approval/draft">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">전체 결재문서</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="/approval/mydraft">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">기안 결재함</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="/approval/process">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">결재 대기함</span>
                                            </a>
                                        </div>
                                        <div className="menu-item">
                                            <a className="menu-link" href="/approval/myrefuse">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">반려 결재함</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-kt-menu-trigger="click" data-kt-menu-placement="right-start"
                            data-kt-menu-flip="bottom" className="menu-item py-2">
                            <span className="menu-link menu-center" title="근태관리" data-bs-toggle="tooltip"
                                data-bs-trigger="hover" data-bs-dismiss="click" data-bs-placement="right">
                                <span className="menu-icon me-0">
                                    {/*begin::Svg Icon | path: icons/duotone/Communication/More.svg*/}
                                    <span className="svg-icon svg-icon-1">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor" className="bi bi-building" viewBox="0 0 16 16"
                                            color="#ADB5BD">
                                            <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z" />
                                            <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1Zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3V1Z" />
                                        </svg>
                                    </span>
                                    {/*end::Svg Icon*/}
                                </span>
                            </span>
                            <div className="menu-sub menu-sub-dropdown w-225px px-1 py-4">
                                <div className="menu-item">
                                    <div className="menu-content">
                                        <span className="menu-section fs-5 fw-bolder ps-1 py-1">근태관리</span>
                                    </div>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="/commute/list">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">임직원 근태관리</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="/commute/mycommute">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">출퇴근 이력</span>
                                    </a>
                                </div>
                                <div className="menu-item" if="${#authentication.principal.isMaster == 1}">
                                    <a className="menu-link" href="/commute/editRequestList">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">근태 수정요청</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div data-kt-menu-trigger="click" data-kt-menu-placement="right-start"
                            data-kt-menu-flip="bottom" className="menu-item py-2">
                            <span className="menu-link menu-center" title="일정 및 예약" data-bs-toggle="tooltip"
                                data-bs-trigger="hover" data-bs-dismiss="click" data-bs-placement="right">
                                <span className="menu-icon me-0">
                                    {/*begin::Svg Icon | path: icons/duotone/Communication/More.svg*/}
                                    <span className="svg-icon svg-icon-1">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor" className="bi bi-calendar4-week"
                                            viewBox="0 0 16 16" color="#ADB5BD">
                                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z" />
                                            <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-2 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                                        </svg>
                                    </span>
                                    {/*end::Svg Icon*/}
                                </span>
                            </span>
                            <div className="menu-sub menu-sub-dropdown w-225px px-1 py-4">
                                <div className="menu-item">
                                    <div className="menu-content">
                                        <span className="menu-section fs-5 fw-bolder ps-1 py-1">캘린더</span>
                                    </div>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="/schedule">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">일정 보기</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="/meetingroom">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">회의실 예약</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div data-kt-menu-trigger="click" data-kt-menu-placement="right-start"
                            data-kt-menu-flip="bottom" className="menu-item py-2" >
                            <span className="menu-link menu-center" title="자료실 및 게시판" data-bs-toggle="tooltip"
                                data-bs-trigger="hover" data-bs-dismiss="click" data-bs-placement="right">
                                <span className="menu-icon me-0">
                                    {/*begin::Svg Icon | path: icons/duotone/Communication/More.svg*/}
                                    <span className="svg-icon svg-icon-1">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            color="#ADB5BD"
                                            fill="currentColor" className="bi bi-save2" viewBox="0 0 16 16">
                                            <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v4.5h2a.5.5 0 0 1 .354.854l-2.5 2.5a.5.5 0 0 1-.708 0l-2.5-2.5A.5.5 0 0 1 5.5 6.5h2V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
                                        </svg>
                                    </span>
                                    {/*end::Svg Icon*/}
                                </span>
                            </span>
                            <div className="menu-sub menu-sub-dropdown w-225px px-1 py-4">
                                <div className="menu-item">
                                    <div className="menu-content">
                                        <span className="menu-section fs-5 fw-bolder ps-1 py-1">자료실 및 게시판</span>
                                    </div>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="/dataroom/list">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">자료실</span>
                                    </a>
                                </div>
                                <div className="menu-item">
                                    <a className="menu-link" href="/board/list">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title">자유게시판</span>
                                    </a>
                                </div>
                            </div>
                        </div>
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