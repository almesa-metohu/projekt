import React, { useState } from "react";
import Sidebar from "../../components/adminSidebar/Sidebar";
import {
    Routes,
    Route,
} from "react-router-dom";
import './admin.css'
import Dashboard from "../../components/dashboard/Dashboard";
import Users from "../../components/users/Users";
import Hotels from "../../components/hotels/Hotels";
import io from 'socket.io-client';
import AddRoom from "../../components/addRoom/AddRoom";

const Admin = ({ update, setUpdate }) => {

    const socket = io('http://localhost:8000', {transports: ['websocket']})

    return (
        <div>
            <div className="d-flex wraping-container">
                <div className="sidebar-container">
                    <Sidebar update={update} setUpdate={setUpdate}/>
                </div>
                <div className="components-container">
                    <Routes>
                        <Route path="admin/dashboard" element={<Dashboard/>}/>
                        <Route path="" element={<Users socket={socket} update={update} setUpdate={setUpdate}/>} />
                        <Route path="admin/hotels" element={<Hotels socket={socket} update={update} setUpdate={setUpdate}/>} />
                        <Route path="admin/rooms" element={<AddRoom socket={socket} update={update} setUpdate={setUpdate}/>} />
                    </Routes>
                </div>
            </div>

        </div>
    )
}


export default Admin;