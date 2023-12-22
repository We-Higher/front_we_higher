import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApprovalList1 from './ApprovalList1';
import ApprovalList2 from './ApprovalList2';
import { API_BASE_URL } from "../../common/util";

export default function Expense() {
    const token = sessionStorage.getItem("token");
    const myPort = process.env.REACT_APP_MY_PORT;
    const [money, setMoney] = useState('');
    const [mdto, setDto] = useState({});
    const [dto, setDto2] = useState({
        writer: sessionStorage.getItem('loginid'), title: '', content: '', wdate: '',
        category: '', detail: '', sum: '', note: '', approval1: '', approval2: '', approval1rank: '', approval2rank: '', app1username: '', app2username: ''
    });

    const navigate = useNavigate();
    const { writer, title, content, wdate, category, detail, sum, note, approval1,
        approval2, approval1rank, approval2rank, app1username, app2username } = dto;

    const onChange = (e) => {
        const { name, value } = e.target;
        setDto2({
            ...dto,
            [name]: value
        })
    }

    useEffect(() => {
        axios.get(`${API_BASE_URL}/auth/approval/expense`, { headers: { Authorization: token } })
            .then(function (res) {
                if (res.status === 200) {
                    setDto(res.data.mdto);
                } else {
                    alert('error:' + res.status);
                }
            });
    }, [dto.sum]);

    const onChangeSum = (e) => {
        const newSum = e.target.value;
        setMoney(newSum);
    };

    const save = () => {

        const app1username = document.querySelector('#app1username').value;
        const app2username = document.querySelector('#app2username').value;
        const wdate = document.querySelector('#wdate').value;
        const title = document.querySelector('#title').value;
        const content = document.querySelector('#content').value;
        const rdate = document.querySelector('#rdate').value;
        const detail = document.querySelector('#detail').value;
        const sum = document.querySelector('#sum').value;

        if (app1username === '') {
            alert('1차 결재자를 입력하세요');
            return;
        } else if (app2username === '') {
            alert('2차 결재자를 입력하세요');
            return;
        } else if (title === '') {
            alert('제목을 입력하세요');
            return;
        } else if (wdate === '') {
            alert('작성일을 입력하세요');
            return;
        } else if (content === '') {
            alert('사유를 입력하세요');
            return;
        } else if (rdate === '') {
            alert('지출일자를 입력하세요');
            return;
        } else if (detail === '') {
            alert('사용 내역을 입력하세요');
            return;
        } else if (sum === '') {
            alert('금액을 입력하세요');
            return;
        }

        axios.post(`${API_BASE_URL}/auth/approval/expense`,
            {},
            {
                headers: { Authorization: token }, params: {
                    writer: writer, title: title, content: content,
                    wdate: wdate, category: category, detail: detail, sum: money, note: note, approval1: selectedEmployee.name,
                    approval2: selectedEmployee2.name, approval1rank: selectedEmployee.companyRankName,
                    approval2rank: selectedEmployee2.companyRankName, app1username: selectedEmployee.username, app2username: selectedEmployee2.username
                }
            })
            .then(function (res) {
                if (res.status === 200) {
                    window.opener.postMessage('executeMyFunction5', '*');
                    window.close();
                } else {
                    alert('error:' + res.status);
                }
            })
    }

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
            <div style={{ fontFamily: '돋움', fontSize: '9pt', lineHeight: 'normal', marginTop: '0px', marginBottom: '0px' }}>
                <span style={{ fontFamily: '돋움', fontSize: '9pt', lineHeight: 'normal', marginTop: '0px', marginBottom: '0px' }}>
                    <table style={{ border: '0px solid rgb(0, 0, 0)', width: '800px', fontFamily: 'malgun gothic,dotum,arial,tahoma', marginTop: '1px', borderCollapse: 'collapse' }}>{/* Header */}
                        <colgroup>
                            <col width={310} />
                            <col width={490} />
                        </colgroup>
                        <tbody>
                            <tr>
                                <td style={{ background: 'white', padding: '0px !important', border: '0px currentColor', height: '60px', textAlign: 'center', color: 'black', fontSize: '25px', fontWeight: 'bold', verticalAlign: 'middle' }} colSpan={2} className="dext_table_border_t dext_table_border_r dext_table_border_b dext_table_border_l">
                                    지출결의서
                                </td>
                            </tr>
                            <tr>
                                <td style={{ background: 'white', padding: '0px !important', border: 'currentColor', textAlign: 'left', color: 'black', fontSize: '12px', fontWeight: 'normal', verticalAlign: 'top' }}>
                                    <table style={{ border: '1px solid rgb(0, 0, 0)', fontFamily: 'malgun gothic,dotum,arial,tahoma', marginTop: '1px', borderCollapse: 'collapse' }}>{/* User */}
                                        <colgroup>
                                            <col width={90} />
                                            <col width={290} />
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <td style={{ background: 'rgb(226, 226, 226)', padding: '5px', border: '1px solid black', height: '18px', textAlign: 'center', color: 'rgb(0, 0, 0)', fontSize: '12px', fontWeight: 'bold', verticalAlign: 'middle' }}>
                                                    기안자
                                                </td>
                                                <td style={{ background: 'rgb(255, 255, 255)', padding: '5px', border: '1px solid black', textAlign: 'left', color: 'rgb(0, 0, 0)', fontSize: '12px', fontWeight: 'normal', verticalAlign: 'middle' }}>
                                                    <span unselectable="on" contentEditable="false" className="comp_wrap" data-cid={0} data-dsl="{{label:draftUser}}" data-wrapper style={{ fontFamily: '"malgun gothic", dotum, arial, tahoma', fontSize: '9pt' }} data-value data-autotype>{mdto.name}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ background: 'rgb(226, 226, 226)', padding: '5px', border: '1px solid black', height: '18px', textAlign: 'center', color: 'rgb(0, 0, 0)', fontSize: '12px', fontWeight: 'bold', verticalAlign: 'middle' }}>
                                                    소속
                                                </td>
                                                <td style={{ background: 'rgb(255, 255, 255)', padding: '5px', border: '1px solid black', textAlign: 'left', color: 'rgb(0, 0, 0)', fontSize: '12px', fontWeight: 'normal', verticalAlign: 'middle' }}>
                                                    <span unselectable="on" contentEditable="false" className="comp_wrap" data-cid={1} data-dsl="{{label:draftDept}}" data-wrapper style={{ fontFamily: '"malgun gothic", dotum, arial, tahoma', fontSize: '9pt' }} data-value data-autotype>{mdto.deptName}</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td style={{ background: 'white', padding: '0px !important', border: 'currentColor', textAlign: 'right', color: 'black', fontSize: '12px', fontWeight: 'normal', verticalAlign: 'top' }}>
                                    <span unselectable="on" contentEditable="false" className="comp_wrap" data-wrapper>
                                        <table border="1px solid black" style={{ marginLeft: '280px' }}>
                                            <tbody><tr>
                                                <th
                                                    colSpan={3}
                                                    style={{ border: 0, textAlign: "center", fontSize: 15 }}
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
                                                        input type="text"
                                                        id="approval1rankname"
                                                        name="approval1rankname"
                                                    >
                                                        <input type="text" style={{
                                                            width: 65,
                                                            height: 20,
                                                            fontSize: 12,
                                                            textAlign: "center",
                                                            color: "black"
                                                        }} defaultValue="1차결재자"
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
                                                        }} defaultValue="2차결재자"
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
                                                        readOnly=""
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
                                                            //id="approvalList2"
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
                                                        style={{
                                                            width: 65,
                                                            height: 40,
                                                            fontSize: 12,
                                                            textAlign: "center",
                                                            color: "red"
                                                        }}
                                                        value={selectedEmployee2.username} onChange={onChange}
                                                    />
                                                </tr>
                                            </tbody>
                                        </table>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </span>
            </div>
            <div style={{ fontFamily: '돋움', fontSize: '9pt', lineHeight: 'normal', marginTop: '0px', marginBottom: '0px' }}><br /></div>
            <table border={0} cellPadding={0} cellSpacing={0} style={{ borderCollapse: 'collapse', width: '700px', height: '142px' }}>
                <colgroup>
                    <col width={72} style={{ width: '72px' }} />
                    <col width={27} style={{ width: '27px' }} />
                    <col width={50} span={3} style={{ width: '51px' }} />
                    <col width={72} style={{ width: '72px' }} />
                    <col width={84} style={{ width: '84px' }} />
                    <col width={43} style={{ width: '43px' }} />
                    <col width={72} span={4} style={{ width: '72px' }} />
                    <col width={96} style={{ width: '96px' }} />
                </colgroup>
                <tbody>
                    <tr>
                        <td height={30} width={79} style={{ paddingTop: '1px', paddingRight: '1px', paddingLeft: '1px', fontFamily: '"맑은 고딕", monospace', verticalAlign: 'middle', textAlign: 'center', border: '1px solid windowtext', height: '30px', width: '80px', backgroundColor: 'rgb(226, 226, 226)' }}>
                            <strong style={{ fontSize: '9pt' }}>제 목</strong>
                        </td>
                        <td colSpan={12} width={760} style={{ paddingTop: '1px', paddingRight: '1px', paddingLeft: '1px', fontFamily: '"맑은 고딕", monospace', verticalAlign: 'middle', borderImage: 'initial', fontSize: '10pt', textAlign: 'center', borderWidth: '1px', borderStyle: 'solid', borderColor: 'windowtext black windowtext windowtext', width: '720px' }}>
                            <p style={{ textAlign: 'left', fontFamily: '"맑은 고딕", monospace', fontSize: '10pt', lineHeight: '20px', marginTop: '0px', marginBottom: '0px' }}>
                                <span unselectable="on" contentEditable="false" className="comp_wrap" data-cid={4} data-dsl="{{text}}" data-wrapper style={{ width: '100%', fontFamily: '"맑은 고딕", monospace', fontSize: '10pt' }} data-value data-autotype>
                                    <input className="ipt_editor" id="title" type="text" style={{ width: '688px', marginLeft: '2px' }} name="title" onChange={onChange} /></span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td height={30} style={{ paddingTop: '1px', paddingRight: '1px', paddingLeft: '1px', fontFamily: '"맑은 고딕", monospace', verticalAlign: 'middle', textAlign: 'center', borderRight: '1px solid windowtext', borderBottom: '1px solid windowtext', borderLeft: '1px solid windowtext', borderImage: 'initial', height: '30px', borderTop: 'none', backgroundColor: 'rgb(226, 226, 226)', width: '83px' }} className="dext_table_border_t">
                            <strong style={{ fontSize: '9pt' }}>작성일</strong>
                        </td>
                        <td colSpan={2} style={{ paddingTop: '1px', paddingRight: '1px', paddingLeft: '1px', fontFamily: '"맑은 고딕", monospace', verticalAlign: 'middle', fontSize: '10pt', textAlign: 'center', borderTop: '1px solid windowtext', borderRight: '1px solid windowtext', borderBottom: '1px solid windowtext', borderImage: 'initial', borderLeft: 'none', width: '303px' }} className="dext_table_border_l">
                            <p style={{ fontFamily: '"맑은 고딕", monospace', fontSize: '10pt', lineHeight: '20px', marginTop: '0px', marginBottom: '0px' }}>
                                <span unselectable="on" contentEditable="false" className="comp_wrap" data-cid={5} data-dsl="{{calendar}}" data-wrapper style={{ fontFamily: '"맑은 고딕", monospace', fontSize: '10pt' }} data-value data-autotype><input className="ipt_editor ipt_editor_date" type="date" id="wdate" name="wdate" onChange={onChange} /></span>
                            </p>
                        </td>
                        <td style={{ paddingTop: '1px', paddingRight: '1px', paddingLeft: '1px', fontFamily: '"맑은 고딕", monospace', verticalAlign: 'middle', textAlign: 'center', borderRight: '1px solid windowtext', borderBottom: '1px solid windowtext', borderLeft: '1px solid windowtext', borderImage: 'initial', height: '30px', borderTop: 'none', backgroundColor: 'rgb(226, 226, 226)', width: '79px' }} className="dext_table_border_t">
                            <strong style={{ fontSize: '9pt' }}>총 금액</strong>
                        </td>
                        <td colSpan={9} style={{ paddingTop: '1px', paddingRight: '1px', paddingLeft: '1px', fontFamily: '"맑은 고딕", monospace', verticalAlign: 'middle', fontSize: '10pt', textAlign: 'center', borderTop: '1px solid windowtext', borderRight: '1px solid windowtext', borderBottom: '1px solid windowtext', borderImage: 'initial', borderLeft: 'none', width: '242px' }} className="dext_table_border_l">
                            <p style={{ fontFamily: '"맑은 고딕", monospace', fontSize: '10pt', lineHeight: '20px', marginTop: '0px', marginBottom: '0px' }}>
                                <span unselectable="on" contentEditable="false" className="comp_wrap" data-cid={6} data-dsl="{{text}}" data-wrapper style={{ width: '100%', fontFamily: '"맑은 고딕", monospace', fontSize: '10pt' }} data-value data-autotype><input className="ipt_editor" type="hidden" name="sum" value={money} />{money}</span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td height={150} style={{ paddingTop: '1px', paddingRight: '1px', paddingLeft: '1px', fontFamily: '"맑은 고딕", monospace', verticalAlign: 'middle', textAlign: 'center', borderRight: '1px solid windowtext', borderBottom: '1px solid windowtext', borderLeft: '1px solid windowtext', borderImage: 'initial', height: '51px', borderTop: 'none', backgroundColor: 'rgb(226, 226, 226)', width: '83px' }} className="dext_table_border_t">
                            <strong style={{ fontSize: '9pt' }}>사 유</strong>
                        </td>
                        <td colSpan={12} style={{ paddingTop: '1px', paddingRight: '1px', paddingLeft: '1px', fontFamily: '"맑은 고딕", monospace', verticalAlign: 'top', fontSize: '10pt', textAlign: 'center', borderTop: '1px solid windowtext', borderRight: '1px solid windowtext', borderBottom: '1px solid windowtext', borderImage: 'initial', borderLeft: 'none', width: '683px', height: '51px', backgroundRepeat: 'no-repeat' }} className="dext_table_border_l">
                            <p style={{ fontFamily: '"맑은 고딕", monospace', fontSize: '10pt', lineHeight: '20px', marginTop: '0px', marginBottom: '0px' }}>
                                <span unselectable="on" contentEditable="false" className="comp_wrap" data-cid={8} data-dsl="{{textarea}}" data-wrapper style={{ width: '100%', fontFamily: '"맑은 고딕", monospace', fontSize: '10pt' }} data-value data-autotype><textarea className="txta_editor" cols={83} rows={10} style={{ marginTop: '3px', marginBottom: '3px' }} id="content" name="content" defaultValue={""} onChange={onChange} /></span>
                            </p>
                        </td>
                    </tr>
                    <tr style={{ paddingTop: '1px', paddingRight: '1px', paddingLeft: '1px', fontFamily: '"맑은 고딕", monospace', verticalAlign: 'middle', textAlign: 'center', border: '1px solid windowtext', borderImage: 'initial', height: '30px', borderTop: 'none', backgroundColor: 'rgb(226, 226, 226)' }} className="dext_table_border_t">
                        <th className="subjectColumn dext_table_border_t dext_table_border_r dext_table_border_b dext_table_border_l" style={{ width: '100%' }}>
                            <span style={{ fontSize: '9pt' }}>
                                일 자
                            </span>
                        </th>
                        <th className="subjectColumn dext_table_border_t dext_table_border_r dext_table_border_b dext_table_border_l" style={{ width: '100%' }}>
                            <span style={{ fontSize: '9pt' }}>
                                분 류
                            </span>
                        </th>
                        <th className="subjectColumn dext_table_border_t dext_table_border_r dext_table_border_b dext_table_border_l" style={{ width: '100%' }}>
                            <span style={{ fontSize: '9pt' }}>
                                사용 내역
                            </span>
                        </th>
                        <th className="subjectColumn dext_table_border_t dext_table_border_r dext_table_border_b dext_table_border_l" style={{ width: '100%' }}>
                            <span style={{ fontSize: '9pt' }}>
                                금 액
                            </span>
                        </th>
                        <th className="subjectColumn dext_table_border_t dext_table_border_r dext_table_border_b dext_table_border_l" style={{ width: '100%' }}>
                            <span style={{ fontSize: '9pt' }}>
                                비 고
                            </span>
                        </th>
                    </tr>
                    <tr className="copyRow1" style={{ paddingTop: '1px', paddingRight: '1px', paddingLeft: '1px', fontFamily: '"맑은 고딕", monospace', verticalAlign: 'middle', textAlign: 'center', border: '1px solid windowtext', borderImage: 'initial', height: '30px', borderTop: 'none' }}>
                        <td className="detailColumn centerCol dext_table_border_t dext_table_border_r dext_table_border_b dext_table_border_l" style={{ width: '20%' }}>
                            <span unselectable="on" contentEditable="false" className="comp_wrap" data-cid={9} data-dsl="{{calendar}}" data-wrapper style={{ fontFamily: '"malgun gothic", dotum, arial, tahoma', fontSize: '9pt' }} data-value data-autotype><input className="ipt_editor ipt_editor_date" type="date" id='rdate' name="rdate" /></span>
                        </td>
                        <td className="detailColumn centerCol dext_table_border_t dext_table_border_r dext_table_border_b dext_table_border_l" style={{ width: '20%' }}>
                            <span unselectable="on" contentEditable="false" className="comp_wrap" data-cid={10} data-dsl="{{cSel__물품구입비_잡비_회식비_식비_교통비_기타}}" data-wrapper data-value data-autotype>
                                <select className="editor_slt" id="category" name="category" value={category} onChange={onChange}>
                                    <option onSelect={onChange} value={'물품구입비'} selected="selected">물품구입비</option>
                                    <option onSelect={onChange} value={'잡비'}  >잡비</option>
                                    <option onSelect={onChange} value={'회식비'} >회식비</option>
                                    <option onSelect={onChange} value={'식비'} >식비</option>
                                    <option onSelect={onChange} value={'교통비'} >교통비</option>
                                    <option onSelect={onChange} value={'기타'} >기타</option>
                                </select>
                            </span>
                            <span contentEditable="false" className="comp_hover" data-content-protect-cover="true" data-origin={10}>
                                <a contentEditable="false" className="ic_prototype ic_prototype_trash" data-content-protect-cover="true" data-component-delete-button="true" />
                            </span>
                        </td>
                        <td className="detailColumn centerCol dext_table_border_t dext_table_border_r dext_table_border_b dext_table_border_l" style={{ height: '29px', width: '40%', paddingRight: '1px' }}>
                            <span unselectable="on" contentEditable="false" className="comp_wrap" data-cid={12} data-dsl="{{text}}" data-wrapper style={{ width: '20%' }} data-value data-autotype><input className="ipt_editor" id='detail' type="text" value={detail} name="detail" onChange={onChange} /></span>
                        </td>
                        <td className="detailColumn centerCol price dext_table_border_t dext_table_border_r dext_table_border_b dext_table_border_l" style={{ paddingLeft: '1px', height: '29px', width: '20%' }}>
                            <span unselectable="on" contentEditable="false" className="comp_wrap" data-cid={11} data-dsl="{{currency_0}}" data-wrapper style={{ width: '20%' }} data-value data-autotype><input className="ipt_editor ipt_editor_currency" id='sum' type="number" name="sum" onChange={onChangeSum} /></span>
                        </td>
                        <td className="detailColumn dext_table_border_t dext_table_border_r dext_table_border_b dext_table_border_l" style={{ height: '29px', width: '20%' }}>
                            <span unselectable="on" contentEditable="false" className="comp_wrap" data-cid={13} data-dsl="{{text}}" data-wrapper style={{ width: '20%' }} data-value data-autotype><input className="ipt_editor" id='note' type="text" value={note} name="note" onChange={onChange} /></span>
                        </td>
                    </tr>

                </tbody>
            </table>

            <span style={{ fontFamily: '"맑은 고딕"', fontSize: '10pt', lineHeight: '20px', marginTop: '0px', marginBottom: '0px' }}>
                <strong>* 영수증 별도 제출</strong></span>
            <input type="button" onClick={save} defaultValue="작성" style={{ marginLeft: '650px', marginTop: '5px' }} />
        </div>

    )

}