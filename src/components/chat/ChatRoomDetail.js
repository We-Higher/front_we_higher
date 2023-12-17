import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useStompClient, useSubscription } from 'react-stomp-hooks'
import { MY_PORT } from '../../common/util'
import ChatDetailParticipants from "./ChatDetailParticipants";

export default function ChatRoomDetail() {
    const token = sessionStorage.getItem('token')
    const loginid = sessionStorage.getItem('loginid')

    const { id } = useParams()
    const [roomInfo, setRoomInfo] = useState(null)
    const [roomParticipants, setRoomParticipants] = useState(null)
    const [chatList, setChatList] = useState([])
    const [chat, setChat] = useState('')
    const [inviteList, setInviteList] = useState([])
    const [user, setUser] = useState(null)

    const stompClient = useStompClient()

    useSubscription(`/sub/chat/room/${id}`, (message) => {
        const recv = JSON.parse(message.body)
        console.log('message', recv)
        setChatList([...chatList, recv])
    })

    useEffect(() => {
        loadRoom()
    }, [])

    useEffect(() => {
        let scroll = document.getElementById('messages')
        scroll.scrollTop = scroll.scrollHeight
    }, [chatList])

    const loadRoom = () => {
        console.log('loadRoom')
        axios.get(`http://localhost:${MY_PORT}/chat/room/${id}`, { headers: { Authorization: token } })
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    setUser(res.data.user)
                    setRoomInfo(res.data.chatRoom)
                    setChatList(res.data.clist)
                    setInviteList(res.data.nlist)
                    setRoomParticipants(res.data.chatRoom.participants)
                    console.log('roomParticipants', roomParticipants)
                } else {
                    console.log(res)
                }
            })
    }

    const publishMessage = () => {
        if (chat === '') {
            alert('내용을 입력해 주세요.')
            return
        }
        if (stompClient) {
            let now = new Date()
            let year = now.getFullYear()
            let month = ('0' + (now.getMonth() + 1)).slice(-2)
            let date = ('0' + now.getDate()).slice(-2)
            let hours = ('0' + now.getHours()).slice(-2)
            let minutes = ('0' + now.getMinutes()).slice(-2)
            let seconds = ('0' + now.getSeconds()).slice(-2)

            let timestamp = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`

            let params = new URLSearchParams()
            params.append('type', 'TALK')
            params.append('room', id)
            params.append('sender', user.id)
            params.append('message', chat)
            params.append('timestamp', timestamp)

            axios
                .post('/chat/message/add',
                    params,
                    { headers: { Authorization: token } },
                )
                .then(function (response) {
                    setChat('')
                })
                .catch(function (response) {
                    console.log(response)
                    alert('메세지 저장에 실패하였습니다.')
                })
        } else {
            alert('disconnected!!')
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
        <div className=" container-xxl " id="kt_content_container">
            {/*begin::Layout*/}
            <div className="d-flex flex-column flex-lg-row">
                {/*begin::Sidebar*/}
                {/*end::Sidebar*/}
                {/*begin::Content*/}
                <div className="flex-lg-row-fluid ms-lg-7 ms-xl-10">
                    {/*begin::Messenger*/}
                    <div className="card" id="kt_chat_messenger">
                        {/*begin::Card header*/}
                        <div className="card-header" id="kt_chat_messenger_header">
                            {/*begin::Title*/}
                            <div className="card-title">
                                {/*begin::Users*/}
                                <ChatDetailParticipants participants={roomParticipants}></ChatDetailParticipants>
                                {/*end::Users*/}
                            </div>
                            {/*end::Title*/}
                            {/*begin::Card toolbar*/}
                            {/*end::Card toolbar*/}
                        </div>
                        {/*end::Card header*/}
                        {/*begin::Card body*/}
                        <div className="card-body" id="kt_chat_messenger_body">
                            {/*begin::Messages*/}
                            <div className="scroll-y me-n5 pe-5 h-300px h-lg-auto scroll-list" data-kt-element="messages" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_header, #kt_toolbar, #kt_footer, #kt_chat_messenger_header, #kt_chat_messenger_footer" data-kt-scroll-wrappers="#kt_content, #kt_chat_messenger_body" data-kt-scroll-offset="5px" style={{ minHeight: '733px' }} id="messages">
                                {chatList.map((c, i) => (
                                    c.sender.id !== user.id ?
                                        // begin::Message(in)
                                        <div className="d-flex justify-content-start mb-10" key={c.id}>
                                            {/*begin::Wrapper*/}
                                            <div className="d-flex flex-column align-items-start">
                                                {/*begin::User*/}
                                                <div className="d-flex align-items-center mb-2">
                                                    {/*begin::Avatar*/}
                                                    <div className="symbol  symbol-35px symbol-circle ">
                                                        {c.sender.originFname === null ?
                                                            <img src="/default.png" alt="no-image" />
                                                            :
                                                            <img src={`/profile/${c.sender.originFname}`} alt="image" />
                                                        }
                                                    </div>
                                                    {/*end::Avatar*/}
                                                    {/*begin::Details*/}
                                                    <div className="ms-3">
                                                        <a href="#" className="fs-5 fw-bolder text-gray-900 text-hover-primary me-1">{c.sender.name}</a>
                                                        <span className="text-muted fs-7 mb-1">{c.timestamp}</span>
                                                    </div>
                                                    {/*end::Details*/}
                                                </div>
                                                {/*end::User*/}
                                                {/*begin::Text*/}
                                                <div className="p-5 rounded bg-light-info text-dark fw-bold mw-lg-400px text-start" data-kt-element="message-text" style={{ whiteSpace: 'pre-line' }}>
                                                    {c.message}
                                                </div>
                                                {/*end::Text*/}
                                            </div>
                                            {/*end::Wrapper*/}
                                        </div>
                                        // end::Message(in)
                                        :
                                        // begin::Message(out)
                                        <div className="d-flex justify-content-end mb-10" key={c.id}>
                                            {/*begin::Wrapper*/}
                                            <div className="d-flex flex-column align-items-end">
                                                {/*begin::User*/}
                                                <div className="d-flex align-items-center mb-2">
                                                    {/*begin::Details*/}
                                                    <div className="me-3">
                                                        <span className="text-muted fs-7 mb-1">{c.timestamp}</span>
                                                        <a href="#" className="fs-5 fw-bolder text-gray-900 text-hover-primary ms-1">{c.sender.name}</a>
                                                    </div>
                                                    {/*end::Details*/}
                                                    {/*begin::Avatar*/}
                                                    <div className="symbol  symbol-35px symbol-circle ">
                                                        {c.sender.originFname === null ?
                                                            <img src="/default.png" alt="image" />
                                                            :
                                                            <img src={`/profile/${c.sender.originFname}`} alt="image" />
                                                        }
                                                    </div>
                                                    {/*end::Avatar*/}
                                                </div>
                                                {/*end::User*/}
                                                {/*begin::Text*/}
                                                <div className="p-5 rounded bg-light-primary text-dark fw-bold mw-lg-400px text-end" data-kt-element="message-text" style={{ whiteSpace: 'pre-line' }}>
                                                    {c.message}
                                                </div>
                                                {/*end::Text*/}
                                            </div>
                                            {/*end::Wrapper*/}
                                        </div>
                                    // end::Message(out)
                                ))}
                            </div>
                            {/*end::Messages*/}
                        </div>
                        {/*end::Card body*/}
                        {/*begin::Card footer*/}
                        <div className="card-footer pt-4" id="kt_chat_messenger_footer">
                            <form onSubmit={(event) => handleSubmit(event, chat)}>
                                {/*begin::Input*/}
                                <textarea className="form-control form-control-flush mb-3" rows="1" data-kt-element="input" placeholder="Type a message" id="messageInput" onChange={handleChange} value={chat}></textarea>
                                {/*end::Input*/}
                                {/*begin:Toolbar*/}
                                <div className="d-flex flex-stack">
                                    {/*begin::Actions*/}
                                    <div className="d-flex align-items-center me-2">
                                        <button className="btn btn-sm btn-icon btn-active-light-primary me-1" type="button" data-bs-toggle="tooltip" title="Coming soon"><i className="bi bi-paperclip fs-3" /></button>
                                        <button className="btn btn-sm btn-icon btn-active-light-primary me-1" type="button" data-bs-toggle="tooltip" title="Coming soon"><i className="bi bi-upload fs-3" /></button>
                                    </div>
                                    {/*end::Actions*/}
                                    {/*begin::Send*/}
                                    <button className="btn btn-primary" type="submit" data-kt-element="send" id="sendMessageButton">보내기</button>
                                    {/*end::Send*/}
                                </div>
                                {/*end::Toolbar*/}
                            </form>
                        </div>
                        {/*end::Card footer*/}
                    </div>
                    {/*end::Messenger*/}
                </div>
                {/*end::Content*/}
            </div>
            {/*end::Layout*/}
            {/*begin::Modals*/}
            {/*begin::Modal - View Users*/}
            {/*end::Modal - View Users*/}
            {/*begin::Modal - Users Search*/}
            {/*end::Modal - Users Search*/}
            {/*end::Modals*/}
        </div>
        {/*end::Container*/}
    </>
}