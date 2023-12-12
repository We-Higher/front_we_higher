import {useEffect, useState} from "react";
import axios from "axios";
import MY_PORT from "../../common/util";
import $ from 'jquery';

export default function ChatRoomList() {
    const [rooms, setRooms] = useState([])
    const token = sessionStorage.getItem("token")
    useEffect(() => {
        axios.get(`http://localhost:${MY_PORT}/chat/room`, {headers: {Authorization: token}})
            .then(function (res) {
                if (res.status === 200) {
                    setRooms(res.data.rooms)
                } else {
                    console.log(res.status)
                }
            });
    }, []);
    return <>
        <h1>ChatRoomList</h1>
        <ul>
            {rooms.map(room => (
                <li key={room.id}>{room.roomName}</li>
            ))}
        </ul>
    </>
}