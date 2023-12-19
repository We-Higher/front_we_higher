import { Modal } from "react-bootstrap";
import { MY_PORT } from "../../common/util";

export default function ChatInviteModal({ show, onHide, inviteList, onInvite }) {
  const modalList = <>
    {inviteList.map((m, i) => (
      <div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed" key={m.id}>
        {/* <!--begin::User--> */}
        <div className="d-flex align-items-center">
          {/* <!--begin::Avatar--> */}
          <div className="symbol symbol-35px symbol-circle">
            {m.originFname === null ?
              <img src="/default.png" alt="image"/>
              :
              <img src={`http://localhost:${MY_PORT}/image/${m.originFname}`} alt="image"/>
            }
            {m.cstatus === 1 ?
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
              <span>{m.name}</span>
              <span
                className="badge badge-light fs-8 fw-bold ms-2">{m.deptName} {m.companyRankName}</span>
            </a>
            {/* <!--end::Name--> */}

            {/* <!--begin::Email--> */}
            <div className="fw-bold text-muted">{m.email}</div>
            {/* <!--end::Email--> */}
          </div>
          {/* <!--end::Details--> */}
        </div>
        {/* <!--end::User--> */}
        {/* <!--begin::checkbox-->*/}
        <div className="p-0">
          <div className="form-check form-check-sm form-check-custom form-check-solid">
            <input className="form-check-input" type="checkbox" value={m.id} name="invitation"/>
          </div>
        </div>
        {/* <!--end::checkbox-->*/}
        {/* <!--begin::Stats--> */}
        {/* <!--end::Stats--> */}
      </div>
    ))}
  </>
  const handleInvite = () => {
    let checked = document.querySelectorAll('input[name="invitation"]:checked')

    if (checked.length === 0) {
      alert('초대할 사람을 선택해 주세요')
      return
    }
    onInvite(checked)
  }

  return <Modal
    show={show}
    onHide={onHide}
    scrollable={true}
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title>
        <button className="btn btn-primary" id="invite-m" onClick={handleInvite}>초대하기</button>
      </Modal.Title>
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