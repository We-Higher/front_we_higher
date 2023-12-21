import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const ReportEdit = () => {

    const n = useParams().num;
    const token = sessionStorage.getItem("token");
    const myPort = process.env.REACT_APP_MY_PORT;
    const [member, setDto] = useState({});
    const [dto, setDto2] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:${myPort}/auth/approval/report/editread/` + n, { headers: { Authorization: token } })
            .then(function (res) {
                if (res.status === 200) {
                    setDto(res.data.dto.member);
                    setDto2(res.data.dto);
                } else {
                    alert('error:' + res.status);
                }
            })
            .catch(function (error) {
                alert("오류: " + error.message);
            });
        return () => {
        };
    }, []);

    const approve = (num) => {
        axios.post(`http://localhost:${myPort}/auth/approval/report/approve`,
            {},
            {
                headers: { Authorization: token },
                params: { num: num }
            })
            .then(function (res) {
                if (res.status === 200) {
                    navigate('/approval/process')
                } else {
                    alert('error:' + res.status);
                }
            })
    }

    const refuse = (num) => {
        axios.post(`http://localhost:${myPort}/auth/approval/report/refuse`,
            {},
            {
                headers: { Authorization: token },
                params: { num: num }
            })
            .then(function (res) {
                if (res.status === 200) {
                    navigate('/approval/process')
                } else {
                    alert('error:' + res.status);
                }
            })
    }

    const back = () => {
        navigate(-1);
    };

    return (
        <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="row">
                <div className="col-md-12" >
                    <div className="card">
                        <span
                            style={{
                                fontFamily: '"맑은 고딕"',
                                fontSize: "10pt",
                                lineHeight: "normal",
                                marginTop: 0,
                                marginBottom: 0
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: '"맑은 고딕"',
                                    fontSize: "10pt",
                                    lineHeight: "normal",
                                    marginTop: 0,
                                    marginBottom: 0
                                }}
                            >
                                {/* 문서 헤더 시작*/}
                                <table
                                    style={{
                                        width: 800,
                                        borderCollapse: "collapse !important",
                                        color: "black",
                                        background: "white",
                                        border: "1px solid black",
                                        fontSize: 12,
                                        fontFamily: "malgun gothic,dotum,arial,tahoma"
                                    }}
                                >
                                    <colgroup>
                                        <col style={{ width: 90 }} />
                                        <col style={{ width: 180 }} />
                                        <col style={{ width: 90 }} />
                                        <col style={{ width: 120 }} />
                                        <col style={{ width: 90 }} />
                                        <col style={{}} />
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <td
                                                style={{
                                                    padding: 3,
                                                    border: "1px solid black",
                                                    height: "90px !important",
                                                    fontSize: 27,
                                                    fontWeight: "bold",
                                                    textAlign: "center",
                                                    verticalAlign: "middle"
                                                }}
                                                colSpan={2}
                                            >
                                                품 &nbsp;의 &nbsp;서
                                                {dto.rstatus === -1 && (
                                                    <img
                                                        src="/refuse.png"
                                                        style={{ position: 'absolute', width: '130px', height: '130px', marginLeft: '-250px', marginTop: '-90px' }}
                                                        alt="Refuse Image"
                                                    />
                                                )}
                                                {dto.status === 2 && (
                                                    <img
                                                        src="/fapprove.png"
                                                        style={{ position: 'absolute', width: '130px', height: '130px', marginLeft: '-250px', marginTop: '-90px' }}
                                                        alt="Refuse Image"
                                                    />
                                                )}
                                            </td>
                                            <td
                                                style={{
                                                    padding: 10,
                                                    height: 20,
                                                    marginLeft: "vertical-align: middle",
                                                    border: "1px solid black",
                                                    textAlign: "center"
                                                }}
                                                colSpan={4}
                                            >
                                                <table border="1px solid black" style={{ marginLeft: 300 }}>
                                                    <tbody>
                                                        <tr>
                                                            <th
                                                                colSpan={3}
                                                                style={{ border: 0, textAlign: "center", fontSize: 15 }}
                                                            >
                                                                [결재선]
                                                            </th>
                                                        </tr>
                                                        <tr style={{ textAlign: "center", fontSize: "small" }}>
                                                            <td style={{
                                                                width: 70,
                                                                height: 20,
                                                                fontSize: 12,
                                                                textAlign: "center",
                                                                borderWidth: 1,
                                                                borderStyle: 'solid',
                                                                borderColor: 'black'
                                                            }}>기안자</td>
                                                            <td style={{
                                                                width: 70,
                                                                height: 20,
                                                                fontSize: 12,
                                                                textAlign: "center",
                                                                borderWidth: 1,
                                                                borderStyle: 'solid',
                                                                borderColor: 'black'
                                                            }}
                                                                input type="text"
                                                                id="approval1rankname"
                                                                name="approval1rankname"
                                                            >
                                                                {dto.approval1rank}
                                                            </td>
                                                            <td style={{
                                                                width: 70,
                                                                height: 20,
                                                                fontSize: 12,
                                                                textAlign: "center",
                                                                borderWidth: 1,
                                                                borderStyle: 'solid',
                                                                borderColor: 'black'
                                                            }}
                                                                type="text"
                                                                id="approval2rankname"
                                                                name="approval2rankname"
                                                            >
                                                                {dto.approval2rank}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td
                                                                style={{
                                                                    width: 70,
                                                                    height: 40,
                                                                    fontSize: 12,
                                                                    textAlign: "center",
                                                                    borderWidth: 1,
                                                                    borderStyle: 'solid',
                                                                    borderColor: 'black'
                                                                }}
                                                            >
                                                                {member.name}
                                                            </td>
                                                            <td
                                                                style={{
                                                                    width: 65,
                                                                    height: 40,
                                                                    fontSize: 12,
                                                                    textAlign: "center",
                                                                    color: "black",
                                                                    borderWidth: 1,
                                                                    borderStyle: 'solid',
                                                                    borderColor: 'black'
                                                                }}
                                                                id="ap1"
                                                            >
                                                                {dto.approval1}
                                                                {dto.status === 1 && dto.rstatus === 0 && (
                                                                    <img
                                                                        src="/approve.png"
                                                                        style={{ position: 'absolute', width: '90px', height: '70px', marginLeft: '-63px', marginTop: '-27px' }}
                                                                        alt="Approval Image"
                                                                    />
                                                                )}
                                                                {dto.status === 1 && dto.rstatus === -1 && (
                                                                    <img
                                                                        src="/approve.png"
                                                                        style={{ position: 'absolute', width: '90px', height: '70px', marginLeft: '-63px', marginTop: '-27px' }}
                                                                        alt="Approval Image"
                                                                    />
                                                                )}
                                                                {dto.status === 2 && dto.rstatus === 0 && (
                                                                    <img
                                                                        src="/approve.png"
                                                                        style={{ position: 'absolute', width: '90px', height: '70px', marginLeft: '-63px', marginTop: '-27px' }}
                                                                        alt="Approval Image"
                                                                    />
                                                                )}
                                                            </td>
                                                            <td
                                                                style={{
                                                                    width: 65,
                                                                    height: 40,
                                                                    fontSize: 12,
                                                                    textAlign: "center",
                                                                    color: "black",
                                                                    borderWidth: 1,
                                                                    borderStyle: 'solid',
                                                                    borderColor: 'black'
                                                                }}
                                                                id="ap2"
                                                            >
                                                                {dto.approval2}

                                                                {dto.status === 2 && (
                                                                    <img
                                                                        src="/approve.png"
                                                                        style={{ position: 'absolute', width: '90px', height: '70px', marginLeft: '-63px', marginTop: '-27px' }}
                                                                        alt="Approval Image"
                                                                    />
                                                                )}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style={{
                                                    padding: 3,
                                                    height: 20,
                                                    verticalAlign: "middle",
                                                    border: "1px solid black",
                                                    textAlign: "center",
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                기안부서
                                            </td>
                                            <td
                                                style={{
                                                    padding: 3,
                                                    height: 20,
                                                    verticalAlign: "middle",
                                                    border: "1px solid black",
                                                    textAlign: "left"
                                                }}
                                            >
                                                <span
                                                    unselectable="on"
                                                    contentEditable="false"
                                                    className="comp_wrap"
                                                    data-cid={8}
                                                    data-dsl="{{label:draftDept}}"
                                                    data-wrapper=""
                                                    style={{
                                                        fontFamily: '"malgun gothic", dotum, arial, tahoma',
                                                        fontSize: "9pt",
                                                        lineHeight: "normal",
                                                        marginTop: 0,
                                                        marginBottom: 0
                                                    }}
                                                    data-value=""
                                                    data-autotype=""
                                                >
                                                    {member.deptName}
                                                </span>
                                            </td>
                                            <td
                                                style={{
                                                    padding: 3,
                                                    height: 20,
                                                    verticalAlign: "middle",
                                                    border: "1px solid black",
                                                    textAlign: "center",
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                기 안 일
                                            </td>
                                            <td
                                                style={{
                                                    padding: 3,
                                                    height: 20,
                                                    verticalAlign: "middle",
                                                    border: "1px solid black",
                                                    textAlign: "left"
                                                }}
                                            >
                                                <span
                                                    unselectable="on"
                                                    contentEditable="false"
                                                    className="comp_wrap"
                                                    data-cid={10}
                                                    data-dsl="{{label:draftDate}}"
                                                    data-wrapper=""
                                                    style={{
                                                        fontFamily: '"malgun gothic", dotum, arial, tahoma',
                                                        fontSize: "9pt",
                                                        lineHeight: "normal",
                                                        marginTop: 0,
                                                        marginBottom: 0
                                                    }}
                                                    data-value=""
                                                    data-autotype=""
                                                >
                                                    {dto.wdate}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style={{
                                                    padding: 3,
                                                    height: 20,
                                                    verticalAlign: "middle",
                                                    border: "1px solid black",
                                                    textAlign: "center",
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                기 안 자
                                            </td>
                                            <td
                                                style={{
                                                    padding: 3,
                                                    height: 20,
                                                    verticalAlign: "middle",
                                                    border: "1px solid black",
                                                    textAlign: "left"
                                                }}
                                            >
                                                <span
                                                    unselectable="on"
                                                    contentEditable="false"
                                                    className="comp_wrap"
                                                    data-cid={9}
                                                    data-dsl="{{label:draftUser}}"
                                                    data-wrapper=""
                                                    style={{
                                                        fontFamily: '"malgun gothic", dotum, arial, tahoma',
                                                        fontSize: "9pt",
                                                        lineHeight: "normal",
                                                        marginTop: 0,
                                                        marginBottom: 0
                                                    }}
                                                    data-value=""
                                                    data-autotype=""
                                                    value={member.name}
                                                >
                                                    {member.name}
                                                </span>
                                            </td>
                                            <td
                                                style={{
                                                    padding: 3,
                                                    height: 20,
                                                    verticalAlign: "middle",
                                                    border: "1px solid black",
                                                    textAlign: "center",
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                보존년한
                                            </td>
                                            <td
                                                style={{
                                                    padding: 3,
                                                    height: 20,
                                                    verticalAlign: "middle",
                                                    border: "1px solid black",
                                                    textAlign: "left"
                                                }}
                                            >
                                                <span
                                                    unselectable="on"
                                                    contentEditable="false"
                                                    className="comp_wrap"
                                                    data-cid={11}
                                                    data-dsl="{{label:preserveDuration}}"
                                                    data-wrapper=""
                                                    style={{
                                                        fontFamily: '"malgun gothic", dotum, arial, tahoma',
                                                        fontSize: "9pt",
                                                        lineHeight: "normal",
                                                        marginTop: 0,
                                                        marginBottom: 0
                                                    }}
                                                    data-value=""
                                                    data-autotype=""
                                                >
                                                    <select
                                                        className="editor_slt"
                                                        style={{ width: "100%" }}
                                                        name="serviceLife"
                                                        defaultValue="1년"
                                                        value={dto.serviceLife}
                                                        disabled
                                                    >
                                                        <option value={'1년'} selected="selected">1년</option>
                                                        <option value={'3년'} >3년</option>
                                                        <option value={'5년'} >5년</option>
                                                    </select>
                                                </span>
                                            </td>
                                            <td
                                                style={{
                                                    padding: 3,
                                                    height: 20,
                                                    verticalAlign: "middle",
                                                    border: "1px solid black",
                                                    textAlign: "center",
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                비밀등급
                                            </td>
                                            <td
                                                style={{
                                                    padding: 3,
                                                    height: 20,
                                                    verticalAlign: "middle",
                                                    border: "1px solid black",
                                                    textAlign: "left"
                                                }}
                                            >
                                                <span
                                                    unselectable="on"
                                                    contentEditable="false"
                                                    className="comp_wrap"
                                                    data-cid={13}
                                                    data-dsl="{{label:securityLevel}}"
                                                    data-wrapper=""
                                                    style={{
                                                        fontFamily: '"malgun gothic", dotum, arial, tahoma',
                                                        fontSize: "9pt",
                                                        lineHeight: "normal",
                                                        marginTop: 0,
                                                        marginBottom: 0
                                                    }}
                                                    data-value=""
                                                    data-autotype=""
                                                >
                                                    <select
                                                        className="editor_slt"
                                                        style={{ width: "100%" }}
                                                        name="classification"
                                                        defaultValue="1등급"
                                                        value={dto.classification}
                                                        disabled
                                                    >
                                                        <option>1등급</option>
                                                        <option>2등급</option>
                                                        <option>3등급</option>
                                                        <option>4등급</option>
                                                        <option>5등급</option>
                                                    </select>
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                {/* 문서 헤더 끝*/}
                                {/* 마진 시작*/}
                                <table
                                    style={{
                                        width: 800,
                                        borderCollapse: "collapse",
                                        borderSpacing: 0,
                                        border: "1px solid black"
                                    }}
                                >
                                    <tbody>
                                        <tr>
                                            <td
                                                style={{
                                                    padding: "0px !important",
                                                    height: 10,
                                                    verticalAlign: "middle",
                                                    border: "1px solid black",
                                                    fontSize: 9
                                                }}
                                            >
                                                <p
                                                    style={{
                                                        fontFamily: '"맑은 고딕"',
                                                        fontSize: "7pt",
                                                        lineHeight: 1,
                                                        marginTop: 0,
                                                        marginBottom: 0
                                                    }}
                                                >
                                                    <br />
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table
                                    style={{
                                        width: 800,
                                        borderCollapse: "collapse !important",
                                        color: "black",
                                        background: "white",
                                        border: "1px solid black",
                                        fontSize: 12,
                                        fontFamily: "malgun gothic,dotum,arial,tahoma"
                                    }}
                                >
                                    <colgroup>
                                        <col style={{ width: 90 }} />
                                        <col style={{ width: 710 }} />
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <td
                                                style={{
                                                    padding: 3,
                                                    height: 20,
                                                    verticalAlign: "middle",
                                                    border: "1px solid black",
                                                    textAlign: "center",
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                제 &nbsp;&nbsp;&nbsp; 목
                                            </td>
                                            <td
                                                style={{
                                                    padding: 3,
                                                    height: 20,
                                                    verticalAlign: "middle",
                                                    border: "1px solid black",
                                                    textAlign: "left"
                                                }}
                                            >
                                                <span
                                                    unselectable="on"
                                                    contentEditable="false"
                                                    className="comp_wrap"
                                                    data-cid={6}
                                                    data-dsl="{{text:subject}}"
                                                    data-wrapper=""
                                                    style={{
                                                        width: "100%",
                                                        fontFamily: '"malgun gothic", dotum, arial, tahoma',
                                                        fontSize: "9pt",
                                                        lineHeight: "normal",
                                                        marginTop: 0,
                                                        marginBottom: 0
                                                    }}
                                                    data-value=""
                                                >
                                                    {dto.title}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style={{
                                                    padding: 3,
                                                    height: 540,
                                                    verticalAlign: "top",
                                                    border: "1px solid black"
                                                }}
                                                colSpan={2}
                                            >
                                                <span
                                                    unselectable="on"
                                                    contentEditable="false"
                                                    className="comp_wrap"
                                                    data-cid={7}
                                                    data-dsl="{{editor}}"
                                                    data-wrapper=""
                                                    style={{
                                                        width: "100%",
                                                        fontFamily: '"malgun gothic", dotum, arial, tahoma',
                                                        fontSize: "9pt",
                                                        lineHeight: "normal",
                                                        marginTop: 0,
                                                        marginBottom: 0
                                                    }}
                                                    data-value=""
                                                >   <br />
                                                    {dto.content}
                                                </span>
                                                <br />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                {/* 제목 및 내용 끝 */}
                                {/* 푸터*/}
                                <table
                                    style={{
                                        width: 800,
                                        fontSize: 12,
                                        fontFamily: "malgun gothic,dotum,arial,tahoma"
                                    }}
                                >
                                    <tbody>
                                        <tr></tr>
                                    </tbody>
                                </table>
                                {/* 푸터 끝*/}
                            </span>
                            <p
                                style={{
                                    fontFamily: '"맑은 고딕"',
                                    fontSize: "10pt",
                                    lineHeight: 20,
                                    marginTop: 0,
                                    marginBottom: 0
                                }}
                            />
                        </span>
                        <table style={{ width: '800px', fontSize: '12px', fontFamily: 'malgun gothic, dotum, arial, tahoma' }}>
                            <tbody>
                                <tr>
                                    <input type="button" value="결재" style={{ marginLeft: '715px', marginTop: '5px' }} onClick={() => approve(dto.reportNum)} />

                                    <input
                                        type="button"
                                        value="반려"
                                        style={{ marginLeft: '5px', marginTop: '5px' }}
                                        onClick={() => refuse(dto.reportNum)}
                                        id="defer"
                                    />
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <Link onClick={back} className="btn btn-secondary" style={{ fontSize: '13px', marginLeft: '360px', marginTop: '30px' }}>
                                목록
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportEdit;