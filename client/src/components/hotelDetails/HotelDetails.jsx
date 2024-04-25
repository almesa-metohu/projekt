import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import './hotelDetails.css';

const HotelDetails = ({ hotel, closeModal, socket, openRoomModal, setOpenRoomModal }) => {

    const [name, setName] = useState(hotel.name)
    const [city, setCity] = useState(hotel.city)
    const [country, setCountry] = useState(hotel.country)
    const [address, setAddress] = useState(hotel.address)
    const [distance, setDistance] = useState(hotel.distance)
    const [description, setDescription] = useState(hotel.description)
    const [cheapestPrice, setCheapestPrice] = useState(hotel.cheapestPrice)
    const [error, setError] = useState({})

    const updateHotel = () => {
        axios.patch(`http://localhost:8000/api/editHotel/${hotel._id}`, {
            name,
            city,
            country,
            address,
            distance,
            description,
            cheapestPrice
        }, { withCredentials: true })
        .then(hotel => {
            socket.emit('toServer', hotel.data)
            closeModal()
            console.log(hotel)})
        .catch(err => {setError(err.response.data.error)
        console.log(err)})
    }

    const addRoomModal = () => {
        closeModal()
        setOpenRoomModal(true)
    }

    return (
        <div className="hotelInfo">
            <div className="rContainer">
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="rClose"
                    onClick={closeModal}
                />
                <div className="form-group">
                    <div className="label-input-container">
                        <label htmlFor="hotelName">Hotel name:</label>
                        <input
                            style={{ width: '100%' }}
                            type="text"
                            id="hotelName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {error.name ? <p style={{ color: 'red', fontSize: '10px'}}>{error.name.message}</p> : ''}
                    </div>
                </div>
                <div className="d-flex">
                    <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="hotelAddress">Hotel Address:</label>
                            <input
                                type="text"
                                id="hotelAddress"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        {error.address ? <p style={{ color: 'red', fontSize: '10px'}}>{error.address.message}</p> : ''}
                        </div>
                    </div>&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="hotelCity">Qyteti:</label>
                            <input
                                type="text"
                                id="hotelCity"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        {error.city ? <p style={{ color: 'red', fontSize: '10px'}}>{error.city.message}</p> : ''}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="label-input-container">
                        <label htmlFor="hotelCountry">Shteti:</label>
                        <input
                            style={{ width: '100%' }}
                            type="text"
                            id="hotelCountry"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        {error.country ? <p style={{ color: 'red', fontSize: '10px'}}>{error.country.message}</p> : ''}
                    </div>
                </div>
                <div className="d-flex">
                    <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="hotelDistance">Distance from city center:</label>
                            <input
                                type="number"
                                id="hotelDistance"
                                value={distance}
                                onChange={(e) => setDistance(e.target.value)}
                            />
                        {error.distance ? <p style={{ color: 'red', fontSize: '10px'}}>{error.distance.message}</p> : ''}
                        </div>
                    </div>&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="hotelPrice">Cheapest room price:</label>
                            <input
                                type="number"
                                id="hotelPrice"
                                value={cheapestPrice}
                                onChange={(e) => setCheapestPrice(e.target.value)}
                            />
                        {error.cheapestPrice ? <p style={{ color: 'red', fontSize: '10px'}}>{error.cheapestPrice.message}</p> : ''}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="label-input-container">
                        <label htmlFor="hotelDescription">Description:</label>
                        <textarea
                            id="hotelDescription"
                            rows={3}
                            cols={50}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        {error.description ? <p style={{ color: 'red', fontSize: '10px'}}>{error.description.message}</p> : ''}                        
                    </div>
                </div>
                <button className="rButton" onClick={updateHotel}>
                    Update Hotel
                </button>
                <button className="secondary-button" onClick={addRoomModal}>
                    Add a room
                </button>
            </div>
        </div>

    )
}

export default HotelDetails;