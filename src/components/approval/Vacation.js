import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ApprovalList1 from './ApprovalList1';
import ApprovalList2 from './ApprovalList2';
import { API_BASE_URL } from "../../common/util";

const Vacation = () => {
    const token = sessionStorage.getItem("token");
    const myPort = process.env.REACT_APP_MY_PORT;
    const [mdto, setDto] = useState({});
    const [dto, setDto2] = useState({
        writer: sessionStorage.getItem('loginid'), type: '', startDate: '', endDate: '',
        reason: '', wdate: '', approval1: '', approval2: '', approval1rank: '',
        approval2rank: '', app1username: '', app1username: '', app2username: '',
    });

    const navigate = useNavigate();
    const { writer, type, startDate, endDate, reason, wdate, approval1,
        approval2, approval1rank, approval2rank, app1username, app2username } = dto;

    const onChange = (e) => {
        const { name, value } = e.target;
        setDto2({
            ...dto,
            [name]: value
        })
    }

    useEffect(() => {
        axios.get(`${API_BASE_URL}/auth/approval/vacation`, { headers: { Authorization: token } })
            .then(function (res) {
                if (res.status === 200) {
                    setDto(res.data.mdto);
                } else {
                    alert('error:' + res.status);
                }
            });
        return () => {
        };
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    const [selectedEmployee, setSelectedEmployee] = useState({});
    const [selectedEmployee2, setSelectedEmployee2] = useState({});

    const openModal = () => {
        setShowModal(true);
    };

    const openModal2 = () => {
        setShowModal2(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const closeModal2 = () => {
        setShowModal2(false);
    };

    const handleSelectEmployee = (employee) => {

        setSelectedEmployee(employee);
    };

    const handleSelectEmployee2 = (employee) => {

        setSelectedEmployee2(employee);
    };

    const save = () => {
        axios.post(`${API_BASE_URL}/auth/approval/vacation`,
            {},
            {
                headers: { Authorization: token }, params: {
                    writer: writer, type: type, startDate: startDate, endDate: endDate,
                    wdate: wdate, reason: reason, approval1: selectedEmployee.name,
                    approval2: selectedEmployee2.name, approval1rank: selectedEmployee.companyRankName,
                    approval2rank: selectedEmployee2.companyRankName, app1username: selectedEmployee.username, app2username: selectedEmployee2.username
                }
            })
            .then(function (res) {
                if (res.status === 200) {
                    window.opener.postMessage('executeMyFunction6', '*');
                    window.close();
                } else {
                    alert('error:' + res.status);
                }
            })
    }

    return (

        <div>
            <ApprovalList1
                show={showModal}
                onHide={closeModal}
                onSelectEmployee={handleSelectEmployee}
            />
            <ApprovalList2
                show={showModal2}
                onHide={closeModal2}
                onSelectEmployee={handleSelectEmployee2}
            />
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
                                                    verticalAlign: "middle"
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
                                                    verticalAlign: "middle"
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
                                                    {mdto.name}
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
                                                    {mdto.deptName}
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
                                            <td>
                                                <input type="text" style={{
                                                    width: 65,
                                                    height: 20,
                                                    fontSize: 12,
                                                    textAlign: "center",
                                                    color: "black"
                                                }} value="기안자">
                                                </input></td>
                                            <td
                                                type="text"
                                                id="approval1rankname"
                                                name="approval1rankname"
                                            >
                                                <input type="text" style={{
                                                    width: 65,
                                                    height: 20,
                                                    fontSize: 12,
                                                    textAlign: "center",
                                                    color: "black"
                                                }}  defaultValue="1차결재자"
                                                    value={selectedEmployee.companyRankName}
                                                >
                                                </input>
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
                                                    color: "red"
                                                }}
                                                readOnly=""
                                                value={selectedEmployee.companyRank} onChange={onChange}
                                            />
                                            <td
                                                type="text"
                                                id="approval2rankname"
                                                name="approval2rankname"
                                            >
                                                <input type="text" style={{
                                                    width: 65,
                                                    height: 20,
                                                    fontSize: 12,
                                                    textAlign: "center",
                                                    color: "black"
                                                }}  defaultValue="2차결재자"
                                                    value={selectedEmployee2.companyRankName}
                                                >
                                                </input>
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
                                                    color: "red"
                                                }}
                                                readOnly=""
                                                value={selectedEmployee2.companyRank} onChange={onChange}
                                            />
                                        </tr>
                                        <tr>

                                            <td
                                                style={{
                                                    width: 70,
                                                    height: 40,
                                                    fontSize: 12,
                                                    textAlign: "center"
                                                }}
                                            >
                                                <input
                                                    type="text"
                                                    defaultValue=""
                                                    style={{
                                                        width: 65,
                                                        height: 40,
                                                        fontSize: 12,
                                                        textAlign: "center",
                                                        color: "red"
                                                    }}
                                                    readOnly="true"
                                                    value={mdto.name}
                                                />
                                            </td>
                                            <td
                                                style={{
                                                    width: 65,
                                                    height: 40,
                                                    fontSize: 12,
                                                    textAlign: "center",
                                                    color: "red"
                                                }}
                                                id="ap1"
                                            >
                                                <input
                                                    onClick={openModal}
                                                    type="text"
                                                    id="approvalList1"
                                                    name="approval1"
                                                    defaultValue=""
                                                    style={{
                                                        width: 65,
                                                        height: 40,
                                                        fontSize: 12,
                                                        textAlign: "center",
                                                        color: "red"
                                                    }}
                                                    readOnly="true"
                                                    text="등록"
                                                    value={selectedEmployee.name} onChange={onChange}
                                                />
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
                                                    color: "red"
                                                }}
                                                readOnly="true"
                                                value={selectedEmployee.username} onChange={onChange}
                                            />
                                            <td
                                                style={{
                                                    width: 65,
                                                    height: 40,
                                                    fontSize: 12,
                                                    textAlign: "center",
                                                    color: "red"
                                                }}
                                                id="ap2"
                                            >
                                                <input
                                                    onClick={openModal2}
                                                    type="text"
                                                    id="approvalList2"
                                                    name="approval2"
                                                    defaultValue=""
                                                    style={{
                                                        width: 65,
                                                        height: 40,
                                                        fontSize: 12,
                                                        textAlign: "center",
                                                        color: "red"
                                                    }}
                                                    readOnly=""
                                                    value={selectedEmployee2.name} onChange={onChange}
                                                />
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
                                                    color: "red"
                                                }}
                                                readOnly=""
                                                value={selectedEmployee2.username} onChange={onChange}
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
                                    {mdto.deptName}
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
                                    {mdto.companyRankName}
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
                                    {mdto.name}
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
                                    <input
                                        className="ipt_editor ipt_editor_date"
                                        type="date"
                                        name="wdate"
                                        value={wdate} onChange={onChange}
                                    />
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
                                            value={type} onChange={onChange}
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
                                    <input
                                        className="ipt_editor ipt_editor_date"
                                        type="date"
                                        name="startDate"
                                        value={startDate} onChange={onChange}
                                    />{" "}
                                    ~{" "}
                                    <input
                                        className="ipt_editor ipt_editor_date"
                                        type="date"
                                        name="endDate"
                                        value={endDate} onChange={onChange}
                                    />
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
                                    {mdto.remain}
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
                                    <textarea
                                        className="txta_editor"
                                        cols={87}
                                        rows={10}
                                        style={{ marginLeft: 3, marginTop: 3, marginBottom: 3 }}
                                        name="reason"
                                        defaultValue={""}
                                        value={reason} onChange={onChange}
                                    />
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
                <input
                    type="button"
                    onClick={save}
                    defaultValue="작성"
                    id="vacationbtn"
                    style={{ marginLeft: 750, marginTop: 5 }}
                />
            </span>
        </div>
    )
}

export default Vacation;