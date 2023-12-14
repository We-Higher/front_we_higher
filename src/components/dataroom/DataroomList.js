import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import '../../css/dataroom.css';

export default function BoardList() {
    const token = sessionStorage.getItem("token");
    const loginid = sessionStorage.getItem("loginid");
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [mdto, setDto] = useState({});
    const { ismaster } = mdto;

    useEffect(() => {
        axios.get('http://localhost:8081/auth/dataroom', { headers: { Authorization: token } })
            .then(
                function (res) {
                    if (res.status === 200) {
                        setList(res.data.list);
                        let m = res.data.mdto;
                        setDto({
                            ismaster: m.isMaster
                        })
                    } else {
                        alert('error:' + res.status);
                    }
                }
            );
    }, [])

    const del = (num) => {
        axios.post('http://localhost:8081/auth/dataroom/del',
            {},
            {
                headers: { Authorization: token },
                params: { num: num }
            }
        )
            .then(function (res) {
                if (res.status === 200) {
                    setList(res.data.list);
                } else {
                    alert(res.status);
                }
            });
    }
    return (

        <div className="dataroom">
            <div className="main-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header card-header-danger">
                                    <h2 className="card-title">자료실</h2>
                                    {ismaster === 1 && (
                                    <div className="card-header cursor-pointer d-flex justify-content-between align-items-center">
                                        <div className="btn btn-icon btn-active-light-primary w-60px h-60px w-md-60px h-md-60px align-self-center"
                                            data-kt-menu-trigger="click" data-kt-menu-attach="parent"
                                            data-kt-menu-placement="bottom-end" data-kt-menu-flip="bottom">
                                            <a href={`/dataroom/add`}><i className="bi bi-person-plus-fill">자료 올리기</i></a>
                                        </div>
                                    </div>
                                    )}
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table id="kt_datatable_example_2" className="table table-striped table-row-bordered gy-5 gs-7">
                                            <thead>
                                                <tr className="fw-bold fs-6 text-gray-800">
                                                    <th>번호</th>
                                                    <th>제목</th>
                                                    <th>작성자</th>
                                                    <th>제목</th>
                                                    <th>등록일</th>
                                                    <th>다운로드수</th>
                                                    {ismaster === 1 && (
                                                        <>
                                                            <th>수정</th>
                                                            <th>삭제</th>
                                                        </>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list.map((d) => (
                                                    <tr>
                                                        <td>{d.num}</td>
                                                        <td>
                                                            <a href={`/dataroom/detail/${d.num}`} className="link">{d.title}</a>
                                                        </td>
                                                        <td>{d.member.name}</td>
                                                        <td>{d.title}</td>
                                                        <td>{d.wdate}</td>
                                                        <td>{d.cnt}</td>
                                                        <td style={{ padding: '2px' }}>
                                                            {(ismaster === 1) && (
                                                                <div className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px align-self-center"
                                                                    data-kt-menu-trigger="click" data-kt-menu-attach="parent"
                                                                    data-kt-menu-placement="bottom-end" data-kt-menu-flip="bottom">
                                                                    <a href={`/dataroom/edit/${d.num}`}><i className="bi bi-pencil"></i>
                                                                    </a>
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td style={{ padding: '2px' }}>
                                                            {(ismaster === 1) && (
                                                                <div className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px align-self-center"
                                                                    data-kt-menu-trigger="click" data-kt-menu-attach="parent"
                                                                    data-kt-menu-placement="bottom-end" data-kt-menu-flip="bottom">
                                                                    <a onClick={() => del(d.num)}><i className="bi bi-trash-fill del"></i>
                                                                    </a>
                                                                </div>

                                                            )}
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
            </div>
        </div >
    );

}
