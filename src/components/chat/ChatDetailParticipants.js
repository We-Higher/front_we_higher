import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import ParticipantsModal from "./ParticipantsModal";
import { MY_PORT, API_BASE_URL } from "../../common/util";

export default function ChatDetailParticipants(props) {
  const participants = props.participants || []
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const listSymbol = participants && participants.length > 0 && (
    <>
      {participants.slice(0, 7).map((participant, i) => (
        <div className="symbol symbol-35px symbol-circle" key={participant.id}>
          {participant.originFname === null ?
            <img src="/default.png" alt="image"/>
            :
            <img src={`${API_BASE_URL}/image/${participant.originFname}`} alt="image"/>
          }
        </div>
      ))}
    </>
  )

  return <div className="symbol-group symbol-hover">
    {listSymbol}
    {/* <!--begin::All users--> */}
    <div className="symbol symbol-35px symbol-circle" onClick={handleShow} data-bs-target="#kt_modal_view_users">
      <span className="symbol-label fs-8 fw-bolder" data-bs-toggle="tooltip" data-bs-trigger="hover" title="View more users">+ {participants?.length}</span>
    </div>
    {/* <!--end::All users--> */}
    <ParticipantsModal show={show} onHide={handleClose} participants={participants}></ParticipantsModal>
  </div>
}