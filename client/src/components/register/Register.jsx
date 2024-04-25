import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import "./register.css";
import { Trash } from "@phosphor-icons/react";


const Register = () => {

    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('');
    const [validation, setValidation] = useState({})

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                setProfilePhoto(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };


    const register = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:8000/api/register',
                { firstName, lastName, email, profilePhoto, city, country, phone, password, confirmPassword },
                { withCredentials: true }
            )
            if (response.status === 200) {
                console.log(response)
                localStorage.setItem('userId',response.data.user._id)
                navigate('/')
            }
        }
        catch (error) {
            setValidation(error.response.data.errors);
        }
    }

    return (
        <div className='d-flex justify-content-between'> 
            <img src='https://i.ibb.co/KzbnkC1/Boo-Clo-2.png' alt='register-image'/>
            <form onSubmit={register} className="register">
                <div className="lContainer">
                <h2 className='h2text'>Regjistrohu!</h2>
                    <input
                        type="text"
                        placeholder={'Emër'}
                        value={firstName}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^[a-zA-Z\s]*$/.test(value)) {
                                setFirstName(value);
                            }
                        }}                        
                        className="lInput"
                    />
                    {validation.firstName ? <span className='validation'>{validation.firstName.message}</span> : ""}
                    <input
                        type="text"
                        placeholder="Mbiemër"
                        value={lastName}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^[a-zA-Z\s]*$/.test(value)) {
                                setLastName(value);
                            }}}
                        className="lInput"
                    />
                    {validation.lastName ? <span className='validation'>{validation.lastName.message}</span> : ""}
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}
                        className="lInput"
                    />
                    {validation.email ? <span className='validation'>{validation.email.message}</span> : ""}
                    <div className="d-flex flex-column">
                        <label htmlFor="myfile" className="text-secondary">Fotoja e profilit</label>
                        {profilePhoto ? 
                            <div className='d-flex align-items-center '>
                                <img width={'100px'} height={'100px'} src={profilePhoto} alt="profile" className="profilePhoto rounded-circle" />
                                <Trash size={28} color='#FA0000' onClick={() => setProfilePhoto('')} className='delete'/>
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
                    <div className="d-flex flex-column">
                    <label htmlFor="city" className="text-secondary">Qyteti</label>
                    <select name="qytetet" id="qytetet" value={city} onChange={(e) => setCity(e.target.value)} className="p-1">
                        <option value="Bajram Curri">Bajram Curri</option>
                        <option value="Berat">Berat</option>
                        <option value="Bulqizë">Bulqiz&euml;</option>
                        <option value="Burrel">Burrel</option>
                        <option value="Cerrik">C&euml;rrik</option>
                        <option value="Divjakë">Divjak&euml;</option>
                        <option value="Dibër">Dib&euml;r</option>
                        <option value="Durrës">Durr&euml;s</option>
                        <option value="Elbasan">Elbasan</option>
                        <option value="Ersekë">Ersek&euml;</option>
                        <option value="Fier">Fier</option>
                        <option value="Fushë-Krujë">Fush&euml;-Kruj&euml;</option>
                        <option value="Gjirokastër">Gjirokast&euml;r</option>
                        <option value="Gramsh">Gramsh</option>
                        <option value="Himarë">Himar&euml;</option>
                        <option value="Klos">Klos</option>
                        <option value="Kavajë">Kavaj&euml;</option>
                        <option value="Konispol">Konispol</option>
                        <option value="Krujë">Kruj&euml;</option>
                        <option value="Kukës">Kuk&euml;s</option>
                        <option value="Laç">La&ccedil;</option>
                        <option value="Lezhë">Lezh&euml;</option>
                        <option value="Librazhd">Librazhd</option>
                        <option value="Peshkopi">Peshkopi</option>
                        <option value="Përmet">P&euml;rmet</option>
                        <option value="Pogradec">Pogradec</option>
                        <option value="Pukë">Puk&euml;</option>
                        <option value="Rrogozhinë">Rrogozhin&euml;</option>
                        <option value="Sarandë">Sarand&euml;</option>
                        <option value="Tepelenë">Tepelen&euml;</option>
                        <option value="Tiranë">Tiran&euml;</option>
                        <option value="Vlorë">Vlor&euml;</option>
                    </select>
                    </div>
                    {validation.city ? <span className='validation'>{validation.city.message}</span> : ""}
                    <div className="d-flex flex-column">
                    <label htmlFor="city" className="text-secondary">Shteti</label>
                    <select name="shtetet" id="shtetet" value={city} onChange={(e) => setCountry(e.target.value)} className="p-1">
                        <option value="Shqipëri">Shqip&euml;ri</option>
                    </select>
                    </div>
                    {validation.country ? <span className='validation'>{validation.country.message}</span> : ""}
                    <input
                        type="tel"
                        placeholder="Numri i telefonit"
                        value={phone}
                        onChange={(e) => {
                            const regex = /^[0-9]{0,10}$/;
                            if (regex.test(e.target.value)) {
                                setPhone(e.target.value);
                            }
                        }}
                        className="lInput"
                    />
                    {validation.phone ? <span className='validation'>{validation.phone.message}</span> : ""}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="lInput"
                    />
                    {validation.password ? <span className='validation'>{validation.password.message}</span> : ""}
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="lInput"
                    />
                    {validation.confirmPassword ? <span className='validation'>{validation.confirmPassword.message}</span> : ""}
                    <button type='submit' className="lButton">
                        Regjistrohu
                    </button>
                    <p>Je i regjistruar? <Link to={'/login'}>Log In</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Register;