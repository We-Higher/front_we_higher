import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../../common/util";

export default function Profileicon() {
    const loginid = sessionStorage.getItem("loginid");
    const myPort = process.env.REACT_APP_MY_PORT;
    const token = sessionStorage.getItem("token");
    const [mdto, setDto] = useState({});

    useEffect(() => {
      axios.get(`${API_BASE_URL}/auth/mypage`, { headers: { Authorization: token } })
          .then(
              function (res) {
                  if (res.status === 200) {
                      if (res.data.flag) {
                          setDto(res.data.mdto);
                      } else {
                      }
                  } else {
                      alert('error:' + res.status);
                  }
              }
          );
  }, []);

  return (
    <div className="cursor-pointer symbol symbol-30px symbol-md-40px" data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end" data-kt-menu-flip="bottom">
    {loginid === null || mdto.originFname === null ? (
      <img src="/default.png" alt="image" />
    ) : (
      <img src={`${API_BASE_URL}/image/${mdto.originFname}`} alt="image" />
    )}
  </div>
  );
}