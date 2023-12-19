import { Modal } from "react-bootstrap";
import { MY_PORT } from "../../common/util";

export default function ParticipantsModal({ show, onHide, participants }) {
  const modalList = <>
    {participants.map((participant, i) => (
      <div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
        {/* <!--begin::Details--> */}
        <div className="d-flex align-items-center">
          {/* <!--begin::Avatar--> */}
          <div className="symbol symbol-35px symbol-circle">
            {participant.originFname === null ?
              <img src="/default.png" alt="image"/>
              :
              <img src={`http://localhost:${MY_PORT}/image/${participant.originFname}`} alt="image"/>
            }
            {participant.cstatus === 1 ?
              <div className="symbol-badge bg-success start-100 top-100 border-4 h-15px w-15px ms-n2 mt-n2"/>
              :
              ''
            }
          </div>
          {/* <!--end::Avatar--> */}

          {/* <!--begin::Details--> */}
          <div className="ms-6">
            {/* <!--begin::Name--> */}
            <a href="#"
               className="d-flex align-items-center fs-5 fw-bolder text-dark text-hover-primary">
              <span>{participant.name}</span>
              <span
                className="badge badge-light fs-8 fw-bold ms-2">{participant.deptName} {participant.companyRankName}</span>
            </a>
            {/* <!--end::Name--> */}

            {/* <!--begin::Email--> */}
            <div className="fw-bold text-muted">{participant.email}</div>
            {/* <!--end::Email--> */}
          </div>
          {/* <!--end::Details--> */}
        </div>
        {/* <!--end::Details--> */}

        {/* <!--begin::Stats--> */}
        <div className="d-flex">
          {/* <!--begin::Sales--> */}
          {/* <!--end::Sales--> */}
        </div>
        {/* <!--end::Stats--> */}
      </div>
    ))}
  </>

  return <Modal
    show={show}
    onHide={onHide}
    scrollable={true}
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title>참여자 목록</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="mb-15">
        {/* <!--begin::List--> */}
        <div className="mh-375px scroll-y me-n7 pe-7">
          {modalList}
        </div>
        {/* <!--end::List--> */}
      </div>
      {/* <!--end::Users--> */}
    </Modal.Body>
  </Modal>
}