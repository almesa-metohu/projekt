import "./navbar.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from "react"
import UserDetails from "../userDetails/UserDetails"
import io from 'socket.io-client';

const Navbar = ({ update, setUpdate, socket }) => {

    const navigate = useNavigate({ update, setUpdate })
    const userId = localStorage.getItem('userId')
    const [data, setData] = useState('')
    const [openModal, setOpenModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${userId}`)
            .then(user => setData(user.data))
            .catch(err => console.log(err))

    }, [update])

    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials: 'same-origin'})
            .then(() => {
                console.log('logging out')
                localStorage.removeItem('userId');
                navigate('/')
            })
            .catch(err => console.log(err.data))
    }

    const editProfile = (user) => {
        setSelectedUser(user);
        setOpenModal(true);  
    }

    const closeModal = () => {
        setOpenModal(false);
    };

    return (
        <>
            <div className={data.isAdmin ? 'navbarAdmin' : 'navbar'}>
                <div className={data.isAdmin ? 'navContainerAdmin' : 'navContainer'}>
                    <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}><span className='logo h4'>BooClo</span></Link>
                    {userId && data.isAdmin ? <strong className='userNameAdmin'>{data.firstName}<p style={{ fontSize: '10px', color: 'red' }}>Admin View</p></strong> : userId ?
                        <div className="dropdown">
                            <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                                {data.profilePhoto ? <img src={data.profilePhoto} alt="" width="50" height="50" className="rounded-circle me-2" /> : <img src="https://i.ibb.co/vY5LXmw/image.png" alt="" width="50" height="50" className="rounded-circle me-2" />}
                                <strong className='userName'>{data.firstName}</strong>
                            </a>
                            <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                                <li><button className="dropdown-item" onClick={() => editProfile(data)}>P&euml;rdit&euml;so profilin</button></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><button onClick={logout} className="dropdown-item text-danger" href="#">Dil</button></li>
                            </ul>
                        </div>
                        :
                        <div className="navItems">
                            <button className="navButton btn btn-light" onClick={() => { navigate('/register') }}>Regjistrohu</button>
                            <button className="navButton btn btn-light" onClick={() => { navigate('/login') }}>Login</button>
                        </div>}
                </div>
            </div>
            {openModal && (<UserDetails socket={socket} user={selectedUser} closeModal={closeModal} />)}
        </>

    )
}

export default Navbar;