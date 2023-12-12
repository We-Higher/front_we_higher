import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import MY_PORT from "../../common/util";

export default function ChatRoomDetail() {
    const token = sessionStorage.getItem("token")
    const {id} = useParams()
    const [roomInfo, setRoomInfo] = useState()
    const [chatList, setChatList] = useState([])
    const [inviteList, setInviteList] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:${MY_PORT}/chat/room/${id}`, {headers: {Authorization: token}})
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    setRoomInfo(res.data.chatRoom)
                    setChatList(res.data.clist)
                    setInviteList(res.data.nlist)

                } else {
                    console.log(res)
                }
            })
    }, []);
    return <>
        <h1>ChatRoomDetail</h1>
        <textarea rows="1" placeholder="Type a message" id="messageInput"></textarea>
        <button type="button" id="sendMessageButton">보내기</button>
        <ul>
            {chatList.map(msg => (
                // <></>
                <li key={msg.id}>{msg.sender.username} - {msg.message}</li>
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
        <p>{roomInfo.id} / {roomInfo.roomName}</p>
    </>
}