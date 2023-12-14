import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MailSend() {
    const myPort = process.env.REACT_APP_MY_PORT;
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();
    const [mailsender, setMailsender] = useState({});
    const [mailDto, setMailDto] = useState({ from:'', address:'', ccAddress:'', title: '', content:'' });
    const {  } = mailDto;
    const [recipientList, setRecipientList] = useState([""]);
    useEffect(() => {
        axios.get(`http://localhost:${myPort}/mail/send`, { headers: { Authorization: token } })
            .then(function (res) {
                if (res.status === 200) {
                    setMailsender(res.data.mailsender);
                } else {
                    alert('error:' + res.status);
                }
            });
    }, [])

    const send = () => {
        let fdata = new FormData();
        let file = document.getElementById('f');
        fdata.append('f', file.files[0]);
        axios.post(`http://localhost:${myPort}/mail/send`, fdata,
            { headers: { Authorization: token }, "Content-Type": "multipart/form-data" })
            .then(function (res) {
                if (res.status === 200) {
                    alert("메일이 성공적으로 전송됐습니다.");
                    navigate('/main');
                } else {
                    alert('error:' + res.status);
                }
            })
    }

    const addTextbox = () => {
        setRecipientList([...recipientList, ""]);
    };

    const removeTextbox = (index) => {
        const updatedRecipientList = [...recipientList];
        updatedRecipientList.splice(index, 1);
        setRecipientList(updatedRecipientList);
    };

    return (
        <div className="container py-5">
            <h3 className="mb-5">메일 보내기</h3>
            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
            <div className="mb-3">
                <label htmlFor="from" className="form-label">보내는 사람</label>
                <input type="text" className="form-control" id="from" name="from" value={mailsender} readOnly />
            </div>
            <div className="mb-3" id="box">
                <label htmlFor="address" className="form-label">받는 사람</label>
                {recipientList.map((address, index) => (
                    <div key={index}>
                        <input type="email" className="form-control" value={address} onChange={(e) => {
                            const updatedRecipientList = [...recipientList];
                            updatedRecipientList[index] = e.target.value;
                            setRecipientList(updatedRecipientList);
                        }} />
                        <input type="button" className="form-control" style={{ fontWeight: "bold", color: "red" }} value="삭제" onClick={() => removeTextbox(index)} />
                    </div>
                ))}
                <input type="button" className="form-control" style={{ fontWeight: "bold" }} value="추가" onClick={addTextbox}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="ccAddress" className="form-label">참조 메일 주소</label>
                <input type="text" className="form-control" id="ccAddress" name="ccAddress" placeholder="참조 수신인을 입력하세요" />
            </div>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">제목</label>
                <input type="text" className="form-control" id="title" name="title" placeholder="제목을 입력하세요" />
            </div>
            <div className="mb-3">
                <label htmlFor="content" className="form-label">내용</label>
                <textarea className="form-control" id="content" rows={3} name="content" placeholder="보낼 내용을 입력하세요" defaultValue={""} />
            </div>
            <div className="mb-3">
                <label htmlFor="file" className="form-label">첨부 파일</label>
                <input className="form-control" type="file" id="file" name="file" />
            </div>
            <div className="text-end mt-3">
                <button className="btn btn-primary" onClick={send}>발송</button>
            </div>
        </div>
    );
}