import { Toast, ToastContainer } from "react-bootstrap";

export default function ChatAlarm({chatAlarmList, handleClose}) {
    const items = chatAlarmList.map((c, i) => (
        <Toast id={`cat-${c.id}`} key={i} onClose={() => handleClose(i, c.id)} delay={3000} bg={'primary'} autohide>
            <Toast.Header>
                <strong className="me-auto">{c.sender.username}</strong>
                <small className="text-muted">{c.timestamp}</small>
            </Toast.Header>
            <Toast.Body>{c.message}</Toast.Body>
        </Toast>
    ))

    return <ToastContainer position={'bottom-end'} className="position-absolute" id="ChatAlarmContainer">
        {items}
    </ToastContainer>
}