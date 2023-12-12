import axios from 'axios'
import MY_PORT from '../../common/util'
import { useEffect, useState } from 'react'
import ChatInvitation from './ChatInvitation';
import ChatRoomList from './ChatRoomList';

export default function ChatHome() {
    const [rooms, setRooms] = useState([])
    const token = sessionStorage.getItem("token");
    useEffect(() => {
        axios.get('http://localhost:' + MY_PORT + '/chat/room', { headers: { Authorization: token } })
            .then(res => {
                if (res.status === 200) {
                    setRooms(res.data.mlist)
                    console.log(res.data.mlist);
                } else {
                    console.error(res.status);
                }
            })

    }, [])
    return <>
        <h1>ChatHome</h1>
        <ChatInvitation></ChatInvitation>
        <ChatRoomList></ChatRoomList>
    </>
}