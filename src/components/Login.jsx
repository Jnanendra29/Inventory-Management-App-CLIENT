import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, []);

    const handleLogin = async () => {
        console.log(email, password);
        let result = await fetch('http://localhost:8000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();
        console.log(result);

        if (result.auth) {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate('/');
        } else {
            alert("please enter correct details");
        }

        setEmail('');
        setPassword('');
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" placeholder="Enter Email" className="inputelement"
                onChange={(e) => setEmail(e.target.value)} value={email} />
            <input type="password" placeholder="Enter Password" className="inputelement"
                onChange={(e) => setPassword(e.target.value)} value={password} />
            <button type="button" className="signUpButton" onClick={handleLogin}>
                Login
            </button>
        </div>
    )
}

export default Login;