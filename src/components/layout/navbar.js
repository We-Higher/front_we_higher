import React from 'react';
import '../../css/style.bundle.css';
import '../../css/plugins.bundle.css';
import '../../css/layout.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import Profileicon from '../icons/Profileicon';

export default function Navbar() {
  const myPort = process.env.REACT_APP_MY_PORT;
  const token = sessionStorage.getItem("token");
  const loginid = sessionStorage.getItem("loginid");
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    alert('로그아웃 되셨습니다.');
    window.location.reload();
  }

  const attendence = () => {

    axios.post(`http://localhost:${myPort}/auth/commute/attendance`,
      {},
      { headers: { Authorization: token } })
      .then(function (res) {
        if (res.status === 200) {
          if (res.data.flag) {
            alert('출근이 정상적으로 처리되었습니다.');
            navigate('/main')
          }
          else {
            alert('이미 출근처리가 완료되었습니다.');
            navigate('/main')
          }
        } else {
          alert('error:' + res.status);
        }
      })
  }

  const quit = () => {

    axios.post(`http://localhost:${myPort}/auth/commute/quit`,
      {},
      { headers: { Authorization: token } })
      .then(function (res) {
        if (res.status === 200) {
          if (res.data.flag) {
            alert('퇴근이 정상적으로 처리되었습니다.');
            navigate('/main')
          }
          else {
            alert('이미 퇴근처리가 완료되었습니다.');
            navigate('/main')
          }
        } else {
          alert('error:' + res.status);
        }
      })
      .catch(error => {
        alert('출근을 먼저 해야합니다.');
      });

  }

  const mail = () => {
    navigate('/mail/send');
  }

  return (
    <div className="container-fluid d-flex align-items-stretch justify-content-between" id="kt_header_container" style={{ display: 'flex' }}>
      <div className="page-title d-flex flex-column align-items-start justify-content-center flex-wrap me-lg-2 pb-2 pb-lg-0" data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', lg: '#kt_header_container'}">
        <h1 className="text-dark fw-bolder my-1 fs-2 mt-3">
          <img alt="Logo" src="/logo2.png" style={{ width: '50%', maxWidth: '400px', height: 'auto', marginLeft: 'auto', marginRight: 'auto' }} />
        </h1>
      </div>
      <div className="d-flex align-items-stretch flex-shrink-0">
        <div className="d-flex align-items-stretch ms-1 ms-lg-3">
          {/* 출근 */}
          <div id="kt_header_search" className="d-flex align-items-stretch">
            <div className="d-flex align-items-center" data-kt-search-element="toggle" id="kt_header_search_toggle">
              <div className="btn btn-icon btn-active-light-primary">
                <Button variant="none" onClick={attendence}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    fill="currentColor" class="bi bi-door-closed"
                    viewBox="0 0 16 16" color="#ADB5BD">
                    <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2zm1 13h8V2H4v13z" />
                    <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-stretch">
          {/* 퇴근 토글 */}
          <div className="d-flex align-items-center">
            <div className="btn btn-icon btn-active-light-primary">
              <Button variant="none" onClick={quit}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-open" viewBox="0 0 16 16" color="#ADB5BD">
                  <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
                  <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center ms-1 ms-lg-3">
          {/* 메신저 */}
          <div className="btn btn-icon btn-active-light-primary position-relative w-30px h-30px w-md-40px h-md-40px" data-bs-toggle="tooltip" title="메신저" data-bs-html="true" data-bs-placement="bottom" id="kt_drawer_chat_toggle">
            <span className="svg-icon svg-icon-1">
              <Link to='/chat'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                  <path d="M16,15.6315789 L16,12 C16,10.3431458 14.6568542,9 13,9 L6.16183229,9 L6.16183229,5.52631579 C6.16183229,4.13107011 7.29290239,3 8.68814808,3 L20.4776218,3 C21.8728674,3 23.0039375,4.13107011 23.0039375,5.52631579 L23.0039375,13.1052632 L23.0206157,17.786793 C23.0215995,18.0629336 22.7985408,18.2875874 22.5224001,18.2885711 C22.3891754,18.2890457 22.2612702,18.2363324 22.1670655,18.1421277 L19.6565168,15.6315789 L16,15.6315789 Z"
                    fill="#000000" />
                  <path d="M1.98505595,18 L1.98505595,13 C1.98505595,11.8954305 2.88048645,11 3.98505595,11 L11.9850559,11 C13.0896254,11 13.9850559,11.8954305 13.9850559,13 L13.9850559,18 C13.9850559,19.1045695 13.0896254,20 11.9850559,20 L4.10078614,20 L2.85693427,21.1905292 C2.65744295,21.3814685 2.34093638,21.3745358 2.14999706,21.1750444 C2.06092565,21.0819836 2.01120804,20.958136 2.01120804,20.8293182 L2.01120804,18.32426 C1.99400175,18.2187196 1.98505595,18.1104045 1.98505595,18 Z M6.5,14 C6.22385763,14 6,14.2238576 6,14.5 C6,14.7761424 6.22385763,15 6.5,15 L11.5,15 C11.7761424,15 12,14.7761424 12,14.5 C12,14.2238576 11.7761424,14 11.5,14 L6.5,14 Z M9.5,16 C9.22385763,16 9,16.2238576 9,16.5 C9,16.7761424 9.22385763,17 9.5,17 L11.5,17 C11.7761424,17 12,16.7761424 12,16.5 C12,16.2238576 11.7761424,16 11.5,16 L9.5,16 Z"
                    fill="#000000" opacity="0.3" />
                </svg>
              </Link>
              <span className="bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink"></span>
            </span>
          </div>
        </div>

        <div className="d-flex align-items-center ms-1 ms-lg-3">
          {/* 메일 */}
          <div className="btn btn-icon btn-active-light-primary position-relative w-30px h-30px w-md-40px h-md-40px" data-bs-toggle="tooltip" title="메일" data-bs-html="true" data-bs-placement="bottom" onClick={mail}>
            <span className="svg-icon svg-icon-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16" color="#ADB5BD">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
              </svg>
            </span>
          </div>
        </div>

        <div className="d-flex align-items-center ms-1 ms-lg-3">
          {/* 사용자 정보 */}
          <NavDropdown title={<Profileicon />} id="nav-dropdown">
            <NavDropdown.Item as={Link} to="/member/mypage">
              내 정보
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>
              로그아웃
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </div>
    </div>
  );
};
