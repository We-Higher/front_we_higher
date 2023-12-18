import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ApprovalList1 from './ApprovalList1';
import ApprovalList2 from './ApprovalList2';

const VacationEdit = () => {

    const n = useParams().num;
    const token = sessionStorage.getItem("token");
    const myPort = process.env.REACT_APP_MY_PORT;
    const [member, setDto] = useState({});
    const [dto, setDto2] = useState({});

    const navigate = useNavigate();

    const onChange = (e) => {
        const { name, value } = e.target;
        setDto2({
            ...dto,
            [name]: value
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:${myPort}/auth/approval/vacation/editread/` + n, { headers: { Authorization: token } })
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
        axios.post(`http://localhost:${myPort}/auth/approval/vacation/approve`,
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
        axios.post(`http://localhost:${myPort}/auth/approval/vacation/refuse`,
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

        <div>
            <span
                style={{
                    fontFamily: '"맑은 고딕"',
                    fontSize: "10pt",
                    lineHeight: "normal",
                    marginTop: 0,
                    marginBottom: 0
                }}
            >
                <table
                    style={{
                        border: "0px solid rgb(0, 0, 0)",
                        width: 800,
                        fontFamily: "malgun gothic, dotum, arial, tahoma",
                        marginTop: 1,
                        borderCollapse: "collapse"
                    }}
                >
                    {/* Header */}
                    <colgroup>
                        <col width={310} />
                        <col width={490} />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td
                                style={{
                                    background: "white",
                                    padding: "0px !important",
                                    border: "0px currentColor",
                                    height: 90,
                                    textAlign: "center",
                                    color: "black",
                                    fontSize: 36,
                                    fontWeight: "bold",
                                    verticalAlign: "top"
                                }}
                                colSpan={2}
                                className="dext_table_border_t dext_table_border_r dext_table_border_b dext_table_border_l"
                            >
                                휴가원
                                {dto.rstatus == -1 && (
                                    <img
                                        src="/refuse.png"
                                        style={{ position: 'absolute', width: '130px', height: '130px', marginLeft: '-500px', marginTop: '-50px' }}
                                        alt="Refuse Image"
                                    />
                                )}
                                {dto.status == 2 && (
                                    <img
                                        src="/fapprove.png"
                                        style={{ position: 'absolute', width: '130px', height: '130px', marginLeft: '-500px', marginTop: '-50px' }}
                                        alt="Refuse Image"
                                    />
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    background: "white",
                                    padding: "0px !important",
                                    border: "currentColor",
                                    textAlign: "left",
                                    color: "black",
                                    fontSize: 12,
                                    fontWeight: "normal",
                                    verticalAlign: "top"
                                }}
                            >
                                <table
                                    style={{
                                        border: "1px solid rgb(0, 0, 0)",
                                        fontFamily: "malgun gothic, dotum, arial, tahoma",
                                        marginTop: 1,
                                        borderCollapse: "collapse"
                                    }}
                                >
                                    {/* User */}
                                    <colgroup>
                                        <col width={100} />
                                        <col width={220} />
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <td
                                                style={{
                                                    background: "rgb(221, 221, 221)",
                                                    padding: 5,
                                                    border: "1px solid black",
                                                    height: 18,
                                                    textAlign: "center",
                                                    color: "rgb(0, 0, 0)",
                                                    fontSize: 12,
                                                    fontWeight: "bold",
                                                    verticalAlign: "middle",
                                                }}
                                            >
                                                기안자
                                            </td>
                                            <td
                                                style={{
                                                    background: "rgb(255, 255, 255)",
                                                    padding: 5,
                                                    border: "1px solid black",
                                                    textAlign: "left",
                                                    color: "rgb(0, 0, 0)",
                                                    fontSize: 12,
                                                    fontWeight: "normal",
                                                    verticalAlign: "middle",
                                                    borderWidth: 1,
                                                    borderStyle: 'solid',
                                                    borderColor: 'black'
                                                }}
                                            >
                                                <span
                                                    unselectable="on"
                                                    contentEditable="false"
                                                    className="comp_wrap"
                                                    data-cid={11}
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
                                                >
                                                    {member.name}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style={{
                                                    background: "rgb(221, 221, 221)",
                                                    padding: 5,
                                                    border: "1px solid black",
                                                    height: 18,
                                                    textAlign: "center",
                                                    color: "rgb(0, 0, 0)",
                                                    fontSize: 12,
                                                    fontWeight: "bold",
                                                    verticalAlign: "middle"
                                                }}
                                            >
                                                기안부서
                                            </td>
                                            <td
                                                style={{
                                                    background: "rgb(255, 255, 255)",
                                                    padding: 5,
                                                    border: "1px solid black",
                                                    textAlign: "left",
                                                    color: "rgb(0, 0, 0)",
                                                    fontSize: 12,
                                                    fontWeight: "normal",
                                                    verticalAlign: "middle"
                                                }}
                                            >
                                                <span
                                                    unselectable="on"
                                                    contentEditable="false"
                                                    className="comp_wrap"
                                                    data-cid={12}
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
                                        </tr>
                                        <tr>
                                            <td
                                                style={{
                                                    background: "rgb(221, 221, 221)",
                                                    padding: 5,
                                                    border: "1px solid black",
                                                    height: 18,
                                                    textAlign: "center",
                                                    color: "rgb(0, 0, 0)",
                                                    fontSize: 12,
                                                    fontWeight: "bold",
                                                    verticalAlign: "middle"
                                                }}
                                            >
                                                기안일
                                            </td>
                                            <td
                                                style={{
                                                    background: "rgb(255, 255, 255)",
                                                    padding: 5,
                                                    border: "1px solid black",
                                                    textAlign: "left",
                                                    color: "rgb(0, 0, 0)",
                                                    fontSize: 12,
                                                    fontWeight: "normal",
                                                    verticalAlign: "middle"
                                                }}
                                            >
                                                <span
                                                    unselectable="on"
                                                    contentEditable="false"
                                                    className="comp_wrap"
                                                    data-cid={12}
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
                                                    {dto.wdate}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style={{
                                                    background: "rgb(221, 221, 221)",
                                                    padding: 5,
                                                    border: "1px solid black",
                                                    height: 18,
                                                    textAlign: "center",
                                                    color: "rgb(0, 0, 0)",
                                                    fontSize: 12,
                                                    fontWeight: "bold",
                                                    verticalAlign: "middle"
                                                }}
                                            >
                                                문서번호
                                            </td>
                                            <td
                                                style={{
                                                    background: "rgb(255, 255, 255)",
                                                    padding: 5,
                                                    border: "1px solid black",
                                                    textAlign: "left",
                                                    color: "rgb(0, 0, 0)",
                                                    fontSize: 12,
                                                    fontWeight: "normal",
                                                    verticalAlign: "middle"
                                                }}
                                            >
                                                <span
                                                    unselectable="on"
                                                    contentEditable="false"
                                                    className="comp_wrap"
                                                    data-cid={12}
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
                                                    {dto.vacationNum}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td
                                style={{
                                    background: "white",
                                    padding: "0px !important",
                                    border: "currentColor",
                                    textAlign: "right",
                                    color: "black",
                                    fontSize: 12,
                                    fontWeight: "normal",
                                    verticalAlign: "top"
                                }}
                            >
                                <table border="1px solid black" style={{ marginLeft: 280 }}>
                                    <tbody>
                                        <tr>
                                            <th
                                                colSpan={3}
                                                style={{ border: 0, textAlign: "center", fontSize: "math" }}
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
                                                type="text"
                                                id="approval1rankname"
                                                name="approval1rankname"
                                            >
                                                {dto.approval1rank}
                                            </td>
                                            <input
                                                type="hidden"
                                                id="approval1rank"
                                                name="approval1rank"
                                                defaultValue=""
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
                                                readOnly=""
                                                value={dto.approval1rank}
                                            />
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
                                            <input
                                                type="hidden"
                                                id="approval2rank"
                                                name="approval2rank"
                                                defaultValue=""
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
                                                readOnly=""
                                                value={dto.approval2rank}
                                            />
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
                                                {dto.status == 1 && dto.rstatus == 0 && (
                                                    <img
                                                        src="/approve.png"
                                                        style={{ position: 'absolute', width: '90px', height: '70px', marginLeft: '-63px', marginTop: '-27px' }}
                                                        alt="Approval Image"
                                                    />
                                                )}
                                                {dto.status == 1 && dto.rstatus == -1 && (
                                                    <img
                                                        src="/approve.png"
                                                        style={{ position: 'absolute', width: '90px', height: '70px', marginLeft: '-63px', marginTop: '-27px' }}
                                                        alt="Approval Image"
                                                    />
                                                )}
                                                {dto.status == 2 && dto.rstatus == 0 && (
                                                    <img
                                                        src="/approve.png"
                                                        style={{ position: 'absolute', width: '90px', height: '70px', marginLeft: '-63px', marginTop: '-27px' }}
                                                        alt="Approval Image"
                                                    />
                                                )}
                                            </td>
                                            <input
                                                type="hidden"
                                                id="app1username"
                                                name="app1username"
                                                defaultValue=""
                                                style={{
                                                    width: 65,
                                                    height: 40,
                                                    fontSize: 12,
                                                    textAlign: "center",
                                                    color: "black"
                                                }}
                                                readOnly="true"
                                                value={dto.app1username}
                                            />
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
                                                {dto.status == 2 && (
                                                    <img
                                                        src="/approve.png"
                                                        style={{ position: 'absolute', width: '90px', height: '70px', marginLeft: '-63px', marginTop: '-27px' }}
                                                        alt="Approval Image"
                                                    />
                                                )}
                                            </td>
                                            <input
                                                type="hidden"
                                                id="app2username"
                                                name="app2username"
                                                defaultValue=""
                                                style={{
                                                    width: 65,
                                                    height: 40,
                                                    fontSize: 12,
                                                    textAlign: "center",
                                                    color: "black"
                                                }}
                                                readOnly=""
                                                value={dto.app2username}
                                            />
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table
                    style={{
                        border: "0px solid rgb(0, 0, 0)",
                        width: 800,
                        fontFamily: "malgun gothic, dotum, arial, tahoma",
                        marginTop: 10,
                        borderCollapse: "collapse"
                    }}
                >
                    <colgroup>
                        <col width={200} />
                        <col width={350} />
                        <col width={200} />
                        <col width={200} />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td
                                style={{
                                    padding: 5,
                                    border: "1px solid black",
                                    height: 25,
                                    textAlign: "center",
                                    color: "rgb(0, 0, 0)",
                                    fontSize: 14,
                                    verticalAlign: "middle",
                                    backgroundColor: "rgb(221, 221, 221)"
                                }}
                                colSpan={4}
                            >
                                <span
                                    style={{
                                        fontWeight: "bold",
                                        fontFamily: '"malgun gothic", dotum, arial, tahoma',
                                        fontSize: "11pt",
                                        lineHeight: "normal",
                                        marginTop: 0,
                                        marginBottom: 0
                                    }}
                                >
                                    신청인
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    background: "rgb(221, 221, 221)",
                                    padding: 5,
                                    border: "1px solid black",
                                    height: 25,
                                    textAlign: "center",
                                    color: "rgb(0, 0, 0)",
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    verticalAlign: "middle"
                                }}
                            >
                                소속
                            </td>
                            <td
                                style={{
                                    background: "rgb(255, 255, 255)",
                                    borderWidth: "medium 1px 1px",
                                    borderStyle: "none solid solid",
                                    borderColor: "currentColor black black",
                                    padding: 5,
                                    height: 25,
                                    textAlign: "left",
                                    color: "rgb(0, 0, 0)",
                                    fontSize: 14,
                                    fontWeight: "normal",
                                    verticalAlign: "middle"
                                }}
                                colSpan={3}
                                className="dext_table_border_t"
                            >
                                <span
                                    unselectable="on"
                                    contentEditable="false"
                                    className="comp_wrap"
                                    data-cid={4}
                                    data-dsl="{{text}}"
                                    data-wrapper=""
                                    style={{
                                        width: "100%",
                                        fontFamily: '"malgun gothic", dotum, arial, tahoma',
                                        fontSize: "11pt",
                                        lineHeight: "normal",
                                        marginTop: 0,
                                        marginBottom: 0
                                    }}
                                    data-value=""
                                >
                                    {member.deptName}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    background: "rgb(221, 221, 221)",
                                    padding: 5,
                                    border: "1px solid black",
                                    height: 25,
                                    textAlign: "center",
                                    color: "rgb(0, 0, 0)",
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    verticalAlign: "middle"
                                }}
                            >
                                직책
                            </td>
                            <td
                                style={{
                                    background: "rgb(255, 255, 255)",
                                    borderWidth: "medium 1px 1px",
                                    borderStyle: "none solid solid",
                                    borderColor: "currentColor black black",
                                    padding: 5,
                                    height: 25,
                                    textAlign: "left",
                                    color: "rgb(0, 0, 0)",
                                    fontSize: 14,
                                    fontWeight: "normal",
                                    verticalAlign: "middle"
                                }}
                                colSpan={3}
                                className="dext_table_border_t"
                            >
                                <span
                                    unselectable="on"
                                    contentEditable="false"
                                    className="comp_wrap"
                                    data-cid={5}
                                    data-dsl="{{text}}"
                                    data-wrapper=""
                                    style={{
                                        width: "100%",
                                        fontFamily: '"malgun gothic", dotum, arial, tahoma',
                                        fontSize: "11pt",
                                        lineHeight: "normal",
                                        marginTop: 0,
                                        marginBottom: 0
                                    }}
                                    data-value=""
                                >
                                    {member.companyRankName}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    background: "rgb(221, 221, 221)",
                                    padding: 5,
                                    border: "1px solid black",
                                    height: 25,
                                    textAlign: "center",
                                    color: "rgb(0, 0, 0)",
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    verticalAlign: "middle"
                                }}
                            >
                                성명
                            </td>
                            <td
                                style={{
                                    background: "rgb(255, 255, 255)",
                                    borderWidth: "medium 1px 1px",
                                    borderStyle: "none solid solid",
                                    borderColor: "currentColor black black",
                                    padding: 5,
                                    height: 25,
                                    textAlign: "left",
                                    color: "rgb(0, 0, 0)",
                                    fontSize: 14,
                                    fontWeight: "normal",
                                    verticalAlign: "middle"
                                }}
                                colSpan={3}
                                className="dext_table_border_t"
                            >
                                <span
                                    unselectable="on"
                                    contentEditable="false"
                                    className="comp_wrap"
                                    data-cid={6}
                                    data-dsl="{{text}}"
                                    data-wrapper=""
                                    style={{
                                        width: "100%",
                                        fontFamily: '"malgun gothic", dotum, arial, tahoma',
                                        fontSize: "11pt",
                                        lineHeight: "normal",
                                        marginTop: 0,
                                        marginBottom: 0
                                    }}
                                    data-value=""
                                >
                                    {member.name}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    background: "rgb(221, 221, 221)",
                                    padding: 5,
                                    border: "1px solid black",
                                    height: 25,
                                    textAlign: "center",
                                    color: "rgb(0, 0, 0)",
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    verticalAlign: "middle"
                                }}
                            >
                                작성일
                            </td>
                            <td
                                style={{
                                    background: "rgb(255, 255, 255)",
                                    padding: 5,
                                    border: "1px solid black",
                                    height: 25,
                                    textAlign: "left",
                                    color: "rgb(0, 0, 0)",
                                    fontSize: 14,
                                    fontWeight: "normal",
                                    verticalAlign: "middle"
                                }}
                                colSpan={3}
                            >
                                <span
                                    unselectable="on"
                                    contentEditable="false"
                                    className="comp_wrap"
                                    data-cid={7}
                                    data-dsl="{{text}}"
                                    data-wrapper=""
                                    style={{
                                        width: "100%",
                                        fontFamily: '"malgun gothic", dotum, arial, tahoma',
                                        fontSize: "11pt",
                                        lineHeight: "normal",
                                        marginTop: 0,
                                        marginBottom: 0
                                    }}
                                    data-value=""
                                >
                                    {dto.wdate}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    background: "rgb(221, 221, 221)",
                                    padding: 5,
                                    border: "1px solid black",
                                    height: 25,
                                    textAlign: "center",
                                    color: "rgb(0, 0, 0)",
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    verticalAlign: "middle"
                                }}
                            >
                                휴가종류
                            </td>
                            <td
                                style={{
                                    background: "rgb(255, 255, 255)",
                                    padding: 5,
                                    border: "1px solid black",
                                    height: 25,
                                    textAlign: "left",
                                    color: "rgb(0, 0, 0)",
                                    fontSize: 14,
                                    fontWeight: "normal",
                                    verticalAlign: "middle"
                                }}
                                colSpan={3}
                            >
                                <span
                                    unselectable="on"
                                    contentEditable="false"
                                    className="comp_wrap"
                                    data-cid={7}
                                    data-dsl="{{text}}"
                                    data-wrapper=""
                                    style={{
                                        width: "100%",
                                        fontFamily: '"malgun gothic", dotum, arial, tahoma',
                                        fontSize: "11pt",
                                        lineHeight: "normal",
                                        marginTop: 0,
                                        marginBottom: 0
                                    }}
                                    data-value=""
                                >
                                    <span
                                        unselectable="on"
                                        contentEditable="false"
                                        className="comp_wrap"
                                        data-cid={10}
                                        data-dsl="{{cSel__연차휴가_병가_공가_출산휴가_배우자 출산휴가_기타}}"
                                        data-wrapper=""
                                        style={{
                                            fontFamily: '"malgun gothic", dotum, arial, tahoma',
                                            fontSize: "9pt"
                                        }}
                                        data-value=""
                                        data-autotype=""
                                    >
                                        <select
                                            className="editor_slt"
                                            style={{ width: "100%" }}
                                            name="type"
                                            value={dto.type} onChange={onChange} disabled
                                        >
                                            <option onSelect={onChange} selected="selected">연차휴가</option>
                                            <option onSelect={onChange}>병가</option>
                                            <option onSelect={onChange}>공가</option>
                                            <option onSelect={onChange}>출산휴가</option>
                                            <option onSelect={onChange}>배우자 출산휴가</option>
                                            <option onSelect={onChange}>기타</option>
                                        </select>
                                    </span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    background: "rgb(221, 221, 221)",
                                    padding: 5,
                                    border: "1px solid black",
                                    height: 25,
                                    textAlign: "center",
                                    color: "rgb(0, 0, 0)",
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    verticalAlign: "middle"
                                }}
                            >
                                휴가기간
                            </td>
                            <td
                                style={{
                                    background: "rgb(255, 255, 255)",
                                    padding: 5,
                                    border: "1px solid black",
                                    height: 25,
                                    textAlign: "center",
                                    color: "rgb(0, 0, 0)",
                                    fontSize: 14,
                                    verticalAlign: "middle"
                                }}
                            >
                                <span
                                    unselectable="on"
                                    contentEditable="false"
                                    className="comp_wrap"
                                    data-cid={8}
                                    data-dsl="{{period}}"
                                    data-wrapper=""
                                    style={{
                                        fontFamily: '"malgun gothic", dotum, arial, tahoma',
                                        fontSize: "11pt",
                                        lineHeight: "normal",
                                        marginTop: 0,
                                        marginBottom: 0
                                    }}
                                    data-value=""
                                >
                                    {dto.startDate}
                                    {" "}
                                    ~{" "}
                                    {dto.endDate}
                                </span>
                            </td>
                            <td
                                style={{
                                    background: "rgb(221, 221, 221)",
                                    padding: 5,
                                    border: "1px solid black",
                                    height: 25,
                                    textAlign: "center",
                                    color: "rgb(0, 0, 0)",
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    verticalAlign: "middle"
                                }}
                            >
                                잔여일
                            </td>
                            <td
                                style={{
                                    background: "rgb(255, 255, 255)",
                                    padding: 5,
                                    border: "1px solid black",
                                    height: 25,
                                    textAlign: "center",
                                    color: "rgb(0, 0, 0)",
                                    fontSize: 14,
                                    verticalAlign: "middle"
                                }}
                            >
                                <span
                                    unselectable="on"
                                    contentEditable="false"
                                    className="comp_wrap"
                                    data-cid={10}
                                    data-dsl="{{text$width:60$}}"
                                    data-wrapper=""
                                    style={{
                                        width: 60,
                                        fontFamily: '"malgun gothic", dotum, arial, tahoma',
                                        fontSize: "11pt",
                                        lineHeight: "normal",
                                        marginTop: 0,
                                        marginBottom: 0
                                    }}
                                    data-value=""
                                >
                                    {member.remain}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    background: "rgb(221, 221, 221)",
                                    padding: 5,
                                    border: "1px solid black",
                                    height: 25,
                                    textAlign: "center",
                                    color: "rgb(0, 0, 0)",
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    verticalAlign: "middle"
                                }}
                            >
                                휴가사유
                            </td>
                            <td
                                style={{
                                    background: "rgb(255, 255, 255)",
                                    borderWidth: "medium 1px 1px",
                                    borderStyle: "none solid solid",
                                    borderColor: "currentColor black black",
                                    padding: 5,
                                    height: 200,
                                    textAlign: "left",
                                    color: "rgb(0, 0, 0)",
                                    fontSize: 14,
                                    fontWeight: "normal",
                                    verticalAlign: "middle"
                                }}
                                colSpan={3}
                                className="dext_table_border_t"
                            >
                                <span
                                    unselectable="on"
                                    contentEditable="false"
                                    className="comp_wrap"
                                    data-cid={9}
                                    data-dsl="{{text}}"
                                    data-wrapper=""
                                    style={{
                                        width: "100%",
                                        fontFamily: '"malgun gothic", dotum, arial, tahoma',
                                        fontSize: "11pt",
                                        lineHeight: "normal",
                                        marginTop: 0,
                                        marginBottom: 0
                                    }}
                                    data-value=""
                                >
                                    {dto.reason}

                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    borderWidth: "medium 1px 1px",
                                    borderStyle: "none solid solid",
                                    borderColor: "currentColor black black",
                                    padding: 5,
                                    height: 100,
                                    textAlign: "center",
                                    color: "rgb(0, 0, 0)",
                                    fontSize: 14,
                                    verticalAlign: "middle",
                                    backgroundColor: "rgb(255, 255, 255)"
                                }}
                                colSpan={4}
                                className="dext_table_border_t"
                            >
                                <span
                                    style={{
                                        fontWeight: "bold",
                                        fontFamily: '"malgun gothic", dotum, arial, tahoma',
                                        fontSize: "11pt",
                                        lineHeight: "normal",
                                        marginTop: 0,
                                        marginBottom: 0
                                    }}
                                >
                                    휴가기준 제 13조에 의거 휴가를 신청하오니 허락하여 주시기
                                    바랍니다.
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </span>
            <table style={{ width: '800px', fontSize: '12px', fontFamily: 'malgun gothic, dotum, arial, tahoma' }}>
                <tbody>
                    <tr>
                        <input type="button" value="결재" style={{ marginLeft: '715px', marginTop: '5px' }} onClick={() => approve(dto.vacationNum)} />

                        <input
                            type="button"
                            value="반려"
                            style={{ marginLeft: '5px', marginTop: '5px' }}
                            onClick={() => refuse(dto.vacationNum)}
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
    )
}

export default VacationEdit;