import { Modal } from "react-bootstrap";
import { useEffect, useState } from 'react';
import axios from "axios";

export default function MonthMember({ show, onHide }) {
    const myPort = process.env.REACT_APP_MY_PORT;
    const token = sessionStorage.getItem("token");
    const [list, setList] = useState([]);
    const [mdto, setDto] = useState({});
    const { ismaster } = mdto;

    useEffect(() => {
        axios.get(`http://localhost:${myPort}/auth/employee/list`, { headers: { Authorization: token } })
            .then(function (res) {
                if (res.status === 200) {
                    const updatedList = res.data.list.map(e => ({
                        ...e,
                        selected: e.monthMember === 1, // monthMember가 1이면 selected를 true로 설정
                    }));
                    setList(updatedList);

                    let m = res.data.mdto;
                    setDto({
                        ismaster: m.isMaster
                    });
                } else {
                    alert('error:' + res.status);
                }
            });
    }, []);

    const limitSelections = (employee) => {
        const selectedCount = list.filter(e => e.selected).length;

        // 8명 초과인 경우 경고 메시지를 표시하고 return하여 함수 종료
        if (selectedCount >= 8 && !employee.selected) {
            alert("최대 8명까지 선택 가능합니다.");
            return;
        }

        // 선택 상태를 토글합니다.
        const updatedList = list.map(e => {
            if (e.id === employee.id) {
                const updatedEmployee = { ...e, selected: !e.selected, monthMember: e.selected ? 0 : 1 }; // selected 상태에 따라 monthMember값 변경
                return updatedEmployee;
            }
            return e;
        });

        setList(updatedList);
    };

    const save = async () => {
        const selectedMembers = list.filter(e => e.selected).map(e => e.id);

        try {
            const response = await axios.put(
                `http://localhost:${myPort}/monthMember`,
                { selectedMembers },
                {
                    headers: { Authorization: token }
                }
            );

            if (response.status === 200) {
                alert('이달의 우수사원 선정완료');
                onHide();
            } else {
                alert('error:' + response.status);
            }
        } catch (error) {
            console.error('우수사원 선정 실패', error);
            alert('우수사원 선정 실패');
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Body>
                <div className="card mb-5 mb-xl-10">
                    <div className="card-header cursor-pointer">
                        <div className="card-title m-0">
                            <h3 className="fw-bolder m-0">임직원 목록</h3>
                        </div>
                        <button className="btn btn-primary align-self-center" onClick={save}>선택</button>
                    </div>
                    <div className="card-body p-9">
                        <div className="row mb-7">
                            <div className="col-lg-12 fv-row">
                                <div className="input-group input-group-sm mb-3">
                                    <div className="scroll-y me-n5 pe-5 h-200px h-lg-auto" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header" data-kt-scroll-wrappers="#kt_content, #kt_chat_contacts_body" data-kt-scroll-offset="5px">
                                        <table className="table table-striped table-row-bordered gy-5 gs-7" style={{ tableLayout: 'auto', width: '100%' }}>
                                            <tbody>
                                                <tr className="fw-bold fs-6 text-gray-800" style={{ textAlign: 'center' }}>
                                                    <th style={{ fontSize: '13px', width: 150 }}>이름</th>
                                                    <th style={{ fontSize: '13px', width: 150 }}>사번</th>
                                                    <th style={{ fontSize: '13px', width: 150 }}>부서</th>
                                                    <th style={{ fontSize: '13px', width: 150 }}>직급</th>
                                                    <th style={{ fontSize: '13px', width: 150 }}><i className="bi bi-check-square-fill" /></th>
                                                </tr>
                                                {list.map((e) => (
                                                    <tr key={e.newNo} style={{ textAlign: 'center' }}>
                                                        <td>{e.name}</td>
                                                        <td>{e.newNo}</td>
                                                        <td>{e.deptName}</td>
                                                        <td>{e.companyRankName}</td>
                                                        <td>
                                                            <input type="checkbox" name="selectedMembers" value={e.id} checked={e.selected} onChange={() => limitSelections(e)} />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
