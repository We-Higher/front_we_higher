import axios from "axios";
import MY_PORT from "../../common/util";
import {useEffect, useState} from "react";
import $ from 'jquery';

export default function ChatInvitation() {
    const [mList, setMList] = useState([])
    const token = sessionStorage.getItem("token")
    useEffect(() => {
        axios.get(`http://localhost:${MY_PORT}/chat/invitation`, {headers: {Authorization: token}})
            .then(res => {
                if (res.status === 200) {
                    setMList(res.data.mlist)
                } else {
                    console.error(res.status);
                }
            })
    }, [])

    // let data = mList.map((m) => {
    //     return <li key={m.id}>{m.username}<input type="checkbox" value={m.id} name="participants"></input></li>
    // })

    const submitHandler = (event) => {
        event.preventDefault()
        let roomName = $('#room_name').val();
        if (roomName === "") {
            alert("방 제목을 입력해 주십시요.");
            return;
        } else {
            let participants = document.querySelectorAll('input[name="participants"]:checked')
            let participantsArray = Array.from(participants).map(c => ({id: c.value}))

            let data = {
                roomName: roomName,
                participants: participantsArray
            };

            axios
                .post(`http://localhost:${MY_PORT}/chat/room`,
                    data,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: token,
                        }
                    }
                )
                .then(function (response) {
                    alert(response.data.roomName + "방 개설에 성공하였습니다.")
                    $('#room_name').val('')
                    participants.forEach(function (participant) {
                        participant.checked = false;
                    })
                })
                .catch(function (response) {
                    console.log(response)
                    alert("채팅방 개설에 실패하였습니다.");
                });
        }

    }
    return <>
        <h1>ChatInvitation</h1>
        <form onSubmit={submitHandler}>
            <input type="text" name="room_name" id="room_name" placeholder="채팅방 이름"/>
            <button type="submit" id="createRoom">채팅방 개설</button>
        </form>
        <ul>
            {mList.map((m) => (
                <li key={m.id}>{m.username}<input type="checkbox" value={m.id} name="participants"/></li>
            ))}
        </ul>
    </>
}