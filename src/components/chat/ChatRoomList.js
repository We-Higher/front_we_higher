import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ChatRoomList(props) {
  const rooms = props.rooms
  const outRoomHandler = props.onOutRoom

  let roomsItems = rooms.length > 0 && (
    <>
      {rooms.map((room, i) => (
        <div className="d-flex align-items-sm-center my-9" key={room.id}>
          <div className="d-flex align-items-center flex-row-fluid flex-wrap">
            <div className="flex-grow-1 me-2">
              <Link className="text-gray-800 text-hover-primary fs-4 fw-bolder" to={`/chat/room/${room.id}`}>
                {room.roomName}
              </Link>
            </div>
            <span className="badge fs-6 badge-light fw-bold my-2">{room.participants.length} 명</span>
            <button className="btn btn-danger btn-sm out-room" onClick={e => outRoomHandler(room.id)} data-room-id={room.id}>나가기</button>
          </div>
        </div>
      ))}
    </>
  )
  return <>
    {/*begin::Content*/}
    <div className="flex-lg-row-fluid ms-lg-7 ms-xl-10">
      {/*begin::Messenger*/}
      <div className="card" id="kt_chat_messenger">
        {/*begin::Card header*/}
        <div className="card-header" id="kt_chat_messenger_header">
          {/*begin::Title*/}
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bolder text-gray-800 fs-2">참여한 채팅방</span>
            <span className="text-gray-400 fw-semibold mt-2 fs-6" id="chatrooms-sub-header" />
          </h3>
          {/*end::Title*/}
          {/*begin::Card toolbar*/}
          {/*end::Card toolbar*/}
        </div>
        {/*end::Card header*/}
        {/*begin::Card body*/}
        <div className="card-body" id="kt_chat_messenger_body">
          {/*begin::Rooms*/}
          <div className="scroll-y me-n5 pe-5 h-300px h-lg-auto scroll-list" data-kt-element="messages" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_header, #kt_toolbar, #kt_footer, #kt_chat_messenger_header, #kt_chat_messenger_footer" data-kt-scroll-wrappers="#kt_content, #kt_chat_messenger_body" data-kt-scroll-offset="5px" style={{ minHeight: '733px' }} id="chatrooms">
            {roomsItems}
          </div>
          {/*end::Rooms*/}
        </div>
        {/*end::Card body*/}
        {/*begin::Card footer*/}
        {/*end::Card footer*/}
      </div>
      {/*end::Messenger*/}
    </div>
    {/*end::Content*/}
  </>
}