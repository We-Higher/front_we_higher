import axios from "axios";
import { useEffect, useState } from "react";
import $ from 'jquery';
import { MY_PORT } from "../../common/util";

export default function ChatInvitation(props) {
  const [mList, setMList] = useState([])
  const onAddRoom = props.onAddRoom
  const [checkedMember, setCheckedMember] = useState([])
  const token = sessionStorage.getItem("token")
  useEffect(() => {
    axios.get(`http://localhost:${MY_PORT}/chat/invitation`, { headers: { Authorization: token } })
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
      let participantsArray = Array.from(participants).map(c => ({ id: c.value }))

      let data = {
        roomName: roomName,
        participants: participantsArray
      }

      onAddRoom(data)
    }

  }
  return <>
    {/*begin::Sidebar*/}
    <div className="flex-column flex-lg-row-auto w-100 w-lg-300px w-xl-400px mb-10 mb-lg-0">
      {/*begin::Contacts*/}
      <div className="card card-flush">
        {/*begin::Card header*/}
        <div className="card-header pt-7" id="kt_chat_contacts_header">
          <form onSubmit={submitHandler}>
            <div className="input-group">
              <input type="text" className="form-control" name="room_name" id="room_name" placeholder="채팅방 이름" />
              <div className="input-group-append">
                <button className="btn btn-primary" type="submit" id="createRoom">채팅방 개설
                </button>
              </div>
            </div>
          </form>
          {/*begin::Form*/}
          {/*end::Form*/}
        </div>
        {/*end::Card header*/}
        {/*begin::Card body*/}
        <div className="card-body pt-5" id="kt_chat_contacts_body">
          {/*begin::List*/}
          <div className="scroll-y me-n5 pe-5 h-200px h-lg-auto" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header" data-kt-scroll-wrappers="#kt_content, #kt_chat_contacts_body" data-kt-scroll-offset="5px">
            {/*begin::User*/}
            <div className="d-flex flex-stack py-4">
              {mList.map((m, i) => (
                <>
                  {/*begin::Details*/}
                  < div className="d-flex align-items-center" >
                    {/*begin::Avatar*/}
                    <div div className="symbol  symbol-45px symbol-circle " >
                      {m.originFname === null ?
                        <img src="/default.png" alt="image" />
                        :
                        <img src={`/profile/${m.originFname}`} alt="image" />
                      }
                      {m.cstatus === 1 ?
                        <div className="symbol-badge bg-success start-100 top-100 border-4 h-15px w-15px ms-n2 mt-n2" />
                        :
                        ''
                      }
                    </div>
                    {/*end::Avatar*/}
                    {/*begin::Details*/}
                    <div className="ms-6">
                      {/*begin::Name*/}
                      <a href="#" className="d-flex align-items-center fs-5 fw-bolder text-dark text-hover-primary">
                        <span>{m.name}</span>
                        <span className="badge badge-light fs-8 fw-bold ms-2">{m.deptName} {m.companyRankName}</span>
                      </a>
                      {/*end::Name*/}
                      {/*begin::Email*/}
                      <div className="fw-bold text-muted">{m.email}</div>
                      {/*end::Email*/}
                    </div>
                    {/*end::Details*/}
                  </div>
                  {/*end::Details*/}
                  {/*begin::checkbox*/}
                  <div className="p-0">
                    <div className="form-check form-check-sm form-check-custom form-check-solid">
                      <input className="form-check-input" type="checkbox" value={m.id} name="participants" />
                    </div>
                  </div>
                  {/*end::checkbox*/}
                </>
              ))}

            </div>
            {/*end::User*/}
            {/*begin::Separator*/}
            <div className="separator separator-dashed" />
            {/*end::Separator*/}
          </div>
          {/*end::List*/}
        </div>
        {/*end::Card body*/}
      </div >
      {/*end::Contacts*/}
    </div >
    {/*end::Sidebar*/}
  </>
}