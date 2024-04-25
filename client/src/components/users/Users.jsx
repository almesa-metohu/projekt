import React from "react";
import './users.css'
import axios from "axios";
import { useEffect, useState } from "react";
import UserDetails from "../userDetails/UserDetails";
import { useNavigate } from "react-router-dom";
import AddUser from "../addUser/AddUser";

const Users = ({ socket, update, setUpdate }) => {

    const [users, setUsers] = useState([])
    const [openModal, setOpenModal] = useState(false);
    const [openModalNew, setOpenModalNew] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users`, { withCredentials: true })
            .then(res => setUsers(res.data))
            .catch(err => console.log(err))
        socket.on('toClient', () => {
            setUpdate(!update)
        })
        return () => socket.removeAllListeners()

    }, [update])

    const viewUser = (user) => {
        setSelectedUser(user);
        setOpenModal(true);    
    }

    const closeModal = () => {
        setOpenModal(false);
    };

    const closeModalNew = () => {
        setOpenModalNew(false);
    };

    const deleteUser = (userId) => {
        axios.delete(`http://localhost:8000/api/user/${userId}`, { withCredentials: true })
            .then((res) => {
                socket.emit('toServer', res.data)
                console.log('user deleted')})
            .catch((err) => console.log('error deleting user' + err))
    }

    const addUser = () => {
        setOpenModalNew(true)
    }

    return (
        <div className="users-container">
            <div className="d-flex justify-content-between">
                <h3 style={{ color: '#417D7A' }}>Add a new user</h3>
                <button className="btn" style={{ border: '1px solid #417D7A', color: '#417D7A' }} onClick={addUser}>Add New</button>
            </div>
            <br />
            <table className="table col-sm-6 table-bordered ">
                <thead>
                    <tr>
                        <th scope="col">User</th>
                        <th scope="col">Email</th>
                        <th scope="col">Shteti</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.profilePhoto ? <img src={user.profilePhoto} alt="" style={{ width: '40px', height: '40px', border: 'none', borderRadius: '50%' }} /> : <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png" alt="" style={{ width: '40px', height: '40px', border: '1px solid black', borderRadius: '50%' }} />} &nbsp;&nbsp;&nbsp;
                                {user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.country}</td>
                            <td className="d-flex justify-content-around">
                                <button className="btn btn-success" onClick={() => viewUser(user)}>Shih</button>
                                <button className="btn btn-danger" onClick={() => deleteUser(user._id)}>Fshi</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {openModal && ( <UserDetails socket={socket} user={selectedUser} closeModal={closeModal}/> )}
            {openModalNew && ( <AddUser socket={socket} closeModalNew={closeModalNew}/> )}
        </div>
    )
}

export default Users