import { useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";
import axios from "axios";
import Admin from "../admin/Admin";
import io from 'socket.io-client';

const Home = () => {

    const [user, setUser] = useState('')
    const userId = localStorage.getItem('userId')
    const [update, setUpdate] = useState(false)
    const socket = io('http://localhost:8000', {transports: ['websocket']})


    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${userId}`)
            .then(user => setUser(user.data))
            .catch(err => console.log(err))
    }, [update])

    return (
        <div>
            <Navbar socket={socket} update={update} setUpdate={setUpdate}/>
            {user.isAdmin ? <><Admin update={update} setUpdate={setUpdate}/></> : <><Header />
                <div className="homeContainer">
                    <Featured />
                    <FeaturedProperties />
                    <MailList />
                    <Footer />
                </div></>}
        </div>
    );
};

export default Home;