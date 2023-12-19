import axios from 'axios'
import { useEffect, useState } from 'react'
import ChatInvitation from './ChatInvitation'
import ChatRoomList from './ChatRoomList'
import $ from 'jquery'
import '../../css/chat/chat_home.css'
import { MY_PORT } from "../../common/util";

export default function ChatHome() {
  const token = sessionStorage.getItem('token')
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    axios
      .get(
        `http://localhost:${MY_PORT}/chat/room`,
        { headers: { Authorization: token } })
      .then(function (res) {
        if (res.status === 200) {
          setRooms(res.data.rooms)
        } else {
          console.log(res.status)
        }
      })
  }, [])

  const addRoomHandler = (data) => {
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
        alert(response.data.room.roomName + "방 개설에 성공하였습니다.")
        setRooms([response.data.room, ...rooms])
        $('#room_name').val('')
        let checkedMembers = document.querySelectorAll('input[name="participants"]:checked')
        checkedMembers.forEach(function (checkedMember) {
          checkedMember.checked = false;
        })
      })
      .catch(function (response) {
        console.log(response)
        alert("채팅방 개설에 실패하였습니다.");
      });
  }

  const outRoomHandler = (id) => {
    axios
      .post(`http://localhost:${MY_PORT}/chat/room/out/` + id,
        '',
        {
          headers: {
            Authorization: token,
          }
        }
      )
      .then(function (response) {
        alert(response.data.room.roomName + '방을 나갔습니다.')
        setRooms(rooms.filter(room => room.id !== Number(id)))
      })
      .catch(function (response) {
        console.log(response)
        alert("나가기 실패!");
      })
  }

  return <>
    <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
      {/*begin::Container*/}
      <div className=" container-xxl " id="kt_content_container">
        {/*begin::Layout*/}
        <div className="d-flex flex-column flex-lg-row">
          <ChatInvitation onAddRoom={addRoomHandler}></ChatInvitation>
          <ChatRoomList rooms={rooms} onOutRoom={outRoomHandler}></ChatRoomList>
        </div>
        {/*end::Layout*/}
      </div>
      {/*end::Container*/}
    </div>
  </>
}