import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import MY_PORT from "../../common/util";
import { useStompClient, useSubscription } from "react-stomp-hooks";

export default function ChatRoomDetail() {
    const token = sessionStorage.getItem("token")
    const loginid = sessionStorage.getItem("loginid")

    const { id } = useParams()
    const [roomInfo, setRoomInfo] = useState()
    const [chatList, setChatList] = useState([])
    const [chat, setChat] = useState('');
    const [inviteList, setInviteList] = useState([])
    const [user, setUser] = useState(null)

    const stompClient = useStompClient();

    useSubscription(`/sub/chat/room/${id}`, (message) => {
        const recv = JSON.parse(message.body)
        console.log('message', recv)
        setChatList([...chatList, recv])
    });

    useEffect(() => {
        console.log('useEffect');
        loadRoom()
    }, [])

    const loadRoom = () => {
        console.log('loadRoom');
        axios.get(`http://localhost:${MY_PORT}/chat/room/${id}`, { headers: { Authorization: token } })
            .then(res => {
                if (res.status === 200) {
                    setUser(res.data.user)
                    setRoomInfo(res.data.chatRoom)
                    setChatList(res.data.clist)
                    setInviteList(res.data.nlist)

                } else {
                    console.log(res)
                }
            })
    }

    const publishMessage = () => {
        if (chat !== "") {
            if (stompClient) {
                let now = new Date();
                let year = now.getFullYear();
                let month = ("0" + (now.getMonth() + 1)).slice(-2);  // 월은 0부터 시작하므로 1을 더해줍니다.
                let date = ("0" + now.getDate()).slice(-2);
                let hours = ("0" + now.getHours()).slice(-2);
                let minutes = ("0" + now.getMinutes()).slice(-2);
                let seconds = ("0" + now.getSeconds()).slice(-2);

                let timestamp = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

                let params = new URLSearchParams()
                params.append("type", "TALK")
                params.append("room", id)
                params.append("sender", user.id)
                params.append("message", chat)
                params.append('timestamp', timestamp)

                axios
                    .post('/chat/message/add',
                        params,
                        { headers: { Authorization: token } },
                    )
                    .then(function (response) {
                        stompClient.publish({
                            destination: '/pub/chat/message', body: JSON.stringify({
                                type: 'TALK',
                                roomId: id,
                                sender: user.username,
                                message: chat,
                                roomPk: id,
                                timestamp: timestamp,
                                senderProfile: user.fname ? `/profile/${user.fname}` : '/img/default.png'
                            })
                        })
                        setChat('')
                    })
                    .catch(function (response) {
                        console.log(response)
                        alert("메세지 저장에 실패하였습니다.");
                    });
            } else {
                console.log('disconnected!!')
            }
        } else {
            alert("내용을 입력해 주세요.");
        }
    }

    const handleChange = (event) => {
        setChat(event.target.value)
    }

    const handleSubmit = (event, chat) => {
        event.preventDefault()

        publishMessage()
    }

    return <>
        <h1>ChatRoomDetail</h1>
        <form onSubmit={(event) => handleSubmit(event, chat)}>
            <textarea rows="1" placeholder="Type a message" onChange={handleChange} value={chat}></textarea>
            <button type="submit" id="sendMessageButton">보내기</button>
        </form>

        <div className={'chat-list'}>{chatList.length}</div>

        <ul>
            {chatList.map((msg, i) => (
                // <li key={i}>{msg.sender.username} - {msg.message} - {msg.timestamp}</li>
                <li key={i}>{msg.message}</li>
            ))}
        </ul>

        <h3>초대할 사람</h3>
        <ul>
            {inviteList.map(m => (
                // <></>
                <li key={m.id}>{m.username}</li>
            ))}
        </ul>
        <h3>방정보</h3>
        <p>{roomInfo?.id} / {roomInfo?.roomName} / {roomInfo?.participants.length} 명</p>
        <h3>사용자 정보</h3>
        <p>{user?.username} / {user?.id}</p>
    </>
}