import React from 'react';

export default function Profileicon() {
    const loginid = sessionStorage.getItem("loginid");

  return (
    <div className="cursor-pointer symbol symbol-30px symbol-md-40px" data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end" data-kt-menu-flip="bottom">
    {loginid === null ? (
      <img src="/default.png" alt="image" />
    ) : (
      <img src="/default.png" alt="image" />
    )}
  </div>
  );
}