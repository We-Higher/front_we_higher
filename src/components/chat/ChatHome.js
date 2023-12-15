import axios from 'axios'
import MY_PORT from '../../common/util'
import { useEffect, useState } from 'react'
import ChatInvitation from './ChatInvitation';
import ChatRoomList from './ChatRoomList';

export default function ChatHome() {
    return <>
        <h1>ChatHome</h1>
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
            {/*begin::Container*/}
            <div className=" container-xxl " id="kt_content_container">
                {/*begin::Layout*/}
                <div className="d-flex flex-column flex-lg-row">
                    <ChatInvitation></ChatInvitation>
                    <ChatRoomList></ChatRoomList>
                </div>
                {/*end::Layout*/}
            </div>
            {/*end::Container*/}
        </div>
    </>
}