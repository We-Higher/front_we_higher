import React from 'react';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Navbar id="sidebar" expand="lg" className="bg-white">
      <Container fluid>
        {/* Logo */}
        <Navbar.Brand>
          <img alt="Logo" src="/img/logo3.png" height="55" />
        </Navbar.Brand>

        {/* Sidebar Toggle Button */}
        <Navbar.Toggle aria-controls="kt_aside" />

        <Nav className="menu-sub menu-sub-dropdown w-225px px-1 py-4">
          <div className="menu-item">
            <div className="menu-content">
              <span className="menu-section fs-5 fw-bolder ps-1 py-1">회원정보</span>
            </div>
          </div>
          <NavDropdown title="내 정보" id="nav-dropdown" className="menu-item menu-accordion">
            <NavDropdown.Item>
              <a className="menu-link" href="/member/mypage">
                <span className="menu-title">마이페이지</span>
              </a>
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="임직원 관리" id="nav-dropdown" className="menu-item menu-accordion">
            <NavDropdown.Item>
              <a className="menu-link" href="/employee/list">
                <span className="menu-title">임직원 목록</span>
              </a>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>

        {/* Sidebar Content */}
        <Navbar.Collapse id="kt_aside">
          <Nav className="flex-column flex-lg-row">
            {/* Menu Items */}
            {/* ... Add your menu items here */}

            {/* Example Menu Item */}
            <Nav.Item>
              <Nav.Link href="/main">
                <span className="bi bi-house-door-fill"></span> Main
              </Nav.Link>
            </Nav.Item>

            {/* Example Submenu */}
            <Nav className="mr-auto">
              <NavDropdown title="회원" id="nav-dropdown">
                {/* Submenu with more items */}
                <NavDropdown title="더 많은 정보" id="submenu">
                  <NavDropdown.Item as={Link} to="/member/another-page">
                    다른 페이지
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/member/yet-another-page">
                    또 다른 페이지
                  </NavDropdown.Item>
                </NavDropdown>
              </NavDropdown>
            </Nav>

            {/* ... Add more menu items and submenus as needed */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Sidebar;