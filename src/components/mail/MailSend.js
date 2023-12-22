import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../common/util";

export default function MailSend() {
    const myPort = process.env.REACT_APP_MY_PORT;
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();
    const [file, setFile] = useState({});
    const [mailsender, setMailsender] = useState({});
    const [mailDto, setMailDto] = useState({ from: { mailsender }, address: '', ccAddress: '', title: '', content: '' });
    const { from, address, ccAddress, title, content } = mailDto;
    const [recipientList, setRecipientList] = useState([""]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setMailDto({
            ...mailDto,
            [name]: value
        })
    }

    const onChangeFile = (e) => {
        const { name, value } = e.target;
        setFile({
            ...file,
            [name]: value
        })
    }

    useEffect(() => {
        axios.get(`${API_BASE_URL}/mail/send`, { headers: { Authorization: token } })
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
        fdata.append('from', from);
        fdata.append('address', address);
        fdata.append('ccAddress', ccAddress);
        fdata.append('title', title);
        fdata.append('content', content);
        fdata.append('file', document.getElementById('file').files[0]);

        axios.post(`${API_BASE_URL}/mail/send`, fdata,
            {
                headers: { Authorization: token, 'Content-Type': 'multipart/form-data' }
            })
            .then(function (res) {
                if (res.status === 200) {
                    alert("메일이 성공적으로 전송됐습니다.");
                    navigate('/main');
                } else {
                    alert('error:' + res.status);
                }
            })
            .catch(function (error) {
                console.error(error);
                alert("메일이 성공적으로 전송됐습니다.");
                navigate('/main');
            });
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

                            setMailDto({
                                ...mailDto,
                                address: updatedRecipientList
                            });
                        }}
                        />
                        <input type="button" className="form-control" style={{ fontWeight: "bold", color: "red" }} value="삭제" onClick={() => removeTextbox(index)} />
                    </div>
                ))}
                <input type="button" className="form-control" style={{ fontWeight: "bold" }} value="추가" onClick={addTextbox}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="ccAddress" className="form-label">참조 메일 주소</label>
                <input type="text" className="form-control" id="ccAddress" name="ccAddress" value={ccAddress} onChange={onChange} placeholder="참조 수신인을 입력하세요" />
            </div>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">제목</label>
                <input type="text" className="form-control" id="title" name="title" value={title} onChange={onChange} placeholder="제목을 입력하세요" />
            </div>
            <div className="mb-3">
                <label htmlFor="content" className="form-label">내용</label>
                <textarea className="form-control" id="content" rows={3} name="content" value={content} onChange={onChange} placeholder="보낼 내용을 입력하세요" defaultValue={""} />
            </div>
            <div className="mb-3">
                <label htmlFor="file" className="form-label">첨부 파일</label>
                <input className="form-control" type="file" id="file" onChange={onChangeFile} name="file" />
            </div>
            <div className="text-end mt-3">
                <button className="btn btn-primary" onClick={send}>발송</button>
            </div>
        </div>
    );
}