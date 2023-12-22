import axios from "axios";
import { useSubscription } from "react-stomp-hooks";
import { MY_PORT, API_BASE_URL } from "../../common/util";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import Router from "../../Router";
import Footer from "./footer";
import React, { useEffect, useState } from "react";
import ChatAlarm from "../alarm/ChatAlarm";

export default function MainLayout() {
    return <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
            <div className="sidebar">
                <Sidebar/>
            </div>
            <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
                <div className="navbar">
                    <Navbar/>
                </div>
                <div className="content">
                    <Router/>
                </div>
                <div className="footer">
                    <Footer/>
                </div>
            </div>
        </div>
    </div>
}