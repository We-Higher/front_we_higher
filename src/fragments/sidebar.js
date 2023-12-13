import React from 'react';

const sidebar = () => {
    return (
        <div id="sidebar">
            {/* Aside */}
            <div id="kt_aside" className="aside aside-extended bg-white" data-kt-drawer="true" data-kt-drawer-name="aside"
                 data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true"
                 data-kt-drawer-width="auto" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_aside_toggle">
                {/* Primary */}
                <div className="aside-primary d-flex flex-column align-items-lg-center flex-row-auto">
                    {/* Logo */}
                    <div className="aside-logo d-none d-lg-flex flex-column align-items-center flex-column-auto pt-10" id="kt_aside_logo">
                        <a href="/main">
                            <img alt="Logo" src="/img/logo3.png" className="h-55px" style={{ width: '60px', height: '60px' }} />
                        </a>
                    </div>
                    <div className="aside-nav d-flex flex-column flex-lg-center flex-column-fluid w-100 pt-5 pt-lg-0" id="kt_aside_nav">
                        {/* Primary menu */}
                        <div id="kt_aside_menu"
                             className="menu menu-column menu-title-gray-600 menu-icon-gray-400 menu-state-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500 fw-bold fs-5"
                             data-kt-menu="true">
                            {/* Home */}
                            <div className="menu-item py-2">
                                <a className="menu-link nactive menu-center" href="/main" title="Home">
                                    <span className="menu-icon me-0">
                                        {/* SVG Icon: Home */}
                                        <span className="svg-icon svg-icon-1">
                                            {/* Your SVG code here */}
                                        </span>
                                        {/* End SVG Icon */}
                                    </span>
                                </a>
                            </div>
                            {/* 회원 */}
                            <div data-kt-menu-trigger="click" data-kt-menu-placement="right-start" data-kt-menu-flip="bottom"
                                 className="menu-item py-2">
                                <span className="menu-link menu-center" title="회원">
                                    <span className="menu-icon me-0">
                                        {/* SVG Icon: User */}
                                        <span className="svg-icon svg-icon-1">
                                            {/* Your SVG code here */}
                                        </span>
                                        {/* End SVG Icon */}
                                    </span>
                                </span>
                                <div className="menu-sub menu-sub-dropdown w-225px px-1 py-4">
                                    <div className="menu-item">
                                        <div className="menu-content">
                                            <span className="menu-section fs-5 fw-bolder ps-1 py-1">회원정보</span>
                                        </div>
                                    </div>
                                    {/* 내 정보 */}
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
                                                <a className="menu-link" href="/member/mypage">
                                                    <span className="menu-bullet">
                                                        <span className="bullet bullet-dot"></span>
                                                    </span>
                                                    <span className="menu-title">마이페이지</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 임직원 관리 */}
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
                            {/* 전자결재 */}
                            <div data-kt-menu-trigger="click" data-kt-menu-placement="right-start" data-kt-menu-flip="bottom"
                                 className="menu-item py-2">
                                <span className="menu-link menu-center" title="전자결재">
                                    <span className="menu-icon me-0">
                                        {/* SVG Icon: Chart */}
                                        <span className="svg-icon svg-icon-1">
                                            {/* Your SVG code here */}
                                        </span>
                                        {/* End SVG Icon */}
                                    </span>
                                </span>
                                <div className="menu-sub menu-sub-dropdown w-225px px-1 py-4">
                                    <div className="menu-item">
                                        <div className="menu-content">
                                            <span className="menu-section fs-5 fw-bolder ps-1 py-1">전자결재</span>
                                        </div>
                                    </div>
                                    {/* 결재서류 작성 */}
                                    <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                        <span className="menu-link">
                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">결재서류 작성</span>
                                            <span className="menu-arrow"></span>
                                        </span>
                                        <div className="menu-sub menu-sub-accordion">
                                            {/* 품의서 */}
                                            <div className="menu-item">
                                                <a className="menu-link" id="report">
                                                    <span className="menu-bullet">
                                                        <span className="bullet bullet-dot"></span>
                                                    </span>
                                                    <span className="menu-title">품의서</span>
                                                </a>
                                            </div>
                                            {/* 지출결의서 */}
                                            <div className="menu-item">
                                                <a className="menu-link" id="expense">
                                                    <span className="menu-bullet">
                                                        <span className="bullet bullet-dot"></span>
                                                    </span>
                                                    <span className="menu-title">지출결의서</span>
                                                </a>
                                            </div>
                                            {/* 근태신청서 */}
                                            <div className="menu-item">
                                                <a className="menu-link" id="attendance">
                                                    <span className="menu-bullet">
                                                        <span className="bullet bullet-dot"></span>
                                                    </span>
                                                    <span className="menu-title">근태신청서</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 전자결재 목록 */}
                                    <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                        <span className="menu-link">
                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">전자결재 목록</span>
                                            <span className="menu-arrow"></span>
                                        </span>
                                        <div className="menu-sub menu-sub-accordion">
                                            {/* 진행중 */}
                                            <div className="menu-item">
                                                <a className="menu-link" id="progress">
                                                    <span className="menu-bullet">
                                                        <span className="bullet bullet-dot"></span>
                                                    </span>
                                                    <span className="menu-title">진행중</span>
                                                </a>
                                            </div>
                                            {/* 완료 */}
                                            <div className="menu-item">
                                                <a className="menu-link" id="completed">
                                                    <span className="menu-bullet">
                                                        <span className="bullet bullet-dot"></span>
                                                    </span>
                                                    <span className="menu-title">완료</span>
                                                </a>
                                            </div>
                                            {/* 반려 */}
                                            <div className="menu-item">
                                                <a className="menu-link" id="rejected">
                                                    <span className="menu-bullet">
                                                        <span className="bullet bullet-dot"></span>
                                                    </span>
                                                    <span className="menu-title">반려</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 커뮤니케이션 */}
                            <div data-kt-menu-trigger="click" data-kt-menu-placement="right-start" data-kt-menu-flip="bottom"
                                 className="menu-item py-2">
                                <span className="menu-link menu-center" title="커뮤니케이션">
                                    <span className="menu-icon me-0">
                                        {/* SVG Icon: Chat */}
                                        <span className="svg-icon svg-icon-1">
                                            {/* Your SVG code here */}
                                        </span>
                                        {/* End SVG Icon */}
                                    </span>
                                </span>
                                <div className="menu-sub menu-sub-dropdown w-225px px-1 py-4">
                                    <div className="menu-item">
                                        <div className="menu-content">
                                            <span className="menu-section fs-5 fw-bolder ps-1 py-1">커뮤니케이션</span>
                                        </div>
                                    </div>
                                    {/* 공지사항 */}
                                    <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                        <span className="menu-link">
                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">공지사항</span>
                                            <span className="menu-arrow"></span>
                                        </span>
                                        <div className="menu-sub menu-sub-accordion">
                                            <div className="menu-item">
                                                <a className="menu-link" href="/communication/notice">
                                                    <span className="menu-bullet">
                                                        <span className="bullet bullet-dot"></span>
                                                    </span>
                                                    <span className="menu-title">공지사항</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 자유게시판 */}
                                    <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                        <span className="menu-link">
                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">자유게시판</span>
                                            <span className="menu-arrow"></span>
                                        </span>
                                        <div className="menu-sub menu-sub-accordion">
                                            <div className="menu-item">
                                                <a className="menu-link" href="/communication/freeboard">
                                                    <span className="menu-bullet">
                                                        <span className="bullet bullet-dot"></span>
                                                    </span>
                                                    <span className="menu-title">자유게시판</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 기타 */}
                            <div data-kt-menu-trigger="click" data-kt-menu-placement="right-start" data-kt-menu-flip="bottom"
                                 className="menu-item py-2">
                                <span className="menu-link menu-center" title="기타">
                                    <span className="menu-icon me-0">
                                        {/* SVG Icon: Gear */}
                                        <span className="svg-icon svg-icon-1">
                                            {/* Your SVG code here */}
                                        </span>
                                        {/* End SVG Icon */}
                                    </span>
                                </span>
                                <div className="menu-sub menu-sub-dropdown w-225px px-1 py-4">
                                    <div className="menu-item">
                                        <div className="menu-content">
                                            <span className="menu-section fs-5 fw-bolder ps-1 py-1">기타</span>
                                        </div>
                                    </div>
                                    {/* 계정설정 */}
                                    <div className="menu-item">
                                        <a className="menu-link" href="/settings/account">
                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">계정설정</span>
                                        </a>
                                    </div>
                                    {/* 로그아웃 */}
                                    <div className="menu-item">
                                        <a className="menu-link" href="/logout">
                                            <span className="menu-bullet">
                                                <span className="bullet bullet-dot"></span>
                                            </span>
                                            <span className="menu-title">로그아웃</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Secondary toggle */}
                    <div className="aside-secondary d-flex flex-column align-items-center pe-3 pe-lg-0">
                        {/* 확대 / 축소 토글 */}
                        <div className="btn btn-icon btn-active-color-primary" id="kt_aside_toggle">
                            {/* SVG Icon */}
                            <span className="svg-icon svg-icon-2x mt-1">
                                {/* Your SVG code here */}
                            </span>
                            {/* End SVG Icon */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default sidebar;