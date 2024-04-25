import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import './addHotel.css'
import { Trash } from "@phosphor-icons/react";

const AddHotel = ({ closeModalNew, socket }) => {

    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [distance, setDistance] = useState('')
    const [description, setDescription] = useState('')
    const [photo, setPhoto] = useState('')
    const [cheapestPrice, setCheapestPrice] = useState('')
    const [error, setError] = useState({})

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.onload = () => {
                    // Create a canvas with the desired dimensions
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = 300;
                    canvas.height = 100;
    
                    // Draw the image with the desired dimensions on the canvas
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
                    // Convert the canvas to a data URL and set it as the photo state
                    setPhoto(canvas.toDataURL());
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/newHotel', {
            name,
            city,
            country,
            address,
            distance,
            description,
            photo,
            cheapestPrice
        }, { withCredentials: true })
        .then((res) => {
            socket.emit('toServer', res.data)
            closeModalNew()
            console.log("Added")})
        .catch(error => {
            console.log(error)
            setError(error.response.data.errors)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
        <div className="add-hotel">
            <div className="rContainer">
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="rClose"
                    onClick={closeModalNew}
                />
                <br/>
                <div className="d-flex justify-content-between">
                    <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="firstName">Hotel Name:</label>
                            <input
                                id="name"
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                            />
                            {error.name ? <p style={{ color: 'red', fontSize: '10px' }}>{error.name.message}</p> : ''}
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="label-input-container">
                        <label htmlFor="photo">Hotel Photo:</label>
                            {photo ? 
                                <div className='d-flex align-items-center '>
                                    <img width={'300px'} height={'200px'} src={photo} alt="profile" className="profilePhoto" />
                                    <Trash size={28} color='#FA0000' onClick={() => setPhoto('')} className='delete'/>
                                </div> 
                                : 
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="border p-2 border-black border-opacity-50"
                                    accept="image/*"
                                />
                            }
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-evenly">
                <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="email">Distance from city center:</label>
                            <input
                                type="number"
                                id="distanceCity"
                                onChange={(e) => setDistance(e.target.value)}
                            />
                            {error.distance ? <p style={{ color: 'red', fontSize: '10px' }}>{error.distance.message}</p> : ''}
                        </div>
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="firstName">Cheapest Price Room:</label>
                            <input
                                type="number"
                                id="price"
                                onChange={(e) => setCheapestPrice(e.target.value)}
                            />
                            {error.cheapestPrice ? <p style={{ color: 'red', fontSize: '10px' }}>{error.cheapestPrice.message}</p> : ''}
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="phone">Address:</label>
                            <input
                                style={{ width: '100%' }}
                                type="text"
                                id="address"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            {error.address ? <p style={{ color: 'red', fontSize: '10px' }}>{error.address.message}</p> : ''}
                        </div>
                    </div>&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="city">Qyteti:</label>
                            <input
                                type="text"
                                id="city"
                                onChange={(e) => setCity(e.target.value)}
                            />
                            {error.city ? <p style={{ color: 'red', fontSize: '10px' }}>{error.city.message}</p> : ''}
                        </div>
                    </div>&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="form-group">
                        <div className="label-input-container">
                            <label htmlFor="country">Shteti:</label>
                            <input
                                type="text"
                                id="country"
                                onChange={(e) => setCountry(e.target.value)}
                            />
                            {error.country ? <p style={{ color: 'red', fontSize: '10px' }}>{error.country.message}</p> : ''}
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
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        {error.description ? <p style={{ color: 'red', fontSize: '10px'}}>{error.description.message}</p> : ''}                        
                    </div>
                </div>
                <button type="submit" className="rButton" >
                    Create Hotel
                </button>
            </div>
        </div>
    </form>
    )
}

export default AddHotel