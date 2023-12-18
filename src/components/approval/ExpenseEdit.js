import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ApprovalList1 from './ApprovalList1';
import ApprovalList2 from './ApprovalList2';

const ExpenseEdit = () => {

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
        axios.get(`http://localhost:${myPort}/auth/approval/expense/editread/` + n, { headers: { Authorization: token } })
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
        axios.post(`http://localhost:${myPort}/auth/approval/expense/approve`,
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
        <div>
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
                                    {dto.rstatus == -1 && (
                                        <img
                                            src="/refuse.png"
                                            style={{ position: 'absolute', width: '130px', height: '130px', marginLeft: '-510px', marginTop: '-75px' }}
                                            alt="Refuse Image"
                                        />
                                    )}
                                    {dto.status == 2 && (
                                        <img
                                            src="/fapprove.png"
                                            style={{ position: 'absolute', width: '130px', height: '130px', marginLeft: '-510px', marginTop: '-75px' }}
                                            alt="Refuse Image"
                                        />
                                    )}
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
                                                    <span unselectable="on" contentEditable="false" className="comp_wrap" data-cid={0} data-dsl="{{label:draftUser}}" data-wrapper style={{ fontFamily: '"malgun gothic", dotum, arial, tahoma', fontSize: '9pt' }} data-value data-autotype>{member.name}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ background: 'rgb(226, 226, 226)', padding: '5px', border: '1px solid black', height: '18px', textAlign: 'center', color: 'rgb(0, 0, 0)', fontSize: '12px', fontWeight: 'bold', verticalAlign: 'middle' }}>
                                                    소속
                                                </td>
                                                <td style={{ background: 'rgb(255, 255, 255)', padding: '5px', border: '1px solid black', textAlign: 'left', color: 'rgb(0, 0, 0)', fontSize: '12px', fontWeight: 'normal', verticalAlign: 'middle' }}>
                                                    <span unselectable="on" contentEditable="false" className="comp_wrap" data-cid={1} data-dsl="{{label:draftDept}}" data-wrapper style={{ fontFamily: '"malgun gothic", dotum, arial, tahoma', fontSize: '9pt' }} data-value data-autotype>{member.deptName}</span>
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
                                                            color: "black"
                                                        }}
                                                        readOnly="true"
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
                                                            color: "black"
                                                        }}
                                                        readOnly="true"
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
                                                        readOnly=""
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
                                                        //id="app2username"
                                                        name="app2username"
                                                        style={{
                                                            width: 65,
                                                            height: 40,
                                                            fontSize: 12,
                                                            textAlign: "center",
                                                            color: "black"
                                                        }}
                                                        value={dto.app2username}
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
            <table border={0} cellPadding={0} cellSpacing={0} style={{ borderCollapse: 'collapse', width: '800px', height: '142px' }}>
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
                                    <input className="ipt_editor" type="text" style={{ width: '688px', marginLeft: '2px', borderWidth: 0 }} readOnly="true" name="title" value={dto.title} /></span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td height={30} style={{ paddingTop: '1px', paddingRight: '1px', paddingLeft: '1px', fontFamily: '"맑은 고딕", monospace', verticalAlign: 'middle', textAlign: 'center', borderRight: '1px solid windowtext', borderBottom: '1px solid windowtext', borderLeft: '1px solid windowtext', borderImage: 'initial', height: '30px', borderTop: 'none', backgroundColor: 'rgb(226, 226, 226)', width: '83px' }} className="dext_table_border_t">
                            <strong style={{ fontSize: '9pt' }}>작성일</strong>
                        </td>
                        <td colSpan={2} style={{ paddingTop: '1px', paddingRight: '1px', paddingLeft: '1px', fontFamily: '"맑은 고딕", monospace', verticalAlign: 'middle', fontSize: '10pt', textAlign: 'center', borderTop: '1px solid windowtext', borderRight: '1px solid windowtext', borderBottom: '1px solid windowtext', borderImage: 'initial', borderLeft: 'none', width: '303px' }} className="dext_table_border_l">
                            <p style={{ fontFamily: '"맑은 고딕", monospace', fontSize: '10pt', lineHeight: '20px', marginTop: '0px', marginBottom: '0px' }}>
                                <span unselectable="on" contentEditable="false" className="comp_wrap" data-cid={5} data-dsl="{{calendar}}" data-wrapper style={{ fontFamily: '"맑은 고딕", monospace', fontSize: '10pt' }} data-value data-autotype>{dto.wdate}</span>
                            </p>
                        </td>
                        <td style={{ paddingTop: '1px', paddingRight: '1px', paddingLeft: '1px', fontFamily: '"맑은 고딕", monospace', verticalAlign: 'middle', textAlign: 'center', borderRight: '1px solid windowtext', borderBottom: '1px solid windowtext', borderLeft: '1px solid windowtext', borderImage: 'initial', height: '30px', borderTop: 'none', backgroundColor: 'rgb(226, 226, 226)', width: '79px' }} className="dext_table_border_t">
                            <strong style={{ fontSize: '9pt' }}>총 금액</strong>
                        </td>
                        <td colSpan={9} style={{ paddingTop: '1px', paddingRight: '1px', paddingLeft: '1px', fontFamily: '"맑은 고딕", monospace', verticalAlign: 'middle', fontSize: '10pt', textAlign: 'center', borderTop: '1px solid windowtext', borderRight: '1px solid windowtext', borderBottom: '1px solid windowtext', borderImage: 'initial', borderLeft: 'none', width: '242px' }} className="dext_table_border_l">
                            <p style={{ fontFamily: '"맑은 고딕", monospace', fontSize: '10pt', lineHeight: '20px', marginTop: '0px', marginBottom: '0px' }}>
                                <span unselectable="on" contentEditable="false" className="comp_wrap" data-cid={6} data-dsl="{{text}}" data-wrapper style={{ width: '100%', fontFamily: '"맑은 고딕", monospace', fontSize: '10pt' }} data-value data-autotype><input className="ipt_editor" type="hidden" name="sum" value={dto.sum} /></span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td height={150} style={{ paddingTop: '1px', paddingRight: '1px', paddingLeft: '1px', fontFamily: '"맑은 고딕", monospace', verticalAlign: 'middle', textAlign: 'center', borderRight: '1px solid windowtext', borderBottom: '1px solid windowtext', borderLeft: '1px solid windowtext', borderImage: 'initial', height: '51px', borderTop: 'none', backgroundColor: 'rgb(226, 226, 226)', width: '83px' }} className="dext_table_border_t">
                            <strong style={{ fontSize: '9pt' }}>사 유</strong>
                        </td>
                        <td colSpan={12} style={{ paddingTop: '1px', paddingRight: '1px', paddingLeft: '1px', fontFamily: '"맑은 고딕", monospace', verticalAlign: 'top', fontSize: '10pt', textAlign: 'center', borderTop: '1px solid windowtext', borderRight: '1px solid windowtext', borderBottom: '1px solid windowtext', borderImage: 'initial', borderLeft: 'none', width: '683px', height: '51px', backgroundRepeat: 'no-repeat' }} className="dext_table_border_l">
                            <p style={{ fontFamily: '"맑은 고딕", monospace', fontSize: '10pt', lineHeight: '20px', marginTop: '0px', marginBottom: '0px' }}>
                                <span unselectable="on" contentEditable="false" className="comp_wrap" data-cid={8} data-dsl="{{textarea}}" data-wrapper style={{ width: '100%', fontFamily: '"맑은 고딕", monospace', fontSize: '10pt' }} data-value data-autotype><textarea className="txta_editor" cols={105} rows={10} style={{ marginLeft: '-6px', marginTop: '3px', marginBottom: '3px', borderWidth: 0 }} name="content" defaultValue={""} readOnly="true" value={dto.content} /></span>
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
                        <td className="detailColumn centerCol dext_table_border_t dext_table_border_r dext_table_border_b dext_table_border_l" style={{ width: '20%', borderWidth: 1 }}>
                            <span unselectable="on" contentEditable="false" className="comp_wrap" data-cid={9} data-dsl="{{calendar}}" data-wrapper style={{ fontFamily: '"malgun gothic", dotum, arial, tahoma', fontSize: '9pt' }} data-value data-autotype>{dto.wdate}   </span>
                        </td>
                        <td className="detailColumn centerCol dext_table_border_t dext_table_border_r dext_table_border_b dext_table_border_l" style={{ width: '20%', borderWidth: 1 }}>
                            <span unselectable="on" contentEditable="false" className="comp_wrap" data-cid={10} data-dsl="{{cSel__물품구입비_잡비_회식비_식비_교통비_기타}}" data-wrapper data-value data-autotype>
                                <select className="editor_slt" name="category" value={dto.category} onChange={onChange} disabled>
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
                        <td className="detailColumn centerCol dext_table_border_t dext_table_border_r dext_table_border_b dext_table_border_l" style={{ height: '29px', width: '40%', paddingRight: '1px', borderWidth: 1 }}>
                            <span unselectable="on" contentEditable="false" className="comp_wrap" data-cid={12} data-dsl="{{text}}" data-wrapper style={{ width: '20%' }} data-value data-autotype>{dto.detail}</span>
                        </td>
                        <td className="detailColumn centerCol price dext_table_border_t dext_table_border_r dext_table_border_b dext_table_border_l" style={{ paddingLeft: '1px', height: '29px', width: '20%', borderWidth: 1 }}>
                            <span unselectable="on" contentEditable="false" className="comp_wrap" data-cid={11} data-dsl="{{currency_0}}" data-wrapper style={{ width: '20%' }} data-value data-autotype>{dto.sum}</span>
                        </td>
                        <td className="detailColumn dext_table_border_t dext_table_border_r dext_table_border_b dext_table_border_l" style={{ height: '29px', width: '20%', borderWidth: 1 }}>
                            <span unselectable="on" contentEditable="false" className="comp_wrap" data-cid={13} data-dsl="{{text}}" data-wrapper style={{ width: '20%' }} data-value data-autotype>{dto.note}</span>
                        </td>
                    </tr>

                </tbody>
            </table>

            <span style={{ fontFamily: '"맑은 고딕"', fontSize: '10pt', lineHeight: '20px', marginTop: '0px', marginBottom: '0px' }}>
                <strong>* 영수증 별도 제출</strong></span>
            <table style={{ width: '800px', fontSize: '12px', fontFamily: 'malgun gothic, dotum, arial, tahoma' }}>
                <tbody>
                    <tr>
                        <input type="button" value="결재" style={{ marginLeft: '715px', marginTop: '-10px' }} onClick={() => approve(dto.expenseNum)} />

                        <input
                            type="button"
                            value="반려"
                            style={{ marginLeft: '5px', marginTop: '-10px' }}
                            onClick={() => refuse(dto.expenseNum)}
                            id="defer"
                        />
                    </tr>
                </tbody>
            </table>
            <div>
                <Link onClick={back} className="btn btn-secondary" style={{ fontSize: '13px', marginLeft:'360px', marginTop:'30px' }}>
                    목록
                </Link>
                </div>
        </div>
    )
}

export default ExpenseEdit;