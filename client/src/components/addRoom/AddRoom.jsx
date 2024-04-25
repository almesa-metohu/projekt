import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import './addRoom.css'

const AddRoom = ({ closeRoomModal, socket, hotelId }) => {

    const [roomType, setRoomType] = useState('')
    const [price, setPrice] = useState('')
    const [capacity, setCapacity] = useState('')
    const [roomNumbers, setRoomNumbers] = useState('')
    const [error, setError] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        const roomNumbersArray = roomNumbers.split(',').map(num => ({
            number: parseInt(num.trim(), 10), unavailableDates: []
        }));
        axios.post('http://localhost:8000/api/newRoom/' + hotelId, {
            roomType,
            price,
            capacity,
            roomNumbers: roomNumbersArray
        }, { withCredentials: true })
        .then((res) => {
            closeRoomModal()
            console.log("Added")})
        .catch(error => {
            console.log(error)
            setError(error.response.data.errors)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
        <div className="add-room">
            <div className="rContainer">
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="rClose"
                    onClick={closeRoomModal}
                />
                <br/>
                <div className="d-flex justify-content-evenly">
                    <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="firstName">Room Type:</label>
                            <input
                                type="text"
                                onChange={(e) =>{console.log(e.target.value); setRoomType(e.target.value)}}
                            />
                            {error.roomType ? <p style={{ color: 'red', fontSize: '10px' }}>{error.roomType.message}</p> : ''}
                        </div>
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="firstName">Price</label>
                            <input
                                type="number"
                                id="price"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            {error.price ? <p style={{ color: 'red', fontSize: '10px' }}>{error.price.message}</p> : ''}
                        </div>
                    </div>
                </div>
                <br/>
                <div className="d-flex justify-content-evenly">
                <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="email">Capacity:</label>
                            <input
                                type="number"
                                id="capacity"
                                onChange={(e) => setCapacity(e.target.value)}
                                />
                            {error.capacity ? <p style={{ color: 'red', fontSize: '10px' }}>{error.capacity.message}</p> : ''}
                        </div>
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="firstName">Room Number:</label>
                            <input
                                type="text"
                                id="room-numbers"
                                value={roomNumbers}
                                onChange={(e) => setRoomNumbers(e.target.value)}
                                />
                            {error.cheapestPrice ? <p style={{ color: 'red', fontSize: '10px' }}>{error.cheapestPrice.message}</p> : ''}
                        </div>
                    </div>
                </div>
                {!roomNumbers.includes(',') ? <p style={{ color: 'red', fontSize: '10px' }}>*Please enter room numbers separated by commas</p> : ''}
                <button type="submit" className={!roomNumbers.includes(',') && error ? "disabled-button": "rButton"} disabled={!roomNumbers.includes(',') && error ? true : false}>
                    Create Room
                </button>
            </div>
        </div>
    </form>
    )
}

export default AddRoom