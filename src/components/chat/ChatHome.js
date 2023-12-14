import axios from 'axios'
import MY_PORT from '../../common/util'
import { useEffect, useState } from 'react'
import ChatInvitation from './ChatInvitation';
import ChatRoomList from './ChatRoomList';

export default function ChatHome() {
    return <>
        <h1>ChatHome</h1>
        <ChatInvitation></ChatInvitation>
        <ChatRoomList></ChatRoomList>
    </>
}