import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import '../../css/QuoteComponent.css';
import '../../css/style.bundle.css';
import MonthMember from "../employee/MonthMember";

export default function Main() {
    const token = sessionStorage.getItem("token");
    const quotes = [
        "대부분의 사람은 마음먹은 만큼 행복하다.",
        "행복하게 여행하려면 가볍게 여행해야 한다.",
        "인생은 과감한 모험이던가, 아니면 아무 것도 아니다.",
        "인생은 서두르는 것 말고도 더 많은 것이 있다.",
        "작은 변화가 일어날 때 진정한 삶을 살게 된다.",
        "영원히 살 것처럼 꿈꾸고 오늘 죽을 것처럼 살아라.",
        "우리는 젊을 때에 배우고 나이가 들어서 이해한다.",
        "늘 행복하고 지혜로운 사람이 되려면 자주 변해야 한다.",
        "인생은 가까이서 보면 비극이지만 멀리서 보면 희극이다.",
        "눈물을 흘리지 마라, 화내지 마라, 이해하라.",
    ];

    const quoteContent = [
        "-에이브러햄 링컨-",
        "-생텍쥐페리-",
        "-헬렌 켈러-",
        "-마흐트마 간디-",
        "-레포 톨스토이-",
        "-제임스 딘-",
        "-마리 폰 에브너 에셴바흐-",
        "-공자-",
        "-찰리 채플린-",
        "-스피노자-",
    ];

    const [refresh, setRefresh] = useState(1);
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [quoteContentIndex, setQuoteContentIndex] = useState(0);
    const myPort = process.env.REACT_APP_MY_PORT;
    const [list, setList] = useState([]);
    const [list2, setList2] = useState([]);
    const [mdto, setDto] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:${myPort}/auth/notify/list`, { headers: { Authorization: token } })
            .then(
                function (res) {
                    if (res.status === 200) {
                        setList(res.data.list);
                        let m = res.data.mdto;
                        setDto({
                            ismaster: m.isMaster,
                        })
                    } else {
                        alert('error:' + res.status);
                    }
                }
            );

        axios.get(`http://localhost:${myPort}/monthMemberList`, { headers: { Authorization: token } })
            .then(function (res) {
                if (res.status === 200) {
                    setList2(res.data.list);
                    let m = res.data.mdto;
                    setDto({
                        ismaster: m.isMaster,
                        monthMember: m.monthMember
                    });
                } else {
                    alert('error:' + res.status);
                }
            });
    }, [refresh]);

    useEffect(() => {
        const interval = setInterval(() => {
            setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [quotes]);


    useEffect(() => {
        const interval = setInterval(() => {
            setQuoteContentIndex((prevIndex) => (prevIndex + 1) % quoteContent.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [quoteContent]);


    const [showModal, setShowModal] = useState();

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    window.empref = () => {
        setRefresh(refresh => refresh * -1);
      };

    return (
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
            {/* <!--begin::Container--> */}
            <div className="container" id="kt_content_container">
                {/* <!--begin::Row--> */}
                <div className="row g-5 gx-xxl-8 mb-xxl-3">
                    {/* <!--begin::Col--> */}
                    <div className="col-xxl-5">
                        {/* <!--begin::Engage Widget 1--> */}
                        <div className="card card-xxl-stretch">
                            {/* <!--begin::Card body--> */}
                            <div className="card-body d-flex flex-column justify-content-between h-550px">
                                {/* <!--begin::Section--> */}
                                <div className="pt-12">
                                    {/* <!--begin::Title--> */}
                                    <h3 className="text-dark text-center fs-1 fw-boldest line-height-lg">공지사항</h3>
                                    {/* <!--end::Title--> */}
                                    {/* <!--begin::Text--> */}
                                    <div className="text-center text-gray-600 fs-5 fw-bold pt-4">
                                        <table id="kt_datatable_example_2"
                                            className="table table-striped table-row-bordered gy-5 gs-7">
                                            <thead>
                                                <tr className="fw-bold fs-6 text-gray-800">
                                                    <th>제목</th>
                                                    <th>작성일</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list.map((b) => (
                                                    <tr>
                                                        <td>
                                                            <Link to={`/notify/detail/${b.num}`} className="link">
                                                                {b.title}
                                                            </Link><span className="badge badge-pro badge-light-danger fw-bold fs-9 px-2 py-1 ms-1">중 요!</span>
                                                        </td>
                                                        <td>{b.wdate}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* <!--end::Text--> */}
                                    {/* <!--begin::Action--> */}
                                    <div className="text-center py-7 mb-18">
                                        <Link to='/notify/list' className="btn btn-primary fs-6 px-6"
                                            data-bs-target="#kt_modal_create_app">전체 공지사항</Link>
                                    </div>
                                    {/* <!--end::Action--> */}
                                </div>
                                {/* <!--end::Section--> */}
                            </div>
                            {/* <!--end::Card body--> */}
                        </div>
                        {/* <!--end::Engage Widget 1--> */}
                    </div>
                    {/* <!--end::Col--> */}
                    {/* <!--begin::Col--> */}
                    <div className="col-xxl-7">
                        {/* <!--begin::Chart Widget 1--> */}
                        <div className="card card-xxl-stretch mb-5 mb-xxl-8">
                            {/* <!--begin::Card header--> */}
                            <div className="card-header border-0 pt-5">
                                {/* <!--begin::Card title--> */}
                                <h3 className="card-title align-items-start flex-column">
                                    <span className="card-label fw-boldest fs-3 text-dark">이달의 우수직원</span>
                                    <span className="text-gray-400 mt-2 fw-bold fs-6">Employee of the Month</span>
                                </h3>
                                {/* <!--end::Card title--> */}
                                <div className="card-header cursor-pointer d-flex justify-content-between align-items-center">
                                    <MonthMember
                                        show={showModal}
                                        onHide={closeModal}
                                    />
                                    {(mdto.ismaster === 1) && (
                                        <div
                                            className="btn btn-icon btn-active-light-primary w-60px h-60px w-md-60px h-md-60px align-self-center btn-person-plus-fill"
                                            data-kt-menu-trigger="click" data-kt-menu-attach="parent"
                                            data-kt-menu-placement="bottom-end" data-kt-menu-flip="bottom">
                                            <i className="bi bi-person-plus-fill" onClick={() => openModal()}>선택하기</i>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* <!--end::Header--> */}
                            <div className="card-body p-0">
                                {/* <!--begin::Tab content--> */}
                                <div className="tab-content pt-10">
                                    {/* <!--begin::Tab pane--> */}
                                    <div className="tab-pane fade active show" id="kt_chart_widget_1_tab_pane_1">
                                        {/* <!--begin::Row--> */}
                                        <div className="row p-0 px-9">
                                            {list2.map((m, index) => (
                                                <div key={index} className="col-3">
                                                    {/* <!--begin::Stat--> */}
                                                    <div className="border border-dashed border-gray-300 text-center min-w-75px rounded pb-4 my-3">
                                                        {m.monthMember === 1 && (
                                                            <>
                                                                {(m.originFname === null) ? (
                                                                    <img src='/default.png' className="card-img-top"/>
                                                                ) : (
                                                                    <img src={`http://localhost:${myPort}/image/${m.originFname}`} className="card-img-top custom-card-image" />
                                                                )}

                                                                <span className="fs-5 fw-bold text-gray-400 d-block">
                                                                    {m.deptName}
                                                                </span>
                                                                <span className="fs-2 fw-boldest text-gray-800">
                                                                    {m.name}
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                    {/* <!--end::Stat--> */}
                                                </div>
                                            ))}
                                            {/* <!--end::Col--> */}
                                        </div>
                                        {/* <!--end::Row--> */}
                                    </div>
                                    {/* <!--end::Tab pane--> */}
                                </div>
                                {/* <!--end::Tab content--> */}
                            </div>
                            {/* <!--end::Card Body--> */}
                        </div>
                        {/* <!--end::Chart Widget 1--> */}
                    </div>
                    {/* <!--end::Col--> */}
                </div>
                {/* <!--end::Row--> */}
                <div className="row g-5 gx-xxl-8 mb-xxl-3">
                    {/* <!--begin::Col--> */}
                    <div className="col-xxl-12">
                        {/* <!--begin::Engage Widget 1--> */}
                        <div className="card card-xxl-stretch">
                            {/* <!--begin::Card body--> */}
                            <div className="card-body d-flex flex-column justify-content-between h-150px">
                                {/* <!--begin::Section--> */}
                                <div className="pt-4">
                                    {/* <!--begin::Title--> */}
                                    <h3 className="text-dark text-lg-start fs-1 fw-boldest mb-7">한 줄 명언</h3>
                                    {/* <p className="quote-fade">{quotes[quoteIndex]}      {quoteContent[quoteContentIndex]}</p> */}
                                    {/* <span id="quote" className="quote-container fw-bold fs-3 text-gray-800">{quotes[quoteIndex]}</span>
                                    <span id="quoteContent" className="quote-content fw-bold fs-3 text-gray-800">{quoteContent[quoteContentIndex]}</span> */}
                                    <span id="quotekk" className="quotekk">{quotes[quoteIndex]}</span>
                                    <span id="quoteContent" className="quoteContent">{quoteContent[quoteContentIndex]}</span>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--end::Container--> */}
        </div >
    );
}