import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './sidebar.css';

const Sidebar = ({ update, setUpdate }) => {

    const navigate = useNavigate()
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
    };

    const signOut = () => {
        axios.post('http://localhost:8000/api/logout', {}, { withCredentials: 'same-origin' })
            .then(() => {
                console.log('logging out')
                localStorage.removeItem('userId');
                setUpdate(!update)
                navigate('/')
            })
            .catch(err => console.log(err.data))
    }

    useEffect(() => {
        setActiveButton("users")
    } , [])

    return (
        <div className="sidebar-container">
            <div className="d-flex flex-column  p-3 sidebar-content">
                <ul className="nav nav-pills flex-column mb-auto">
                    {/* <h6 style={{ color: '#1D5C63', fontSize: '14px' }}>MAIN</h6>
                    <li className="nav-item">
                        <button
                            className={`nav-link link-dark ${activeButton === "dashboard" ? "active" : ""
                                }`}
                            onClick={() => {handleButtonClick("dashboard")
                                            navigate('admin/dashboard')}}
                        >
                            &nbsp;&nbsp;&nbsp;Dashboard&nbsp;&nbsp;&nbsp;
                        </button>
                    </li>
                    <br /> */}
                    <h6 style={{ color: '#1D5C63', fontSize: '14px' }}>LISTS</h6>
                    <li className="nav-item">
                        <button
                            className={`nav-link link-dark ${activeButton === "users" ? "active" : "w-100"
                                }`}
                            onClick={() => {handleButtonClick("users")
                            navigate('')
                        }}
                        >
                            Users
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link link-dark ${activeButton === "hotels" ? "active" : "w-100"
                                }`}
                            onClick={() => {handleButtonClick("hotels")
                            navigate('admin/hotels')}}
                        >
                            Hotels
                        </button>
                    </li>
                    {/* <li className="nav-item">
                        <button
                            className={`nav-link link-dark ${activeButton === "rooms" ? "active" : "w-100"
                                }`}
                            onClick={() => {handleButtonClick("rooms")
                            navigate('admin/rooms')}}
                        >
                            Rooms
                        </button>
                    </li> */}
                </ul>
                <hr />
                <button className="btn" onClick={signOut}>
                    Sign Out
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
