import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import "./login.css";

const Login = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validation, setValidation] = useState({})

    const login = async(e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:8000/api/login',
                {email, password},
                {withCredentials: true}
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
            <img src='https://i.ibb.co/sFB8KXf/Boo-Clo-3.png' alt='login-image'/>
            <form onSubmit={login} className="login">
                <div className="lContainer">
                <h2 className='h2text'>Log In!</h2>
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        id="username"
                        onChange={(e) => setEmail(e.target.value)}
                        className="lInput"
                    />
                    {validation.email ? <span className='validation'>{validation.email.message}</span> : ""}
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="lInput"
                    />
                    {validation.password ? <span className='validation'>{validation.password.message}</span> : ""}
                    <button type='submit' className="lButton">
                        Login
                    </button>
                    <p>Nuk ke nj&euml; llogari? <Link to={'/register'}>Krijo nj&euml; llogari</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Login;