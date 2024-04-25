import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [reserved, setReserved] = useState(false);
    const [hotelName, setHotelName] = useState('');
    const [hotelCity, setHotelCity] = useState('');
    const [usersName, setUsersName] = useState('');
    const [usersEmail, setUsersEmail] = useState('');
    const { data, loading, error } = useFetch(`http://localhost:8000/api/hotel/rooms/${hotelId}`);
    const { dates } = useContext(SearchContext);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        axios.get(`http://localhost:8000/api/hotel/${hotelId}`)
        .then(hotel => {
            setHotelName(hotel.data.name)
            setHotelCity(hotel.data.city)
        })
        .catch(err => console.log(err))

        axios.get(`http://localhost:8000/api/user/${userId}`)
        .then(user => {
            setUsersName(user.data.firstName + " " + user.data.lastName)
            setUsersEmail(user.data.email)
        })
        .catch(err => console.log(err))
    }, [])


    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const date = new Date(start.getTime());
        const dates = [];

        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }
        return dates;
    };

    
    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
            alldates.includes(new Date(date).getTime())
        );
        return !isFound;
    };

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
            checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value)
        );
    };


    const handleClick = () => {
        let reservationStart = alldates[0]
        let reservationEnd = alldates[alldates.length - 1]
        let formattedStart = new Date(reservationStart).toLocaleDateString()
        let formattedEnd = new Date(reservationEnd).toLocaleDateString()

        Promise.all(
            selectedRooms.map(async (roomId) => {
                const res = await axios.put(`http://localhost:8000/api/roomAvailability/${roomId}`, {
                    dates: alldates,
                });
                return res.data;
            })
        )
            .then(() => {
                setReserved(true);
                axios.post('http://localhost:8000/api/sendEmailReservation', {
                    formattedStart,
                    formattedEnd,
                    hotelName,
                    hotelCity,
                    usersName,
                    usersEmail
                })
                    .then(() => console.log('Email sent successfully'))
                    .catch(err => console.log('There was an error sending the email', err))
            })
            .catch((err) => {
                console.log(err)
            });
    };

    return (
        <div className="reserve">
            <div className="rContainer">
                {loading ? 'loading...' :
                    <><FontAwesomeIcon
                        icon={faCircleXmark}
                        className="rClose"
                        onClick={() => setOpen(false)}
                    />
                        {reserved ? <>
                            <h5>Check your email for the booking details</h5>
                            <h6>Check your spam folder</h6>
                            <button className="rButton" onClick={() => navigate('/')}>Return to the home page</button>
                        </> : <>
                            <span>Select your rooms:</span>
                            {data.map((item, index) => (
                                <div className="rItem" key={index}>
                                    <div className="rItemInfo">
                                        <div className="rDesc">{item.roomType}</div>
                                        <div className="rMax">
                                            Max people: <b>{item.capacity}</b>
                                        </div>
                                        <div className="rPrice">{item.price}</div>
                                    </div>
                                    <div className="rSelectRooms">
                                        {item.roomNumbers.map((roomNumber) => (
                                            <div className="room">
                                                <label>{roomNumber.number}</label>
                                                <input
                                                    type="checkbox"
                                                    value={roomNumber._id}
                                                    onChange={handleSelect}
                                                    disabled={!isAvailable(roomNumber)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <button onClick={handleClick} className="rButton">Reserve Now!</button></>}</>}
            </div>
        </div>
    );
};

export default Reserve;